import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay, longPressAudioUrl } = props;
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [longPress, setLongPress] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const longPressTimeout = useRef(null);
  const isLongPressActive = useRef(false);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
      videoRef.current.volume = 0.5; // Set default volume to 0.5
    }
  }, [autoplay]);

  useEffect(() => {
    console.log('Video URL:', url);
  }, [url]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      videoRef.current.volume = 0.5; // Set default volume to 0.5 when playing
    } else {
      videoRef.current.pause();
    }
  };

  const handleLongPressStart = () => {
    console.log('Long press start');
    isLongPressActive.current = true;
    longPressTimeout.current = setTimeout(() => {
      setLongPress(true);
      handleLongPressAction();
    }, 400); // Duration for long press (400ms)
  };

  const handleLongPressEnd = () => {
    console.log('Long press end');
    clearTimeout(longPressTimeout.current);
    if (isLongPressActive.current) {
      if (longPress) {
        if (audioRef.current) {
          console.log('Pausing audio');
          audioRef.current.pause();
        }
        setAccessibilityMode(false);
        setLongPress(false);
        if (videoRef.current) {
          videoRef.current.volume = 0.5; // Reset volume to 0.5
        }
      } else {
        onVideoPress();
      }
    }
    isLongPressActive.current = false;
  };

  const handleLongPressAction = () => {
    console.log('Playing audio');
    if (audioRef.current) {
      audioRef.current.play();
      setAccessibilityMode(true);
      if (videoRef.current) {
        videoRef.current.volume = 0.1; // Lower video volume when accessibility audio plays
      }
    }
  };

  return (
    <div className="video">
      <div
        className="left-edge-overlay"
        onMouseDown={handleLongPressStart}
        onTouchStart={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
        onTouchEnd={handleLongPressEnd}
      ></div>
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        controls
        src={url}
      >
        Your browser does not support the video tag.
      </video>
      {accessibilityMode && (
        <div className="accessibility-mode">
          Accessibility Mode
        </div>
      )}
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} />
        </div>
      </div>
      <audio ref={audioRef} src={longPressAudioUrl} />
    </div>
  );
};

export default VideoCard;
