import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const UpdateModal = ({ visible, storeUrl }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Image
            source={require('./assets/launch_screen.png')}
            style={styles.icon}
          />
          <Text style={styles.title}>Update Available</Text>
          <Text style={styles.subTitle}>A new version of the app is available.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(storeUrl)}
          >
            <Text style={styles.buttonText}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0006',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#006b00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});