import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-sw.js";
import config from '../config.js';

const app = initializeApp(config.firebase);

const messaging = getMessaging(app);
onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        // icon: payload.notification.image,
    };
    console.log(notificationTitle, notificationOptions)
    self.registration.showNotification(notificationTitle, notificationOptions);
});

