import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIContext from '../APIContext';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import './UserDemo.css';

class UserDemo extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props)
        this.state = {
            userName: 'Testy McTester',
            userPassword: 'Something12!',
            confirmPassword: 'Something12!'
        };
    };

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        
        AuthApiService.postLogin({
            name: this.state.userName,
            password: this.state.userPassword,
        })
        .then(res => {            
            TokenService.saveAuthToken(res.authToken)
            const user = this.context.users.find(({ name }) => name === this.state.userName);
            this.context.setUser(user);
            this.props.history.push(`/gamer/${user.id}`);
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    render() {        
        return (
            <section className='UserDemo'>
               <div className='UserDemo_logo'>
                    <img className='userDemo_logoImage' alt='Tabletop Ledger Logo' src='https://user-images.githubusercontent.com/58446465/101688934-913da480-3a21-11eb-9e36-6da84e4cea0e.png' />
               </div>
               <form 
                    className='UserDemo_form'
                    onSubmit={this.handleSubmitJwtAuth}
                >
                    <h1>Login to demo account</h1>
                    <div className='userDemoIntro'>
                        <p>Want to get a sense of Tabletop Ledger before creating an account? We're happy to oblige!</p>
                        <p>Login with the credentials below and you can test logging game sessions and updating an account.</p>
                    </div>
                    <section className='userDemo_formFields'>
                        <label htmlFor='userName'>
                            User Name
                        </label>
                        <input
                            type='text'
                            id='userName'
                            value='Testy McTester'
                            required
                        />
                    </section>
                    <section className='userDemo_formFields'>
                        <label htmlFor='userPassword'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='userPassword'
                            value='Something12!'
                            required
                        />
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

export default withRouter(UserDemo);