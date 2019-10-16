import React, { Component } from "react";
import { Link } from "react-router-dom";

class ImgCollection extends Component {
  componentDidMount() {
    this.props.getAvatars();
  }

  render() {
    let avatarInfo;
    avatarInfo = this.props.avatars.map(avatar => {
      return avatar.data();
    });

    return (
      <div className="avatar-container">
        <audio
          id="coinSound"
          src="https://firebasestorage.googleapis.com/v0/b/wizards-of-code.appspot.com/o/page-flip-01a.mp3?alt=media&token=8fdba966-a324-4c91-863f-18237b57852c"
          // autoPlay="{false}"
          type="audio/ogg"
        />

        {avatarInfo.map(avatar => (
          <div className="single-avatar">
            <a>{avatar.name}</a>
            <img src={avatar.imgUrl} alt="" className="img-avatar" />
            <p>{avatar.description}</p>

            <Link to={`/profile`}>
              <button
                onClick={() => this.props.setAvatar(avatar.imgUrl)}
                onMouseDown={this.props.pageSound}
                className="select-avatar"
              >
                Select avatar
              </button>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default ImgCollection;
