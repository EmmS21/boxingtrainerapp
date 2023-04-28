import React, { useEffect, useContext } from 'react';
import '../assets/css/Timeline.css';
import Context from '../context/Context';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function FetchedComments () {
    const { comments, boxingVid } = useContext(Context);

    useEffect(() => {
        console.log('currComment', comments)
        console.log('currBoxingVid', boxingVid)
    }, []);

    return (
        <VerticalTimeline layout={'1-column-left'}>
        </VerticalTimeline>
    );
};


// {Object.keys(data).map((key) => {
//     const item = data[key];
//     return (
//         <div className='div-post' key={key}>
//             {item.displayName && <p className='div-para'><strong>Username:</strong> {item.displayName}</p>}
//             <Space size={[0,8]} wrap>
//                 {item.videoType && <Tag color='cyan'>{item.videoType}</Tag>}
//                 {item.id && <Tag color="geekblue">{item.id}</Tag>}
//             </Space>
//             {item.videoLink && <VideoPlayer url={item.videoLink}/>}
//             <CommentOutlined onClick={()=> viewComments(item.id, item.videoLink)}/>
//         </div>
//     )
// })}




