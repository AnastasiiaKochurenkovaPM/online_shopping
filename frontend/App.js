import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import config from './config.js'
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Provider } from 'react-redux';
import { store } from './src/redux/store.js';

export default function App() {

  useEffect(() => {
    async function init() {
      const os = Platform.OS;

      if (os === 'web') {
        await registerForWeb();
      } else if (os === 'android') {
        await registerForPushNotificationsAsync();
      } else {
        console.error('Unsupported platform');
      }
    }

    init().catch(console.error);

 
    // Перевіряємо, чи є токен в AsyncStorage
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Відновлюємо сесію, якщо є токен
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        dispatch(restoreUser(user)); // Відновлюємо дані користувача з Redux
      }
    }
    checkToken();
  }, []);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}


async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Permission not granted!');
    return;
  }

  console.log({ existingStatus, finalStatus })

  try {
    const token = await Notifications.getDevicePushTokenAsync();
    console.log('token?', token)
    console.log('Expo Push Token:', token.data);

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  } catch (error) {
    console.error(error)
  }

}


async function registerForWeb() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Notification permissions not granted");
    return;
  }
  console.log('permissions granted')
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { type: 'module' });
      console.log('SW registered');
      const app = initializeApp(config.firebase);
      const messaging = getMessaging(app);
      const token = await getToken(messaging, {
        vapidKey: config.firebase.vapidKey,
        serviceWorkerRegistration: registration
      })
      console.log({ token })

    } catch (error) {
      console.error('failed to register SW or retrieve token', error);
    }
  }
}