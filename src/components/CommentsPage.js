import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import '../assets/css/Timeline.css';

export default function FirebaseData () {
    const [ data, setData ] = useState([]);

    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.on('value', (snapshot) => {
            setData(snapshot.val());
        });
    }, []);

    console.log('data', JSON.stringify(data))

    return (
        <>
            {Object.keys(data).map((key) => {
                const item = data[key];
                return (
                    <div className='div-post' key={key}>
                        {item.displayName && <p className='div-para'><strong>Username:</strong> {item.displayName}</p>}
                        <Space size={[0,8]} wrap>
                            {item.videoType && <Tag color='cyan'>{item.videoType}</Tag>}
                        </Space>
                        {item.videoLink && <VideoPlayer url={item.videoLink}/>}
                        <CommentOutlined/>
                    </div>
                )
            })}
        </>
    );
};




