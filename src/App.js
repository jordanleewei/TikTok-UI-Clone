import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import './tailwind.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://ugc.production.linktr.ee/dJvH0sddQmuSAPopqmcZ_A28U5NIyz26M5uen',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
    longPressAudioUrl: require('./audio/audio1.mp3'), // Add audio URL here
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://avatars.githubusercontent.com/u/41463883?s=200&v=4',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    longPressAudioUrl: require('./audio/audio2.mp3'), // Add audio URL here
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://steamuserimages-a.akamaihd.net/ugc/1798648461453470649/AB683319B0F941C1726E5FEC077A1B50CED0F4B1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
    longPressAudioUrl: require('./audio/audio3.mp3'), // Add audio URL here
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://external-preview.redd.it/_ysVY46s4W2COAnR769iuSMM-bTPFrhH_YmJS2WeDnw.jpg?auto=webp&s=ab4dad2ccf5caf76fa1f8107e6a727295862ec45',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
    longPressAudioUrl: require('./audio/audio4.mp3'), // Add audio URL here
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" />
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
            longPressAudioUrl={video.longPressAudioUrl} // Pass audio URL here
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
