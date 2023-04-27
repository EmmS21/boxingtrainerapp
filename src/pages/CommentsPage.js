import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Context from '../context/Context';
import '../assets/css/Timeline.css';
import { Rate, Input, Button } from 'antd';
const { TextArea } = Input;


export default function CommentsPage () {
    const { fetchComments } = useContext(Context);
    const desc = ['rookie', 'not bad', 'ok', 'good', 'awesome'];
    const [foot, setFoot] = useState(2);
    const [head, setHead] = useState(2);
    const [punch, setPunch] = useState(2);
    const [posture, setPosture] = useState(2);
    const [rating, setRating] = useState(2);

    // fetchComments
    // useEffect(() => {
    //     fetchComments()
    // }, []);
      
    return (
        <>
            <div className='video-review'>
                <h3>Add Review</h3>
                <span>
                    Footwork:
                    <Rate tooltips={desc} onChange={setFoot} value={foot} />
                    { foot ? <span className="ant-rate-text">{desc[foot-1]}</span>: ''}
                </span>
                <span>
                    Head Movement:
                    <Rate tooltips={desc} onChange={setHead} value={head} />
                    { head ? <span className="ant-rate-text">{desc[head-1]}</span>: ''}
                </span>
                <span>
                    Punch Technique:
                    <Rate tooltips={desc} onChange={setPunch} value={punch} />
                    { punch ? <span className="ant-rate-text">{desc[punch-1]}</span>: ''}
                </span>
                <span>
                    Overall Posture:
                    <Rate tooltips={desc} onChange={setPosture} value={posture} />
                    { posture ? <span className="ant-rate-text">{desc[posture-1]}</span>: ''}
                </span>
                <span>
                    Boxer Rating:
                    <Rate tooltips={desc} onChange={setRating} value={rating} />
                    { rating ? <span className="ant-rate-text">{desc[rating-1]}</span>: ''}
                </span>
                <TextArea rows={4} placeholder="What would you recommend this boxer should work on and why?"/>
                <TextArea rows={4} placeholder="What do you think this boxer does well in this video?"/>
                <TextArea rows={4} placeholder="Do you have other comments you would like to add?"/>
                <Button>Add Review</Button>
            </div>
        </>
    );
};
