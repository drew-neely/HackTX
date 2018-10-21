import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
function fileButton(props) {
    const { classes } = props;

    return (
    <div>
        <input
            accept="image/*"
            className={styles.input}
            id="contained-button-file"
            multiple
            type="file"
        />
        <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
            Upload Image
            </Button>
        </label>
      </div>
    );
}

fileButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(fileButton);