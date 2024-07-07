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
    console.log('Long press start');
    isLongPressActive.current = true;
    longPressTimeout.current = setTimeout(() => {
      setLongPress(true);
      handleLongPressAction();
    }, 800); // Duration for long press (800ms)
  };

  const handleLongPressEnd = () => {
    console.log('Long press end');
    clearTimeout(longPressTimeout.current);
    if (isLongPressActive.current) {
      if (longPress) {
        // Pause the audio when the long press ends
        if (audioRef.current) {
          console.log('Pausing audio');
          audioRef.current.pause();
        }
        setAccessibilityMode(false);
        setLongPress(false);
      } else {
        onVideoPress();
      }
    }
    isLongPressActive.current = false;
  };

  const handleLongPressAction = () => {
    // Play audio on long press
    console.log('Playing audio');
    if (audioRef.current) {
      audioRef.current.play();
      setAccessibilityMode(true);
    }
  };

  return (
    <div className="video">
      {/* Transparent overlay on the left edge */}
      <div
        className="left-edge-overlay"
        onMouseDown={handleLongPressStart}
        onTouchStart={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
        onTouchEnd={handleLongPressEnd}
      ></div>
      {/* The video element */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
        muted
      ></video>
      {accessibilityMode && (
        <div className="accessibility-mode">
          Accessibility Mode
        </div>
      )}
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
