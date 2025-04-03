const firebaseAdmin = require('firebase-admin');
const uuid = require('uuid');
class PushNotificator {
    #isInited;
    #app;
    #messaging;

    constructor(params) {
        this.#isInited = false;
        this.#app = null;
        this.#messaging = null;

        this.init(params);
    }

    // pass firebase json key as params
    async init(params) {
        if (this.#isInited) return;
        // let id = 
        let name = uuid.v4();

        while (firebaseAdmin.apps.map(item => item.name).includes(name)) {
            name = uuid.v4();
        }

        const app = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(params)
        });
        const messaging = app.messaging();

        this.#app = app;
        this.#messaging = messaging;

        this.#isInited = true;
    }

    async sendNotification(token, message) {
        try {
            const alert        = message.subtitle
                ? { subtitle: message.subtitle }
                : {};
            const notification = {
                title : message.title,
                body  : message.body
            };
            const response     = await this.#messaging.send({
                notification,
                android : {
                    notification : {
                        sound : 'default,'
                    }
                },
                apns : {
                    payload : {
                        aps : {
                            sound : 'default',
                            alert
                        }
                    }
                },
                token
            });

            return response;
        } catch (error) {
            console.error(error);
            // dont need to throw error, push failure isn't critical
        }
    }
}


module.exports = PushNotificator;
