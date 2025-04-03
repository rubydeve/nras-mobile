import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ErrorImg from './assets/error.png'
const ErrorCard = ({handleError}) => {
    return (
      <View style={styles.errorContainer}>
        <View>
          <Image source={ErrorImg} style={styles.img} />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.errorHead}>Connection Error</Text>
            <Text style={styles.subText}>
                Please check your network connectivity and try again
            </Text>
            <TouchableOpacity
                style={[
                styles.button,
                styles.infoButton, styles.buttonPressed,
                ]}
                onPressOut={handleError}
            >
                <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({

  errorContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  img: {height: 100, width: 100},
  textContainer: {
    alignItems: 'center',
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 50,
    textAlign: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.2,
    borderColor:'#eee',
    borderBottomWidth: 8,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  infoButton: {
    backgroundColor: '#2e348a',
    borderColor:'#0e3860',
    shadowColor:'#1c5da6',
  },

  buttonPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    borderBottomWidth: 0,
  },


  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },


});


  export default ErrorCard;