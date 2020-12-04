import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import './UserLogin.css';

class UserLogin extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props)
        this.state = {
            userName: { value: '', touched: false },
            userPassword: { value: '', touched: false },
            confirmPassword: { value: '', touched: false }
        };
    };

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        
        AuthApiService.postLogin({
            name: this.state.userName.value,
            password: this.state.userPassword.value,
        })
        .then(res => {
            TokenService.saveAuthToken(res.authToken)
            const user = this.context.users.find(({ name }) => name === this.state.userName.value);
            this.context.setUser(user);
            this.props.history.push(`/gamer/${user.id}`);
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    updateUserName = name => {
        this.setState({userName: {value: name, touched: true}});
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
            <section className='UserLogin'>
               <form 
                    className='UserLogin_form'
                    onSubmit={this.handleSubmitJwtAuth}
                >
                    <h1>Login to your account</h1>
                    <section className='userLogin_formFields'>
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
                    <section className='userLogin_formFields'>
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
                    </section>
                    <button 
                        type='submit'
                    >
                        Login
                    </button>
                </form> 
            </section>
        );
    }
}

export default withRouter(UserLogin);