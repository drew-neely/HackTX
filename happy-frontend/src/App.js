import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
//import Button from '@material/react-button/dist'; // /index.js is implied
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <style>{'body { background-color:#F0FFF0}'}</style>
          <input type="file" name="test" ref="fileUploader" onChange="this.handleFileChange"/>
          <img src="Hugging_Face_Emoji.png"/>
      </div>
    );
  }
}

export default App;
