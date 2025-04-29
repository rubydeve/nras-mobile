import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import ErrorCard from './src/ErrorCard';
import Spinner from 'react-native-loading-spinner-overlay';
// notification
import messaging from '@react-native-firebase/messaging';
import usePushNotifications from './src/usePushNotifications';
import SplashScreen from 'react-native-splash-screen';


const MyWebView = () => {
  usePushNotifications();

  const [error, setError] = useState(false);
  const [load, setLoading] = useState(true)
  const [user, setUser] = useState()

  const webviewRef = useRef(null);
  const url = 'https://www.nras.gov.gh'

  const handleError = () => {
    setError(false);
  };
  const showSpinner = () => {
    setLoading(true)
  }
  const hideSpinner = () => {
    setLoading(false)
  }


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
    SplashScreen.hide(); // Hide splash screen after app is loaded
  },[])

  // useEffect(() => {

  //   const checkPermissions = async () => {
  //     if(Platform.OS ==="android"){
  //       try {
  //         PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
  //           response => {
  //             if(!response){
  //               PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
  //                   title: 'Notification',
  //                   message:
  //                     "We'd like to send you notifications about updates and important messages. Do you want to allow notifications?",
  //                   buttonNegative: 'Cancel',
  //                   buttonPositive: 'OK',
  //               })
  //             }
  //           }
  //         ).catch(
  //           err => {
              
  //           }
  //         )
  //       } catch (err){
          
  //       }
  //     }
  //   }
  //   console.log('sssssssssssssssssssssssssssssss')
  //   checkPermissions()
  //   requestUserPermission()
  // },[]);

  useEffect(() => {
    getFcmToken()
    const unsubscribe = messaging().onTokenRefresh(token => {
      setToken(token)
    });
    return unsubscribe;
  }, [user])

  return (
    <SafeAreaView style={styles.rootView}>
      {error ? (
        <ErrorCard handleError={handleError}/>
      ) : (
        <>
          <Spinner
            visible={load}
            textContent='Loading...'
            overlayColor="#fff"
            color='#2e348a'
            indicatorStyle={{color: '#2e348a'}}
            textStyle={{ color: '#2e348a' }}
          />
          <WebView
            onLoad={hideSpinner}
            onLoadStart={showSpinner}
            source={{ uri: url }}
            onError={handleError}
            onHttpError={handleError}
            ref={webviewRef}
            javaScriptEnabled={true}

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

            onMessage={(event) => {
              const user = JSON.parse(event.nativeEvent.data);
              setUser(user.email)
            }}
          />
        </>
      )
      }

    </SafeAreaView>
  );                                        
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center'
  },
  rootContainer: {justifyContent: 'flex-start', padding: 10},
});


export default MyWebView;
