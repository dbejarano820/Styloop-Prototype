import React, {Component, useState, setState} from 'react';
import {history} from '../global';

const UsersContext = React.createContext();
const API_URL = 'http://localhost:5000';

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
        let title, text, icon;
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
        text = 'Invalid email or password.';
        icon = 'error';
        } else if (responseStatus === 204) {
        this.setState({
            isLoggedIn: true,
            user,
        });

        title = 'Done';
        text = 'You will get redirected to home page.';
        icon = 'success';
        } else {
        title = 'Ooops!';
        text = 'Invalid email or password.';
        icon = 'error';
        }

        return { title, text, icon};
    };

    registerUserBuyer = async (email, firstname, lastname, firstline, secondline, zipcode, city,
                            state, country, merchant, username, password, confirmpassword, usertype) => {
        let title, text, icon;

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
                text = 'Email already taken.';
                icon = "error"
            } else if (responseStatus === 201) {
                title = 'Done';
                text = 'Your account was created.';
                icon = 'success'
            } else {
                title = 'Ooops!';
                text = 'Something went wrong.';
                icon = 'error'
            }
        }

        return { title, text, icon};
    };

    registerUserSeller = async (email, firstname, lastname, store, password, confirmpassword, usertype) => {
        let title, text;

        const reg_ex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;

        if(password.length < 8 || password.length > 16){
            console.log("contraseña de largo incorrecto")
            title = 'Ooops!';
            text = 'Password must be atleast 8 characters long';
        } else if (password != confirmpassword) {
            console.log("no confirmo la contraseña correctamente")
            title = 'Ooops!';
            text = 'Password and Confirmed Password do not match';
        } else if (!(reg_ex.test(password))) {
            console.log("no cumple las condiciones")
            title = 'Ooops!';
            text = 'Password must have an upper case letter, lower case letter, number and special character';
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