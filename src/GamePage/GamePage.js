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
        
        if(this.context.games.length < 1 || !gameCheck) {
            this.getGames();
        }
        else {
            thisGame = gameCheck;
            
        }
        
        return (
            <section className='GamePage'>
                <h1>{thisGame.title}</h1>
                <img className='gamePageImage' src={thisGame.image} alt={thisGame.title} />
                <p>BGG Rating: {thisGame.bgg_rating}</p>
                <p>{thisGame.info}</p>
            </section>
        );
    }
}

export default GamePage;