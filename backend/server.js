const express = require('express');
const cors = require('cors')
const admin = require('firebase-admin');
const serviceAccount = require('./boxingtrainer.json');
const session = require('cookie-session');

const app = express();
const port = process.env.PORT || 8000

app.use(cors());
app.use(express.json());

app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000
}));


app.post('/auth', async (req, res) => {
    const uid = req.body.id
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
    const authResult = await admin.auth().getUser(uid)
    req.session.uid = uid;
    req.session.email = authResult.email
    res.json({ message: authResult });
});

app.listen(port);
console.log('Server started at http://localhost:' + port);


// app.use(session({
//     name: 'authSession', 
// }))