import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import config from './config.js'

export default function App() {
  useEffect(() => {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            navigator.serviceWorker
              .register("/firebase-messaging-sw.js", { type: 'module' })  // Ensure this path is correct
              .then((registration) => {
                console.log("Service Worker registered:", registration);
      
                const app = initializeApp(config.firebase);
                const messaging = getMessaging(app);
      
                
                // Get the FCM token
                getToken(messaging, {
                  vapidKey: config.firebase.vapidKey,
                  serviceWorkerRegistration: registration
                }).then((currentToken) => {
                  if (currentToken) {
                    console.log("FCM Token:", currentToken);
                  } else {
                    console.warn("No registration token available.");
                  }
                }).catch((error) => {
                  console.error("Error getting FCM token:", error);
                });
      
                onMessage(messaging, (payload) => {
                  console.log("Message received in foreground:", payload);

                  alert(`New Message: ${payload.notification.title}`);
                });
      
              })
              .catch((error) => {
                console.error("Service Worker registration failed:", error);
              });
          }
        } else {
          console.log("Notification permission denied.");
        }
      })
      .catch(error => console.error(error));    
  }, []);

  return (
    <>
      <StackNavigator />
    </>
  );
}