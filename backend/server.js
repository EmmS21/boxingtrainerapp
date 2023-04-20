const express = require('express');
const cors = require('cors')
const admin = require('firebase-admin');
const session = require('cookie-session');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');


const app = express();
const port = process.env.PORT || 8000

require('dotenv').config();

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
}

app.use(cors());
app.use(express.json());

app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
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
    res.json({ message: authResult})
});

app.listen(port);
console.log('Server started at http://localhost:' + port);