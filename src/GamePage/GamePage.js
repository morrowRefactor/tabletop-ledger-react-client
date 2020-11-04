import React, { Component } from 'react';
import APIContext from '../APIContext';
import './GamePage.css';

class GamePage extends Component {
    static contextType = APIContext;

    getGames = () => {
        this.context.refreshState();
    }

    render() {
        const gameCheck = this.context.games.find(({ id }) => id === parseInt(this.props.match.params.game_id));
        let thisGame = { title: '' };
        let gamePlays = 0;
        
        if(this.context.games.length < 1 || !gameCheck) {
            this.getGames();
        }
        else {
            thisGame = gameCheck;

            // get total logged plays for this game
            const totalPlays = this.context.gameSessions.find(({ game_id }) => game_id === thisGame.id);
            if(totalPlays.cnt) {
                gamePlays = totalPlays.cnt;
            }
        }
        
        return (
            <section className='GamePage'>
                <h1>{thisGame.title}</h1>
                <img className='gamePageImage' src={thisGame.image} alt={thisGame.title} />
                <p>Total sessions logged on TTL: {gamePlays}</p>
                <p>BGG Rating: {thisGame.bgg_rating}</p>
                <p>{thisGame.description}</p>
                <h2>Player Tips</h2>
                <h2>Player Recommendations</h2>
            </section>
        );
    }
}

export default GamePage;