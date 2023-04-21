import React, { useState, useEffect, useContext } from 'react';
import { getDatabase, ref, onValue } from 'firebase/compat/database';

export default function FirebaseData () {
    const { data, setData } = useState([]);

    useEffect(() => {
        const database = getDatabase();
        const dbRef = ref(database);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    }, []);

    return (
        <div>
            <ul>
                {Object.keys(data).map((key) => (
                    <li key={key}>{data[key]}</li>
                ))}
            </ul>
        </div>
    )
}