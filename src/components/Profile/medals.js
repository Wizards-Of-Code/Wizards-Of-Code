import React, {Component} from 'react';

class Medals extends Component {
    componentDidMount() {
        this.props.getMedals();
    }

    render(){
    let medalInfo;
    medalInfo = this.props.medals.map(medal => {
        return medal.data();
    });


    return (
      <div>
        <h1 className="sign-up-logo">Success Medals</h1>
        <div className="container-medal">
          {medalInfo.map(medal =>
            this.props.user.experience >= medal.reqExp ? (
              <div className="single-medal" key={medal.name}>
                <p>{medal.name}</p>
                <img src={medal.imgUrl} alt="" className="medal-img" />
              </div>
            ) : (
              ''
            )
          )}
        </div>
      </div>
    );
    }
}

export default Medals;
