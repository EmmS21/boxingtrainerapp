import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export default function FirebaseData () {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.on('value', (snapshot) => {
            setData(snapshot.val());
        });
    }, []);

    return (
        <div>
            { data && (
                <pre>{ JSON.stringify(data, null, 2) }</pre>
            )}
        </div>
    );
};




