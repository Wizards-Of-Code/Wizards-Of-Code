import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ImgCollection extends Component {
  componentDidMount() {
    this.props.getAvatars()
  }

  render() {
    let avatarInfo;
    avatarInfo = this.props.avatars.map(avatar => {
      return avatar.data();
    });
    console.log(avatarInfo)
    return (
      <div className="avatar-container">
        <img
          className="home-img"
          src="https://wallpapermemory.com/uploads/489/wizard-background-hd-1080p-74705.jpg"
          alt=""
        />
        {avatarInfo.map(avatar => (
          <div className="single-avatar">
            <h1>{avatar.name}</h1>
            <p>{avatar.description}</p>
            <Link to={`/home`}>
              <button
                onClick={this.props.joinRandomBattle}
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
