import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay, longPressAudioUrl } = props;
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [longPress, setLongPress] = useState(false);
  const longPressTimeout = useRef(null);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleLongPressStart = () => {
    longPressTimeout.current = setTimeout(() => {
      setLongPress(true);
      handleLongPressAction();
    }, 800); // Duration for long press (800ms)
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimeout.current);
    if (!longPress) {
      onVideoPress();
    } else {
      // Pause the audio when the long press ends
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    setLongPress(false);
  };

  const handleLongPressAction = () => {
    // Play audio on long press
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="video">
      {/* The video element */}
      <video
        className="player"
        onMouseDown={handleLongPressStart}
        onTouchStart={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
        onTouchEnd={handleLongPressEnd}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
        muted
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          {/* The left part of the container */}
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          {/* The right part of the container */}
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
      <audio ref={audioRef} src={longPressAudioUrl} />
    </div>
  );
};

export default VideoCard;
