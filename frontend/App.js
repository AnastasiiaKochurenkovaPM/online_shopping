import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import config from './config.js'

export default function App() {
  useEffect(() => {
    async function init() {
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
    init().then(console.log).catch(console.error)
  }, []);

  return (
    <>
      <StackNavigator />
    </>
  );
}
