import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GameBlock from '../GameBlock/GameBlock';
import APIContext from '../APIContext';
import './GamePageMain.css';

class GamePageMain extends Component {
    static contextType = APIContext;

    render() {
        const games = this.context.games.map(game =>
            <GameBlock
                key={game.id}
                id={game.id}
                title={game.title}
                info={game.info}
                image={game.image}
                bggRating={game.bgg_rating}
            />
        );

        return (
            <section className='GamePageMain'>
                <h1>Games</h1>
                <p>Don't see a game you're looking for? <Link to='/add-games'>Add it!</Link></p>
                {games}
            </section>
        );
    }
}

export default GamePageMain;