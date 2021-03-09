import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import TokenService from '../services/token-service';
import APIContext from '../APIContext';
import './NavBar.css';

class Navbar extends Component {
    static contextType = APIContext;

    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        this.handleMenuToggle();
    };

    handleMenuToggle = () => {
      if(window.innerWidth < 1200) {
          this.context.toggleNav()
      }
    };

    homeMenuToggle = () => {
      if(this.context.navbar === 'show') {
        this.context.toggleNav();
      }
    };

    // display logout link when user is logged in
    renderLogoutLink() {
        return (
          <li>
            <Link
              className='topNavLink'
              onClick={this.handleLogoutClick}
              to='/'>
              Logout
            </Link>
          </li>
        );
    };

    // display user's profile link when logged in
    renderProfileLink() {
      let id =this.context.thisUser.id;

      // check whether a user is logged in, but didn't populated in the api context
      const token = TokenService.getAuthToken();
      if(!this.context.thisUser.id && token.length > 20) {
          const user = jwt_decode(token);
          id = user.user_id;
      }
      const idLink = `/gamer/${id}`;

      return (
          <li>
            <Link 
              to={idLink}
              className='topNavLink'
              onClick={() => {this.handleMenuToggle()}}
            >
              My Profile
            </Link>
          </li>
      );
  };

    renderPlaceholder() {
      return (
        <span></span>
      );
    };
    
    // display user registration link when no auth token is present
    renderCreateLink() {
        return (
          <li>
            <Link
              to='/create-account'
              className='topNavLink'
              onClick={() => {this.handleMenuToggle()}}>
              Create Account
            </Link>
          </li>
        );
    };

    // display user login link when no auth token is present
    renderLoginLink() {
      return (
        <li>
          <Link
            to='/login'
            className='topNavLink'
            onClick={() => {this.handleMenuToggle()}}>
            Log in
          </Link>
        </li>
      );
  };

    render() {
        return (
            <nav className='TopNav'>
                <div className='topNavHeader'><Link className='topNavHeaderLink' to='/' onClick={() => {this.homeMenuToggle()}}>Tabletop Ledger</Link></div>
                <div className='hamburger'><button className='hamburgerButton' onClick={() => {this.context.toggleNav()}}>&#9776;</button></div>
                <div className='break'></div>
                <ul className={this.context.navbar}>
                  <section className='TopNav_contentContainer'>
                    <li><Link className='topNavLink' to='/games' onClick={() => {this.handleMenuToggle()}}>Games</Link></li>
                    <li><Link className='topNavLink' to='/leaderboards' onClick={() => {this.handleMenuToggle()}}>Leaderboards</Link></li>
                    {TokenService.hasAuthToken()
                        ? this.renderProfileLink()
                        : ''
                    }
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderCreateLink()
                    }
                    {TokenService.hasAuthToken()
                        ? this.renderPlaceholder()
                        : this.renderLoginLink()
                    }
                  </section>
                </ul>
            </nav>
        );
    };
};

export default Navbar;