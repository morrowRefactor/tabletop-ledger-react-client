import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './NavBar.css';

class Navbar extends Component {
    static contextType = APIContext;

    render() {
        return (
            <nav className='Topnav'>
                <div className='topNavHeader'><Link className='topnavHeaderLink' to='/'>Tabletop Ledger</Link></div>
                <div className='hamburger'><button className='hamburgerButton' onClick={() => {this.context.toggleNav()}}>&#9776;</button></div>
                <div className='break'></div>
                <ul className={this.context.navbar}>
                    <li><Link className='topNavLink' to='/games'>Games</Link></li>
                    <li><Link className='topNavLink' to='/gamer/1'>My Profile</Link></li>
                </ul>
            </nav>
        );
    };
};

export default Navbar;