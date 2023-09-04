import React, { useRef, useState, useEffect } from "react";
import { WebView } from 'react-native-webview';
import { Button, SafeAreaView, View, StyleSheet, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as Manifest from '@expo/android-manifest';

// Read the project's manifest
//const manifest = await Manifest.readAsync(Manifest);

// Get the Android app permissions as an array
//const permissions = Permissions.getPermissions(manifest);

const App = () => {
  const webRef = useRef(null);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    loadStoredUserid();
  }, []);

  const loadStoredUserid = async () => {
    try {
      const value = await AsyncStorage.getItem('userid');
      if (value !== null) {
        setUserid(value);
        console.log(value + ',Userid loaded successfully!');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveUserid = async (newUserid) => {
    try {
      await AsyncStorage.setItem('userid', newUserid);
      setUserid(newUserid);
      console.log('Userid saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const clearUserid = async () => {
    try {
      await AsyncStorage.removeItem('userid');
      setUserid(null);
      console.log('Userid cleared successfully!');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const handleSetRef = _ref => {
    webRef.current = _ref;
  };

  const native_to_web = () => {
    const message = "전송 데이터(React) : 웹으로 데이터 전송";
    if (webRef.current) {
      webRef.current.postMessage(message);
      console.log(message);
    }
  };

  const errorHandler = ({ nativeEvent }) => console.warn("WebView error: ", nativeEvent);

  const web_to_native = (e) => {
    console.log("here" + e.nativeEvent.data);
    saveUserid(e.nativeEvent.data);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title={'postMessage'} onPress={native_to_web} />
        <Button title={'LoadStorage'} onPress={loadStoredUserid} />
        <Button title={'Logout'} onPress={clearUserid} />

      </View>
      <View style={styles.webViewContainer}>
        <WebView
          ref={handleSetRef}
          //source={{ uri: 'http://10.0.2.2:3000' }}
          source={{ uri: 'http://demo.ella.school:25255/' }}
          //source={{ uri: 'https://demo.ella.school' }}
          //source={{ uri: 'https://demo.ella.school:22111/nest/test/compareG' }}
          //mixedContentMode="always"
          //httpsOnly={true}
          //webViewClient={(webView, request) => {
          //  return (request.url.startsWith('https://')) ? request.continue : request.cancel;
          //}}
          javaScriptEnabled={true}
          onLoad={native_to_web}
          onError={errorHandler}
          onMessage={web_to_native}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 16,
  },
  webViewContainer: {
    flex: 1,
  },
});

export default App;
