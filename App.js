import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import ErrorCard from './src/ErrorCard';
import Spinner from 'react-native-loading-spinner-overlay';

const MyWebView = () => {
  const [error, setError] = useState(false);
  const [load, setLoading] = useState(true)

  const handleError = () => {
    setError(false);
  };
  const showSpinner = () => {
    setLoading(true)
  }
  const hideSpinner = () => {
    setLoading(false)
  }

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
            source={{ uri: 'https://www.nras.gov.gh/' }}
            onError={handleError}
            onHttpError={handleError}
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
