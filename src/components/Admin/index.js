import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase.users().onSnapshot(snapshot => {
      let usersList = []; // might be a way to get info from firebase without having to loop through like this
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        usersList.push(change.doc.data());
      });
      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <img
          className="sign-up-img"
          src="https://www.wallpaperup.com/uploads/wallpapers/2015/05/25/697747/ccbbdacd5fe59fe7c6c7c70d5e95158a.jpg"
          alt=""
        />
        <h1 className="sign-up-logo">Admin</h1>

        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <div className="connected-users">
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong> Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default withFirebase(AdminPage);
