import React, { useState, useContext, useEffect } from 'react';
import '../assets/css/Timeline.css';
import Context from '../context/Context';

export default function UploadVideo() {
  const [videoLink, setVideoLink] = useState('');
  const [videoType, setVideoType] = useState('sparring');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { writeToDB, isAuth, displayName, 
          loginToken } = useContext(Context);

  useEffect(() => {
    isAuth()
  }, [])

  const handleVideoLinkChange = (event) => {
    setVideoLink(event.target.value);
    setSubmitDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    writeToDB(videoType, videoLink, displayName)
    setVideoLink('');
  };

  

  return (
    <div className='div-explainer'>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}>How it works</h3>
        <p style={{ textAlign: 'center' }}>Login/Signup and post a video of your sparring session, bag work or shadow boxing. Ensure the video is at least three minutes and get feedback from other boxers.</p>
      </div>
      {
        loginToken ? 
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label>
              Video Link:
              <input type="text" value={videoLink} onChange={handleVideoLinkChange} />
            </label>
            <label>
              Video Type:
              <select value={videoType} onChange={(event) => setVideoType(event.target.value)}>
                <option value="sparring">Sparring</option>
                <option value="bag-work">Bag Work</option>
                <option value="shadow-boxing">Shadow Boxing</option>
              </select>
            </label>
            <button type="submit" disabled={submitDisabled}>Submit</button>
          </form>
          :
          <p>Signup or Login to upload a video</p>
      }
    </div>
  );
}
