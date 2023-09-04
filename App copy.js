import React, { useRef } from "react";
import { WebView } from 'react-native-webview';
import { Button, SafeAreaView } from "react-native";

const App = () => {
  const webRef = useRef(null);

  /** 웹뷰 ref */
  const handleSetRef = _ref => {
    webRef.current = _ref;
  };

  /* native -> web */
  const native_to_web = () => {
    const message = "전송 데이터(React) : 웹으로 데이터 전송";
    if (webRef.current) {
      webRef.current.postMessage(message);
      console.log(message);
    }
  };

  const errorHandler = ({ nativeEvent }) => console.warn("WebView error: ", nativeEvent);

  /* web -> native */
  const web_to_native = (e) => {
    console.log(e.nativeEvent.data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title={'postMessage1'} onPress={native_to_web} />
      <WebView
        ref={handleSetRef}
        source={{ uri: 'http://10.0.2.2:3000' }}
        javaScriptEnabled={true}
        onLoad={native_to_web}
        onError={errorHandler}
        onMessage={web_to_native}
      />
    </SafeAreaView>
  );
};

export default App;
