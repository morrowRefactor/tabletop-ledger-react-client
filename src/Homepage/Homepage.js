import React, { Component } from 'react';
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
                        <h3>Log Your Sessions and Scores</h3>
                        <p>Keep a ledger of your game sessions, including your scores, others players' scores, and notes. Use these accounts to monitor your top scores, win ratios, and help improve your game.</p>
                    </div>
                    <div className='homepage_featuresBox'>
                        <h3>Earn Badges and Climb Leaderboards</h3>
                        <p>As you log more of your game sessions you'll earn badges for your accomplishments. Watch yourself rise in the leadserboards as you hone your strategy.</p>
                    </div>
                </section>
            </section>
        );
    }
}

export default Homepage;