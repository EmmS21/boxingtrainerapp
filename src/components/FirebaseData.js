import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import '../assets/css/Timeline.css';
import VideoPlayer from './VideoPlayer';
import { Space, Tag } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';


export default function FirebaseData () {
    const [ data, setData ] = useState([]);
    const { setBoxingVid, fetchComments } = useContext(Context);
    const navigate = useNavigate();
    
    useEffect(() => {
        const dbRef = firebase.database().ref();
        dbRef.on('value', (snapshot) => {
            setData(snapshot.val());
        });
    }, []);

    const viewComments = (id, video) => {
        fetchComments();
        navigate(`/comments/${id}`);
        setBoxingVid(video)
        console.log('value is, ', id)
    }
    return (
        <>
            {Object.keys(data).map((key) => {
                const item = data[key];
                return (
                    <div className='div-post' key={key}>
                        {item.displayName && <p className='div-para'><strong>Username:</strong> {item.displayName}</p>}
                        <Space size={[0,8]} wrap>
                            {item.videoType && <Tag color='cyan'>{item.videoType}</Tag>}
                            {item.id && <Tag color="geekblue">{item.id}</Tag>}
                        </Space>
                        {item.videoLink && <VideoPlayer url={item.videoLink}/>}
                        <CommentOutlined onClick={()=> viewComments(item.id, item.videoLink)}/>
                    </div>
                )
            })}
        </>
    );
};




