// api/getFirebaseAPI.js
module.exports = (_, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.status(200).send({
        apiKey: process.env.FIREBASEAPIKEY,
        authDomain: process.env.FIREBASEAUTHDOMAIN,
        projectId: process.env.FIREBASEPROJECTID,
        storageBucket: process.env.FIREBASESTORAGEBUCKET,
        messagingSenderId:process.env.FIREBASEMESSAGINGSENDERID,
        appId: process.env.FIREBASEAPPID,
        measurementId: process.env.FIREBASEMEASUREMENTID
    });
};
