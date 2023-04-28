const express = require('express');
const cors = require('cors')
const admin = require('firebase-admin');
const session = require('cookie-session');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const { resourceLimits } = require('worker_threads');
// const MongoClient = require('mongodb').MongoClient;



const app = express();
const port = process.env.PORT || 8000

require('dotenv').config();

function generate (n) {
    return String(Math.ceil(Math.random() * 10 ** n)).padStart(n, '0');
};

const serviceAccount= {
    type : process.env.TYPE,
    project_id : process.env.PROJECT_ID,
    private_key_id : process.env.private_key_id,
    private_key : process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email : process.env.CLIENT_EMAIL,
    client_id : process.env.CLIENT_ID,
    auth_uri : process.env.AUTH_URI,
    token_uri : process.env.TOKEN_URI,
    auth_provider_x509_cert_url : process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url : process.env.CLIENT_X509_CERT_URL
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000,
    // httpOnly: true,
    // secure: true
}));


app.post('/auth', async (req, res) => {
    const uid = req.body.uid
    //create JWT token
    const secret = randtoken.generate(16);
    const payload = {
        isValid: 'true'
    }
    const token = jwt.sign(payload, secret)
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    const authResult = await admin.auth().getUser(uid)
    req.session.token = token;
    req.session.uid = uid;
    res.cookie('cookie', req.session)
    res.json({ message: authResult, cookie: req.session.cookie, header: 'test' })
});

app.post('/addReview', async (req, res) => {
    try {
        const db = admin.firestore();
        const collectionRef = db.collection('boxingvids');
        const docRef = collectionRef.doc(generate(10));
        const data = {
            vidKey: req.body['vidKey'],
            footWork: req.body['footWork'],
            headMovement: req.body['headMovement'],
            overallRating: req.body['overallRating'],
            punchForm: req.body['punchForm'],
            shouldWorkOn: req.body['shouldWorkOn'],
            addComments: req.body['addComments'],
            doesWell: req.body['doesWell'],
            posture: req.body['posture'],
            poster: req.body['poster']
        }
        docRef.set(data);
        console.log('Document successfully written!')
        res.json({ message: req.body })
    } catch (error) {
        console.error('Error writing document: ', error);
    }
});    

app.get('/getReviews', async (req, res) => {
    try {
        const result = [];
        const db = admin.firestore();
        const collectRef = db.collection('boxingvids');
        const allReviews = await collectRef.get();
        allReviews.forEach((review) => {
            result.push(review['_fieldsProto'])
        });
        res.json({ message: result })
    } catch (error) {
        console.error('Error retrieving reviews: ', error);
    }
});

app.listen(port);
console.log('Server started at http://localhost:' + port);

