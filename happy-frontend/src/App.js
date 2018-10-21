import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
//import Button from '@material/react-button/dist'; // /index.js is implied
import './App.css';
import test123 from './Hugging_Face_Emoji.png';

const styles = {
  button : {
    color: '#FF0000',

  },
  wrapper: {
    textAlign:'center',
    backgroundColor: '#F0FFF0',
    width: 'device-width',
    verticalAlign: 'center',
  }

 };

 //<input style={styles.button} type="file" name="test" ref="fileUploader" onChange="this.handleFileChange"/>

 function yay() {
   console.log("yay");
 }

class App extends Component {
  render() {
    return (
      <div style={styles.wrapper}> 
          <div className="upload-btn-wrapper">
            <button className="btn">Upload a file</button>
            <input type="file" name="myfile" onChange={yay} />
          </div>
          {/* <input type="file" name="fileUploader" size="60" onChange={alert(123)}/> */}
          <div>
          <div id ="loader" className="loader"></div>
          <img src={test123} id="image"/>
          </div>
      </div>
    );
  }
}

export default App;