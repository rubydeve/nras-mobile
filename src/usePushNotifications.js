import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform, PermissionsAndroid } from 'react-native';

const usePushNotifications = () => {
  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Notifications won’t work');
          return;
        }
      }

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Push permissions granted ✅');
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        // 👉 Send token to your Rails backend
      } else {
        Alert.alert('Notifications disabled', 'User denied permission');
      }
    };

    checkPermissions();
  }, []);
};

export default usePushNotifications;
