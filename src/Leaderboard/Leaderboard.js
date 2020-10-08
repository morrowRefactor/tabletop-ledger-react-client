import React, { Component } from 'react';
import UserStatBlock from '../UserStatBlock/UserStatBlock';
import APIContext from '../APIContext';
import './Leaderboard.css';

class Leaderboard extends Component {
    static contextType = APIContext;

    render() {
        let userStats = [];

        for(let i = 0; i < this.context.userStandings.length; i++) {
            const user = this.context.users.find(({ id }) => id === this.context.userStandings[i].uid)
            const userData = {
                id: user.id,
                name: user.name,
                sessions: this.context.userStandings[i].sessions,
                wins: this.context.userStandings[i].wins,
                losses: this.context.userStandings[i].losses,
                ratio: this.context.userStandings[i].wins / this.context.userStandings[i].sessions
            };
            const newArr = userStats;
            newArr.push(userData);
            userStats = newArr;
        }

        const winRatio = userStats.sort((a,b) => (a.ratio < b.ratio) ? 1 : (a.ratio === b.ratio) ? ((a.sessions < b.sessions) ? 1 : -1) : -1);
        const mostWins = userStats.sort((a,b) => (a.wins < b.wins) ? 1 : (a.wins === b.wins) ? ((a.sessions < b.sessions) ? 1 : -1) : -1);
        const mostSessions = userStats.sort((a,b) => (a.sessions < b.sessions) ? 1 : (a.sessions === b.sessions) ? ((a.wins < b.wins) ? 1 : -1) : -1);

        const renderWinRatio = winRatio.map(user =>
            <UserStatBlock
                key={user.id}
                id={user.id}
                name={user.name}
                sessions={user.sessions}
                wins={user.wins}
                losses={user.losses}
                ratio={user.ratio}
                board='winRatio'
            />
        );

        const renderMostWins = mostWins.map(user =>
            <UserStatBlock
                key={user.id}
                id={user.id}
                name={user.name}
                sessions={user.sessions}
                wins={user.wins}
                losses={user.losses}
                ratio={user.ratio}
                board='mostWins'
            />
        );

        const renderMostSessions = mostSessions.map(user =>
            <UserStatBlock
                key={user.id}
                id={user.id}
                name={user.name}
                sessions={user.sessions}
                wins={user.wins}
                losses={user.losses}
                ratio={user.ratio}
                board='mostSessions'
            />
        );

        return (
            <section className='Leaderboard'>
                <h1>Leaderboard</h1>
                <h3>Highest Win Ratio</h3>
                {renderWinRatio}
                <h3>Most Wins</h3>
                {renderMostWins}
                <h3>Most Game Sessions</h3>
                {renderMostSessions}
            </section>
        );
    }
}

export default Leaderboard;