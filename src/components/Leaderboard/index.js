import React from 'react';
import { withFirebase } from "../Firebase";

class Leaderboard extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      users: [],
      loading: false,

    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.topUsers().get().then(snapshot => {
      let usersList = []; // might be a way to get info from firebase without having to loop through like this
      snapshot.docs.forEach(doc => {
        usersList.push(doc.data());
      });
      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  render () {
    return (
      <div className='leaderboard-page'>
        <h1 className='sign-up-logo'>Wisest Wizards:</h1>
        <div className='leaderboard'>
          {this.state.users.map((user, index) => (
            <div key ={user.uid} className='leaderboard-entry'>
              <span>{index + 1}.</span> <span>{user.username}</span> <span>{user.experience}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }


}

export default withFirebase(Leaderboard);
