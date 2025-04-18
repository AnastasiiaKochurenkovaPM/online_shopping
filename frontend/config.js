const config = {
    firebase: {
        apiKey: process.env.apiKey || true,
        authDomain: process.env.authDomain || true,
        projectId: process.env.projectId || true,
        storageBucket: process.env.storageBucket || true,
        messagingSenderId: process.env.messagingSenderId || true,
        appId: process.env.appId || true,
        measurementId: process.env.measurementId || true,
        vapidKey: process.env.vapidKey || true
    }
}

export default config;