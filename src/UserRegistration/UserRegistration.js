import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import APIHelpers from '../api-helpers';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import './UserRegistration.css';

class UserRegistration extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props)
        this.state = {
            userName: { value: '', touched: false },
            userInfo: { value: '', touched: false },
            userPassword: { value: '', touched: false },
            confirmPassword: { value: '', touched: false }
        };
    };

    handleSubmit = e => {
        e.preventDefault();
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(this.state.userName.Value, this.state.userPassword.value)
        );
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        
        AuthApiService.postUser({
            name: this.state.userName.value,
            about: this.state.userInfo.value,
            password: this.state.userPassword.value,
            joined_date: new Date()
        })
        .then(res => {
            TokenService.saveAuthToken(res.authToken);
            APIHelpers.postNewUserStandings(res.id);
            this.context.setUser(res);
            this.props.history.push(`/`);
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    updateUserName = name => {
        this.setState({userName: {value: name, touched: true}});
    };

    updateUserInfo = about => {
        this.setState({userInfo: {value: about, touched: true}});
    };

    updatePassword = password => {
        this.setState({userPassword: {value: password, touched: true}});
    };

    validateUserName = () => {
        const name = this.state.userName.value.trim();
        if (name.length === 0) {
          return 'A user name is required';
        };
    };

    validateUserPassword = () => {
        const password = this.state.userPassword.value.trim();
        if (password.length === 0) {
          return 'A password is required';
        };
    };

    render() {
        const nameError = this.validateUserName();
        const passwordError = this.validateUserPassword();
        
        return (
            <section className='UserRegistration'>
               <form 
                    className='UserRegistration_form'
                    onSubmit={this.handleSubmitJwtAuth}
                >
                    <label htmlFor='userName'>
                        User Name
                    </label>
                    <input
                        type='text'
                        id='userName'
                        onChange={e => this.updateUserName(e.target.value)}
                        required
                    />
                    {this.state.userName.touched && (
                        <ValidationError message={nameError} />
                    )}
                    <label htmlFor='userInfo'>
                        About
                    </label>
                    <input
                        type='text'
                        id='userInfo'
                        onChange={e => this.updateUserInfo(e.target.value)}
                        required
                    />
                    <label htmlFor='userPassword'>
                        Password
                    </label>
                    <input
                        type='text'
                        id='userPassword'
                        onChange={e => this.updatePassword(e.target.value)}
                        required
                    />
                    {this.state.userPassword.touched && (
                        <ValidationError message={passwordError} />
                    )}
                    <button 
                        type='submit'
                    >
                        Register
                    </button>
                </form> 
            </section>
        );
    }
}

export default withRouter(UserRegistration);