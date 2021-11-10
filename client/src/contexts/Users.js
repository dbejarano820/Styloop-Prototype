import React, {Component, useState, setState} from 'react';
import {history} from '../global';

const UsersContext = React.createContext();
const API_URL = 'http://localhost:5000';

function stringContainsNumber(_string) {
  return /\d/.test(_string);
}

class UsersContextProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
        isLoggedIn: false,
        isLoading: true,
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
        this.setState({ isLoggedIn, user, isLoading: false });
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

        const reg_ex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;

        console.log("Llamada inicial  " + password);
        console.log("LARGO: " + !(password.length < 8 || password.length > 16));
        console.log("regex: "+ (reg_ex.test(password)));
        
        if(password.length < 8 || password.length > 16){
            console.log("contraseña de largo incorrecto")
            title = 'Ooops!';
            text = 'Contraseña invalida';
        } else if (password != confirmpassword) {
            console.log("no confirmo la contraseña correctamente")
            title = 'Ooops!';
            text = 'Contraseña invalida';
        } else if (!(reg_ex.test(password))) {
            console.log("no cumple las condiciones")
            title = 'Ooops!';
            text = 'Contraseña invalida';
        } else {
            const res = await fetch(`${API_URL}/api/user/register`, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({ usertype, email, firstname, lastname, password, address: {firstline,secondline,zipcode,city,state,secondline,country}, paymentmethods : {merchant, user:username}}),
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

        var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
        
    
        if (password.length < 8 || confirmpassword.length < 8) {
            title = 'Ooops!';
            text = 'Password must be longer than 7 chars.';
        } else if (!pattern.test(password)){
            console.log("si no tiene special char")
            title = 'Ooops!';
            text = 'Password must contain a special character.';
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