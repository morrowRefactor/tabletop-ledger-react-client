import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import APIContext from '../APIContext';
import './NavBar.css';

class Navbar extends Component {
    static contextType = APIContext;

    handleLogoutClick = () => {
        TokenService.clearAuthToken();
    };

    renderLogoutLink() {
        return (
          <li className='topNavLink'>
            <Link
              onClick={this.handleLogoutClick}
              to='/'>
              Logout
            </Link>
          </li>
        );
    };

    renderProfileLink() {
      const id =this.context.thisUser.id;
      const idLink = `/gamer/${id}`;

      return (
          <li className='topNavLink'>
            <Link to={idLink}>My Profile</Link>
          </li>
      );
  };

    renderPlaceholder() {
      return (
        <span></span>
      );
    };
    
    renderCreateLink() {
        return (
          <li>
            <Link
              to='/create-account'
              className='topNavLink'>
              Create Account
            </Link>
          </li>
        );
    };

    renderLoginLink() {
      return (
        <li>
          <Link
            to='/login'
            className='topNavLink'>
            Log in
          </Link>
        </li>
      );
  };

    render() {
        return (
            <nav className='TopNav'>
                <div className='topNavHeader'><Link className='topNavHeaderLink' to='/'>Tabletop Ledger</Link></div>
                <div className='hamburger'><button className='hamburgerButton' onClick={() => {this.context.toggleNav()}}>&#9776;</button></div>
                <div className='break'></div>
                <ul className={this.context.navbar}>
                    <li><Link className='topNavLink' to='/games'>Games</Link></li>
                    <li><Link className='topNavLink' to='/leaderboards'>Leaderboards</Link></li>
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
                </ul>
            </nav>
        );
    };
};

export default Navbar;