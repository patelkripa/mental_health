import React from "react";
import "./GMR.css"; // Ensure you create a corresponding CSS file

const Resources = () => {
  // Example data for videos and audios
  const videos = [
    { id: 1, title: "Guided Meditation", url: "https://www.youtube.com/embed/6p_yaNFSYao" },
    { id: 2, title: "Relaxing Music", url: "https://www.youtube.com/embed/1ZYbU82GVz4" },
    { id: 3, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 4, title: "Mindfulness Exercises", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 5, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 6, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 7, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 8, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 9, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 10, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 11, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 12, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 13, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 14, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 15, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
    { id: 16, title: "Nature Sounds", url: "https://www.youtube.com/embed/qYnA9wWFHLI" },
  ];

  const audios = [
    { id: 1, title: "Soothing Rain", url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" },
    { id: 2, title: "Deep Relaxation", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
    { id: 3, title: "Peaceful Meditation", url: "https://www.bensound.com/bensound-music/bensound-november.mp3" },
    { id: 4, title: "Soothing Rain", url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" },
    { id: 5, title: "Deep Relaxation", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
    { id: 6, title: "Peaceful Meditation", url: "https://www.bensound.com/bensound-music/bensound-november.mp3" },
    { id: 7, title: "Soothing Rain", url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" },
    { id: 8, title: "Deep Relaxation", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
    { id: 9, title: "Peaceful Meditation", url: "https://www.bensound.com/bensound-music/bensound-november.mp3" },
    { id: 10, title: "Soothing Rain", url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" },
    { id: 11, title: "Deep Relaxation", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
    { id: 12, title: "Deep Relaxation", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
  ];

  return (
    <div className="resources-container">
      <div className="video">
      <h2>Videos</h2></div>
      <div className="video-section">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <iframe
              width="250"
              height="150"
              src={video.url}
              title={video.title}
              
              allowFullScreen
            ></iframe>
            <p>{video.title}</p>
          </div>
        ))}
      </div>
<div className="audio">
      <h2>Audios</h2></div>
      <div className="audio-section">
        {audios.map((audio) => (
          <div key={audio.id} className="audio-card">
            <audio controls>
              <source src={audio.url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <p>{audio.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
