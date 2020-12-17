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
            confirmPassword: { value: '', touched: false },
            passwordError: { value: '', status: false },
            passConfirmError: { value: '', status: false }
        };
    };

    handleSubmit = e => {
        e.preventDefault();
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(this.state.userName.Value, this.state.userPassword.value)
        );
    }

    handleSubmitJwtAuth = e => {
        e.preventDefault();
        
        // validate that password has required characters
        const regexPasswordCheck = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        if(!regexPasswordCheck.test(this.state.userPassword.value)) {
            this.setState({
                passwordError: { 
                    value: 'Password must contain at least one capital letter, one number, one special character, and be at least 8 characters long'},
                    status: true
            });
        }
        if(this.state.userPassword.value !== this.state.confirmPassword.value) {
            this.setState({
                passConfirmError: { 
                    value: 'Passwords must be an identical character match'},
                    status: true
            });
        }
        else {
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
    }

    updateUserName = name => {
        this.setState({userName: {value: name, touched: true}});
    };

    updateUserInfo = about => {
        this.setState({userInfo: {value: about, touched: true}});
    };

    updatePassword = password => {
        if(this.state.passwordError.value) {
            this.setState({
                userPassword: {value: password, touched: true},
                passwordError: { value: '', status: false }
            })
        }
        else {
            this.setState({userPassword: {value: password, touched: true}});
        }  
    };

    confirmPassword = password => {
        if(this.state.passConfirmError.value) {
            this.setState({
                confirmPassword: { value: password, touched: true },
                passConfirmError: { value: '', status: false }
            })
        }
        else {
            this.setState({confirmPassword: {value: password, touched: true}});
        }   
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
          return 'Password must contain at least one capital letter, one number, and one special character';
        };
    };

    render() {
        const nameError = this.validateUserName();
        const passwordError = this.validateUserPassword();
        
        return (
            <section className='UserRegistration'>
                <div className='UserRegistration_logo'>
                    <img className='userRegistration_logoImage' alt='Tabletop Ledger Logo' src='https://user-images.githubusercontent.com/58446465/101688934-913da480-3a21-11eb-9e36-6da84e4cea0e.png' />
               </div>
               <form 
                    className='UserRegistration_form'
                    onSubmit={this.handleSubmitJwtAuth}
                >
                    <h1>Create an account</h1>
                    <section className='userRegistration_formFields'>
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
                    </section>
                    <section className='userRegistration_formFields'>
                        <label htmlFor='userInfo'>
                            About
                        </label>
                        <input
                            type='textbox'
                            id='userInfo'
                            onChange={e => this.updateUserInfo(e.target.value)}
                        />
                    </section>
                    <section className='userRegistration_formFields'>
                        <label htmlFor='userPassword'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='userPassword'
                            onChange={e => this.updatePassword(e.target.value)}
                            required
                        />
                        {this.state.passwordError.value
                            ? <div className='passwordError'>{this.state.passwordError.value}</div>
                            : ''
                        }
                        {this.state.userPassword.touched && (
                            <ValidationError message={passwordError} />
                        )}
                    </section>
                    <section className='userRegistration_formFields'>
                        <label htmlFor='confirmPassword'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            onChange={e => this.confirmPassword(e.target.value)}
                            required
                        />
                        {this.state.passConfirmError.value
                            ? <div className='passwordError'>{this.state.passConfirmError.value}</div>
                            : ''
                        }
                    </section>
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