
function getFile() {
    return new Promise((resolve, reject) => {
        // var preview = document.querySelector('img');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);

        if (true) {
            // reader.readAsDataURL(file);
            reader.readAsArrayBuffer(file);
        } else {
            reject();
        }
    });
}

 function processImage(image) {
    return new Promise((resolve, reject) => {
        var subscriptionKey = "338674b699ec4a5d83eeb8ac10e2097e";
        var uriBase =
            "https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false";

        // Request parameters.
        var params = {
            "returnFaceId": "false",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes":
                "emotion"
        };

        // Perform the REST API call.
        var request = {
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: image,
            processData: false
        }
        console.log(request);
        $.ajax(request)
        .done(function(data) {
            console.log("done");
            console.log(data);
            resolve(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("fail");
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                        jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
            reject(errorString);
        });
    });
};

function getHappyFaceCoords(tags) {
    tags = tags.filter(e => {
        if(e.faceAttributes.emotion.happiness > 0.9) {
            return false;
        } else {
            return true;
        }
    });
    tags = tags.map(e => {
        return {"faceRectangle": e.faceRectangle, "emotion" : e.faceAttributes.emotion};
    });
    return tags;
}

function getEmoji(emojiUrl) {
    var request = {
        url: emojiUrl,
        type: "GET",
    }
    console.log(request);
    $.ajax(request)
    .done(function(data) {
        console.log("done");
        console.log(data);
        resolve(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        alert()
    });
}

function blitEmoji(image, emojiUrl, coords) {
    return new Promise((resolve, reject) => {
        Promise.all([Jimp.read(image), Jimp.read(emojiUrl)]).then(images => {
            var image = images[0];
            var emoji = images[1];
            for(var i = 0; i < coords.length; i++) {
                emoji = emoji.scaleToFit(coords[i].faceRectangle.width, coords[i].faceRectangle.height, Jimp.MIME_PNG);
                image = image.blit(emoji, coords[i].faceRectangle.left, coords[i].faceRectangle.top);
            }
            image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        }).catch(err => {
            alert(err);
        });
    });
}

function showImage(buffer) {
    var data = "data:image/jpg;base64," + buffer.toString('base64'); 
    document.getElementById("image").src = data;
}

function startSpinner() {
    var loader = document.getElementById("loader");
    if(loader) {
        loader.style.display = "";
    }
}

function stopSpinner() {
    var loader = document.getElementById("loader");
    if(loader) {
        loader.style.display = "none";
    }
}

function toBuffer(ab) {
    var buf = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

function fileGet() {
    startSpinner();
    getFile().then(arrayBuffer => {
        showImage(toBuffer(arrayBuffer));
        console.log("data:image/jpg;base64,"+toBuffer(arrayBuffer).toString('base64'));
        processImage(arrayBuffer).then((tags) => {
            var rects = getHappyFaceCoords(tags);
            blitEmoji(arrayBuffer, "https://cdn.shopify.com/s/files/1/1061/1924/files/Hugging_Face_Emoji.png", rects).then(e => {
                stopSpinner();
                showImage(e);
            },
            (err) => {
                stopSpinner();
                alert("PROMISE REJECTED: " + err);
            });
        }, 
        (err) => {
            stopSpinner();
            alert("PROMISE REJECTED: " + err);
        });
    },
    (err) => {
        stopSpinner();
        alert("PROMISE REJECTED: " + err);
    });
}