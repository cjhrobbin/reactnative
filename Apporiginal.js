import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import {View, Text} from 'react-native';

class App extends Component {
  render() {
    return (
      <WebView
      source={{ uri: 'http://10.0.2.2:3000' }}
       
      />
    );
  }
}

export default App;