import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [videoURL, setVideoURL] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetchVideo', { url: videoURL });
      setVideoInfo(response.data);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  return (
    <div className="App">
      <h1>Video Downloader</h1>
      <input
        type="text"
        placeholder="Enter video URL"
        value={videoURL}
        onChange={(e) => setVideoURL(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {videoInfo && (
        <div>
          <h2>{videoInfo.title}</h2>
          <video src={videoInfo.videoUrl} controls />
          <a href={videoInfo.downloadUrl} download>Download</a>
        </div>
      )}
    </div>
  );
}

export default App;