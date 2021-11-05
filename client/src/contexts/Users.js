import React, {Component} from 'react';
import {history} from '../global';

const UsersContext = React.createContext();
const API_URL = 'http://localhost:5000';

class UsersContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: {},
      logUserIn: this.logUserIn,
      logUserOut: this.logUserOut,
      registerUserBuyer: this.registerUserBuyer,
      registerUserSeller: this.registerUserSeller,
    };
  }

  componentDidMount = async () => {
    const res = await fetch(`${API_URL}/api/user/verify`, {
      credentials: 'include',
    });
    const data = await res.json();
    const isLoggedIn = data.user ? true : false;
    const user = data.user ? data.user : {};
    this.setState({ isLoggedIn, user });
  };

  logUserIn = async (email, password) => {
    let title, text;
    const res = await fetch(`${API_URL}/api/user/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify({email, password }),
    });
    
    const { user, statusCode: responseStatus } = await res.json();
    if (responseStatus === 422) {
      title = 'Ooops!';
      text = 'Incorrect credentials.';
    } else if (responseStatus === 204) {
      this.setState({
        isLoggedIn: true,
        user,
      });
      console.log(user)

      title = 'Done';
      text = 'You will get redirected to home page.';
    } else {
      title = 'Ooops!';
      text = 'Something went wrong. Try again later.';
    }

    return { title, text };
  };

  registerUserBuyer = async (email, firstname, lastname, firstline, secondline, zipcode, city,
    state, country, merchant, username, password, confirmpassword, usertype) => {
    let title, text;


    if (password.length < 3 || confirmpassword.length < 3) {
      title = 'Ooops!';
      text = 'Password must be longer than 3 chars.';
    } else if (password !== confirmpassword) {
      title = 'Ooops!';
      text = 'Password and Confirm Password must match.';
    } else {
      const res = await fetch(`${API_URL}/api/user/register`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ usertype, email, firstname, lastname, password, address: {firstline,secondline,zipcode,city,secondline,country}, paymentmethods : {merchant, user:username}}),
      });

      const responseStatus = res.status;

      if (responseStatus === 409) {
        title = 'Ooops!';
        text = 'Username already taken.';
      } else if (responseStatus === 201) {
        title = 'Done';
        text = 'Your account was created.';
      } else {
        title = 'Ooops!';
        text = 'Something went wrong. Try again later.';
      }
    }

    return { title, text };
  };

  registerUserSeller = async (email, firstname, lastname, store, password, confirmpassword, usertype) => {
    let title, text;


    if (password.length < 3 || confirmpassword.length < 3) {
      title = 'Ooops!';
      text = 'Password must be longer than 3 chars.';
    } else if (password !== confirmpassword) {
      title = 'Ooops!';
      text = 'Password and Confirm Password must match.';
    } else {
      const res = await fetch(`${API_URL}/api/user/register`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ usertype, email, firstname, lastname, password, store}),
      });

      const responseStatus = res.status;

      if (responseStatus === 409) {
        title = 'Ooops!';
        text = 'Username already taken.';
      } else if (responseStatus === 201) {
        title = 'Done';
        text = 'Your account was created.';
      } else {
        title = 'Ooops!';
        text = 'Something went wrong. Try again later.';
      }
    }

    return { title, text };
  };

  logUserOut = async () => {
    await fetch(`${API_URL}/api/user/logout`, {
      credentials: 'include',
      method: 'PUT',
    });
    this.setState({ isLoggedIn: false, user: {} });
  };

  render() {
    return (
      <UsersContext.Provider value={this.state}>
        {this.props.children}
      </UsersContext.Provider>
    );
  }
}

export { UsersContext, UsersContextProvider };