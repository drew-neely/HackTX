import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
//import Button from '@material/react-button/dist'; // /index.js is implied
import './App.css';
import test123 from './Hugging_Face_Emoji.png';

const styles = {
  button :{
    width:70
  }
};

class App extends Component {
  render() {
    return (
      <div>
        <style>{'body { background-color:#F0FFF0}'}</style>
          <input type="file" name="test" ref="fileUploader" onChange="this.handleFileChange"/>
          <div>
          <img src={test123}/>
          </div>
      </div>
    );
  }
}

export default App;
