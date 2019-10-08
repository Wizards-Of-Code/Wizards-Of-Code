import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <img
      className="sign-up-img"
      src="https://www.wallpaperup.com/uploads/wallpapers/2015/05/25/697747/ccbbdacd5fe59fe7c6c7c70d5e95158a.jpg"
      alt=""
    />
    <h1 className="sign-up-logo">PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === ''; // consider using email.trim()
    return (
      <form onSubmit={this.onSubmit} className="sign-up-form">
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          className="input-fields"
        />
        <button disabled={isInvalid} type="submit" className="sign-up-btn">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }

}
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET} className="forgot-password">
      Forgot Password?
    </Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
