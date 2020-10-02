import React, { Component } from 'react';
import GameBlock from '../GameBlock/GameBlock';
import APIContext from '../APIContext';
import './GamePageMain.css';

class GamePageMain extends Component {
    static contextType = APIContext;

    render() {
        const games = this.context.games.map(game =>
            <GameBlock
                key={game.id}
                title={game.title}
                info={game.info}
                image={game.image}
                bggRating={game.bgg_rating}
            />
        );

        return (
            <section className='GamePageMain'>
                <h1>Games</h1>
                {games}
            </section>
        );
    }
}

export default GamePageMain;