// const { getMessaging } = require('@react-native-firebase/messaging')
// const firebaseConfig = {
//     "type": "service_account",
//     "project_id": "example-project-435ba",
//     "private_key_id": "15be8e6dfe14f820373ec866a7202c220eb5248e",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXHffhD7ViVpCQ\nocBOa3opD9OwuXHg6U5Uw035MwOc3TKJYOkfjICjH6aL82EAkQSDM0J5zhR2Xeic\nu41JYYhDN2QgA71mjCVq6OjS9AJs5/0dyivD7aEz3A/pYUIafMggRG6/X3uZ/Tug\n3pADes0FyiNClT2TpIFyEKZ7DGCg/f7ehOcG9V892DGkNQwGHT//Q6ZC66DidR0q\nDfkyE6Slg9nOoGUGINKFdb3W5A6MJo4gPra2356Vvup+ruOeNxj4dkpkMy1Ur4C+\nHze2QndWqLcz1HltS6ETRHzSKr/YssUdYFkHM7tEg7avAiKjJHoRXwiGhnUte3Sn\nxp+4fAVpAgMBAAECggEAFiTek3zNTBU6Ru9k8jjepFC86QsrrFUT1OjvrqIyl9R0\nGNx6HNTmbsDvE1f9MWuOuTkUNywjJHs7YGg9WnDv2kWuJuDVascDnqh1oZ//EP1n\nwmtDQYk7U5GeRUkquh3p54yPm/x+bMDGcZrbiJ8AlyYZR6L97HoxO8lD1Akqybxk\n7JSHDomXuQ6SdCzqBq5Cyfra6ADavkQ7QbUkfCN/CAzK43xber/HTTiYoLJe5oR+\nP8Jyge2lcZaPUT7oM7fsBJscBt2GVCFTD6K6kabvKtgEOppvEWjEwsIvgY8/wdat\nNJ5VcMAKoSuD14hyQEiG4VrmEJq7SENVtZTwsSdMZwKBgQDGkJnyf04N7F1Ml/DM\nKT/QtxP3Mie4s+gAogZtU3ArIcmkEoW7S8C3Uai8zH9yeVSaVKIf7RrNfME/gn7T\nA9IBGq1nSrF8AlgrhV2it5M3erITVNvbSW00WEIAzfn/+5dmMUZg2/TQJ9wK1Cz6\netxyWokN1zIhDCZkBjrUlzNJtwKBgQDC0+/X1Ps9d9uy+sUTvjOrtPTC/s4LGWZM\nXm8afXziWuguczRElrcBracFnicK+Cp/5cUuMIpjXxJo11CxwRxd5LZNvc4qkQ+U\no7/bcGPDBG/mkD+1DlIw+m2SWS3m7Ve/YspbW3EoGO62NbLQrSwTckezLXLoPIGE\nI0gNBgOp3wKBgQCXuI2o+RUPFngDumVH2ozkUb9ztmMbgnvXX/ZBOuwOSPbl4zFD\n95H9gOvJtwf61DKM6fYnJui/8n9Go9N8MQMZzOSKdExBURlFx9XQKyzVy26dzs1f\nNS+4O2fTbY+ExRzd/PCluevJ0WsU6yKjEZW32u22IaQwFDSRYSE6p32M6QKBgFnr\nBOwBIT96XQyaznBRPXnHF5wTi7b1rxAaGX8JYaT6veQKSZpKUQZWRhrCplRauwqy\nWjH6NzSrwUxf659OeDAhib4RluBweNdqR/cYRQLRvm+ULcL7bBWszvtXa2cELZZo\nGurVJkGSWEICQJgtBIWpHcxlcn4axs/clLlmCDTTAoGAc1WPcW5UmGU/N9zHvrfj\nYjEzsCRzykP0KWVOKD8jYGDao2Ye9ncn+EgujUtnTbWw3dt/fSF73irO6ioJWYEb\n/6Dg+JRCjVvNSO++HZLNisKMZ8B6pmiZ3Krr+cYVBqFD4O3Ed8m1YfnFdSNT3n7h\nXzjwtTREGFHfNmvjRIFIkJ4=\n-----END PRIVATE KEY-----\n",
//     "client_email": "messaging-account@example-project-435ba.iam.gserviceaccount.com",
//     "client_id": "116346251703107577049",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/messaging-account%40example-project-435ba.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
// };

// initializeApp(firebaseConfig);


// const firebaseApp = getApp();
// const messaging = getMessaging(firebaseApp)
// module.exports = { firebaseApp, messaging };
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native'
export default class PushNotificator {
    #messaging;
    #isInited;
    constructor() {
        this.#isInited = false;
        this.init();
    }
    async init() {
        if (this.#isInited) return;
        if (Platform.OS === 'web') {
            const app = initializeApp({
                apiKey: "AIzaSyB60qFI2pEPToYMqKHurcFBWuVVcCO9Gf4",
                authDomain: "example-project-435ba.firebaseapp.com",
                projectId: "example-project-435ba",
                storageBucket: "example-project-435ba.firebasestorage.app",
                messagingSenderId: "303359891872",
                appId: "1:303359891872:web:f591ea4c2280c3b5a2ecc5",
                measurementId: "G-QWHD92CYGL",
            })
            this.#messaging = await getMessaging(app);
        } else {
            this.#messaging = messaging();
        }

        this.#isInited = true;
    }
    async getToken() {
        await this.init();
        if (Platform.OS === 'web') {
            const fcmToken = await getToken(this.#messaging, {
                vapidKey: 'BNdixVHk4UrAp7OSjcW0DInDx22nFKPLQ2P9R0jdj5H28M6BEHsoO5V2KrjzvhtJILXiDLsRcTOruYrNdUZzvCo'
            });
            return { fcmToken };
        } else {
            const fcmToken = await this.#messaging.getToken();

            return { fcmToken };
        }

    }
}

