import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './Homepage.css';

class Homepage extends Component {
    static contextType = APIContext;

    render() {

        return (
            <section className='Homepage'>
                <h1 className='homepageTitle'>Tabletop Ledger</h1>
                <section className='Homepage_overview'>
                    <h2 className='homepageSubTitle'>Gamifying tabletop gaming.<br/>Because why not.</h2>
                    <div className='homepageAbout'>
                        <p>Tabletop Ledger is a platform for expanding your passion for gaming beyond the game sessions themselves.</p>
                    </div>
                </section>
                <section className='Homepage_features'>
                    <div className='homepage_featuresBox'>
                        <img className='homepage_featureImage' alt='Log Sessions' src='https://user-images.githubusercontent.com/58446465/101686441-ea0b3e00-3a1d-11eb-90a7-8f4f090ad3ab.jpg' />
                        <h3>Log Your Sessions and Scores</h3>
                        <p>Keep a ledger of your game sessions, including your scores, others players' scores, and notes. Use these accounts to monitor your top scores, win ratios, and help improve your game.</p>
                    </div>
                    <div className='homepage_featuresBox'>
                        <img className='homepage_featureImage' alt='Climb Leaderboards' src='https://user-images.githubusercontent.com/58446465/101686430-e7104d80-3a1d-11eb-8d59-f08137153d47.jpg' />
                        <h3>Earn Badges and Climb Leaderboards</h3>
                        <p>As you log more of your game sessions you'll earn badges for your accomplishments. Watch yourself rise in the leadserboards as you hone your strategy.</p>
                    </div>
                </section>
                <section className='homepage_getStarted'>
                    <div className='homepage_getStartedLogo'>
                        <Link to='/create-account'><img className='homepage_featureImageLogo' alt='Tabletop Ledger Logo' src='https://user-images.githubusercontent.com/58446465/101688934-913da480-3a21-11eb-9e36-6da84e4cea0e.png' /></Link>
                    </div>
                    <div className='homepage_getStartedText'>
                        <h3 className='homepage_getStartedHeader'>Get Started</h3>
                        <p>Create an account and upgrade your tabletop gaming hobby!</p>
                        <Link to='/create-account'>Let's Go!</Link>
                        <p className='homepage_getStartedDemo'>Want to try it out first? Use our <Link to='/demo'>demo account</Link></p>
                    </div>
                </section>
            </section>
        );
    }
}

export default Homepage;