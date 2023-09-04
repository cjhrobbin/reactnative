import React, { useRef } from "react";
import {WebView} from 'react-native-webview';
import { Button, SafeAreaView } from "react-native";

const App = () => {

  const url = "URL"
  let webRef = useRef<WebView>(null);
  //const webviewRef = useRef<WebView>(null);

  /** 웹뷰 ref */
  const handleSetRef = _ref => {
    webRef = _ref;
  };

  /* native -> web */
  const native_to_web = () => {
    console.log(webRef.postMessage("전송 데이터(React) : 웹으로 데이터 전송"));
    //console.log(webViewRef.current.postMeesage("전송 데이터(React) : 웹으로 데이터 전송"));
    //console.log('test');
  }

  const errorHandler = ({nativeEvent}) => console.warn("WebView error: ", nativeEvent);

  /* web -> native */
  const web_to_native = (e) => {
    console.log(e.nativeEvent.data);
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <Button title={'postMessage'} onPress={native_to_web} />
      <WebView
        ref={handleSetRef}
        source={{ uri: 'http://10.0.2.2:3000' }}
        javaScriptEnabled={true}
        onLoad={native_to_web}
        onError={errorHandler}
        onMessage={(event) => {
          console.log("받은 데이터(React) : " + event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
};

export default App;