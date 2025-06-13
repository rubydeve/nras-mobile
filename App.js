import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import ErrorCard from './src/ErrorCard';
import Spinner from 'react-native-loading-spinner-overlay';
// notification
import messaging from '@react-native-firebase/messaging';
import usePushNotifications from './src/usePushNotifications';
import SplashScreen from 'react-native-splash-screen';
// file 
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";

const MyWebView = () => {
  usePushNotifications();
  const [error, setError] = useState(false);
  const [user, setUser] = useState()

  const webviewRef = useRef(null);
  const url = 'https://www.nras.gov.gh'

  const handleError = () => {
    setError(true);
  };
  
  const handleReload = () => {
    webviewRef.current?.reload();
    setError(false);

  };
  const handleUrlCall = (event) => {
    const url = event.url
        if (Platform.OS === 'ios' && url.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|jpg|jpeg|png|gif|bmp|zip|rar|7z|mp3|mp4|avi|mov|mkv|txt|csv|xml|webp|heic)$/i)) {
       console.log('yes in code')
          handleUrl(url)
           return false; 
        }else{
          return true;
        }
  }
  const handleUrl = async (url) => {
  

    try {
      const fileName = url.split('/').pop() || `file_${Date.now()}`;
      const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // Download the file
      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: localPath,
      });

      await download.promise;

      // Open the file
      await FileViewer.open(localPath, { showOpenWithDialog: true });

    } catch (error) {
      console.error('File download/view error:', error);
      Alert.alert('Error', 'Unable to open file.');
    
    }
  };
    




  function setToken(token){
    if(user){
      fetch(`${url}/user_api_subscriptions`, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token, email: user})  // Make sure token has a value!
      })
    }

  }


  async function getFcmToken() {
    const token = await messaging().getToken();
    setToken(token)
    console.log(token)
  }
  
  useEffect(() => {
    SplashScreen.hide(); 
  },[])


  useEffect(() => {
    getFcmToken()
    const unsubscribe = messaging().onTokenRefresh(token => {
      setToken(token)
    });
    return unsubscribe;
  }, [user])

  return (
    <>
      <StatusBar barStyle='dark-content'/>
      <SafeAreaView style={styles.rootView}>
        {error ? (
          <ErrorCard handleError={handleReload}/>
        ) : (
          <>
        
            <WebView
              source={{ uri: url }}
              onError={handleError}
              onHttpError={handleError}
              onShouldStartLoadWithRequest={handleUrlCall}
              ref={webviewRef}
              javaScriptEnabled={true}
              style={styles.WebView}
              autoManageStatusBarEnabled={false}
              injectedJavaScriptBeforeContentLoaded={`
                // This runs before the page loads
                fetch('${url}/api/v1/current_user', {
                  credentials: 'include'  // include session cookie
                })
                .then(res => res.json())
                .then(user => {
                  window.ReactNativeWebView.postMessage(JSON.stringify(user));
                });
              `}
              // androidLayerType="hardware"
              cacheEnabled={true}
              cacheMode="LOAD_CACHE_ELSE_NETWORK"
              startInLoadingState={true}
              renderLoading={() => <Spinner
                visible={true}
                textContent='Loading...'
                overlayColor="#fff"
                color='#2e348a'
                indicatorStyle={{color: '#2e348a'}}
                textStyle={{ color: '#2e348a' }}
              />}

              onMessage={(event) => {
                const user = JSON.parse(event.nativeEvent.data);
                setUser(user.email)
              }}

              domStorageEnabled={true}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              mediaPlaybackRequiresUserAction={false}
              originWhitelist={['*']}

            />
          </>
        )
        }

      </SafeAreaView>
    </>
  );                                        
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  WebView: {
    flex: 1
  },
  rootContainer: {justifyContent: 'flex-start', padding: 10},
});


export default MyWebView;
