import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faPlus, faInbox, fa7, faUser } from '@fortawesome/free-solid-svg-icons';


function BottomNavbar() {
  return (
    <div className="bottom-navbar">
      <a href="https://tik-tok-ui-clone-git-for-you-jordanleewei.vercel.app" className="nav-item">
        <FontAwesomeIcon icon={faHouse} className="icon active" />
        <span className="item-name active">Home</span>
      </a>
      <div className="nav-item">
        <FontAwesomeIcon icon={faUserFriends} className="icon" />
        <span className="item-name">Friends</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faPlus} className="icon plus" />
        <span className="item-name">Create</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={fa7} className="notification" />
        <FontAwesomeIcon icon={faInbox} className="icon" />
        <span className="item-name">Inbox</span>
      </div>
      <a href="https://tik-tok-ui-clone-iota.vercel.app/profile-image">
        <div className="nav-item">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span className="item-name">Profile</span>
        </div>
      </a>

    </div>
  );
}

export default BottomNavbar;
