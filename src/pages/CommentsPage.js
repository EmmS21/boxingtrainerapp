import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Context from '../context/Context';
import VideoPlayer from '../components/VideoPlayer';
import '../assets/css/Timeline.css';
import { Rate, Input, Button } from 'antd';
import { LeftSquareOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FetchedComments from '../components/FetchedComments';

const { TextArea } = Input;



export default function CommentsPage () {
    const { fetchComments, baseURL, boxingVid,
            isAuth, displayName, comments } = useContext(Context);
    const desc = ['rookie', 'not bad', 'ok', 'good', 'awesome'];
    const [foot, setFoot] = useState(2);
    const [head, setHead] = useState(2);
    const [punch, setPunch] = useState(2);
    const [posture, setPosture] = useState(2);
    const [rating, setRating] = useState(2);
    const [recommend, setRecommend] = useState('');
    const [doesWell, setDoesWell] = useState('');
    const [otherComments, setOtherComments] = useState('');
    const navigate = useNavigate();
    const text = "Please enter at least 20 characters";


    useEffect((() => {
        isAuth()
        fetchComments()
        // console.log('what is comments', comments.current)
    }),[])


    const addReview = (footW, headMov, punchTech, 
                       boxerPosture, boxerRating, recomm, 
                       doesWellComment, otherComm, displayName) => {
        const review = {
            vidKey: boxingVid,
            footWork: footW,
            headMovement: headMov,
            overallRating: boxerRating,
            punchForm: punchTech,
            shouldWorkOn: recomm,
            addComments: otherComm,
            doesWell: doesWellComment,
            posture: boxerPosture,
            poster: displayName
        };
        console.log('pre click', review)
        axios.post(`${baseURL}/addReview`, review)
        .then((res) => {
            console.log('success', res)
        })
        .catch((err) => {
            console.log('error', err)
        });
    };

    const goBack = () => {
        navigate('/');
    }

    const isDisabled = recommend.length < 20 || doesWell.length < 20 || otherComments.leng
      
    return (
        <>
            <div className='video-review'>
            <Button onClick={()=>goBack()}>
                <LeftSquareOutlined style={{ fontSize: '20px', zIndex:1 }} />
            </Button>
                <VideoPlayer url={boxingVid}/>
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
                <TextArea 
                    rows={4} 
                    placeholder="What would you recommend this boxer should work on and why?"
                    onChange={(e) => setRecommend(e.target.value)}
                    value={recommend} />
                    {
                        recommend.length < 20 && (
                            <div className='warning'>{text}</div>
                            )
                    }
                <TextArea 
                    rows={4} 
                    placeholder="What do you think this boxer does well in this video?"
                    onChange={(e) => setDoesWell(e.target.value)}
                    value={doesWell} />
                    {
                        doesWell.length < 20 && (
                            <div className='warning'>{text}</div>
                        )
                    }
                <TextArea 
                    rows={4} 
                    placeholder="Do you have other comments you would like to add?"
                    onChange={(e) => setOtherComments(e.target.value)}
                    value={otherComments} />
                    {
                        otherComments.length < 20 && (
                            <div className='warning'>{text}</div>
                        )
                    }
                <Button disabled={isDisabled} onClick={()=> addReview(foot, head, punch,
                                                                      posture, rating, recommend,
                                                                      doesWell, otherComments, displayName )}>Add Review</Button>
            </div>
            <FetchedComments/>
        </>
    );
};
