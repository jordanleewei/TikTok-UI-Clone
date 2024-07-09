import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import './tailwind.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import Loading from './components/Loading';

const initialVideoData = [
  {
    s3ObjectKey: 'videos/kelvin-572d8289-9503-4193-b24f-dc9d37f4a491',
    profilePic: 'https://ugc.production.linktr.ee/dJvH0sddQmuSAPopqmcZ_A28U5NIyz26M5uen',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
    longPressAudioUrl: require('./audio/kelvin-572d8289-9503-4193-b24f-dc9d37f4a491.mp3'), // Add audio URL here
  },
  {
    s3ObjectKey: 'videos/kelvin-fcee7179-03fe-40a5-b1d8-cae5412bf3c6',
    profilePic: 'https://avatars.githubusercontent.com/u/41463883?s=200&v=4',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
    longPressAudioUrl: require('./audio/kelvin-fcee7179-03fe-40a5-b1d8-cae5412bf3c6.mp3'), // Add audio URL here
  },
  {
    s3ObjectKey: 'videos/kelvin-73b869ba-be86-4238-8bbe-045c03d6b357',
    profilePic: 'https://steamuserimages-a.akamaihd.net/ugc/1798648461453470649/AB683319B0F941C1726E5FEC077A1B50CED0F4B1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
    longPressAudioUrl: require('./audio/kelvin-73b869ba-be86-4238-8bbe-045c03d6b357.mp3'), // Add audio URL here
  },
  {
    s3ObjectKey: 'videos/kelvin-a20503b5-a8d4-4dfc-9882-855c013981b4',
    profilePic: 'https://external-preview.redd.it/_ysVY46s4W2COAnR769iuSMM-bTPFrhH_YmJS2WeDnw.jpg?auto=webp&s=ab4dad2ccf5caf76fa1f8107e6a727295862ec45',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
    longPressAudioUrl: require('./audio/kelvin-a20503b5-a8d4-4dfc-9882-855c013981b4.mp3'), // Add audio URL here
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoDetailsPromises = initialVideoData.map(async (video) => {
          const response = await axios.get('https://fxp-backend-fast-0ddf2d1e1ef6.herokuapp.com/video-mp4-base64', {
            params: {
              username: 'kelvin',
              s3ObjectKey: video.s3ObjectKey,
            },
          });
          const videoBase64 = response.data.videoBase64;
          return { ...video, url: videoBase64 };
        });

        const videosWithDetails = await Promise.all(videoDetailsPromises);
        setVideos(videosWithDetails);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        observer.observe(videoRef);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  return (
    <div className="app">
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <TopNavbar className="top-navbar" />
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
      )}
    </div>
  );
}

export default App;
