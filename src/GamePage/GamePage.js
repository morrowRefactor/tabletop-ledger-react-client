import React, { Component } from 'react';
import APIContext from '../APIContext';
import GameTip from '../GameTip/GameTip';
import UserReccoBlock from '../UserReccoBlock/UserReccoBlock';
import './GamePage.css';

class GamePage extends Component {
    static contextType = APIContext;

    getGames = () => {
        this.context.refreshState();
        this.context.getUserData();
        this.context.getSessionData();
    }

    addUserGame = () => {

    }

    renderGameTips = () => {
        let gameTips = [];
        for(let i = 0; i < this.context.gameTips.length; i++) {
            if(this.context.gameTips[i].game_id === parseInt(this.props.match.params.game_id)) {
                let newArr = gameTips;
                newArr.push(this.context.gameTips[i]);
                gameTips = newArr;
            }
        }

        if(gameTips.length > 0) {
            return (
                gameTips.map(tip => 
                    <GameTip
                        key={tip.id}
                        uid={tip.uid}
                        tip={tip.tip}
                    />
                )
            );
        }

        else {
            return 'No user tips for this game';
        }
    }

    renderGameReccos = () => {
        let gameReccos = [];
        for(let i = 0; i < this.context.userReccos.length; i++) {
            if(this.context.userReccos[i].game_id === parseInt(this.props.match.params.game_id)) {
                let newArr = gameReccos;
                newArr.push(this.context.userReccos[i]);
                gameReccos = newArr;
            }
        }

        if(gameReccos.length > 0) {
            return (
                gameReccos.map(recco => 
                    <UserReccoBlock
                        key={recco.id}
                        uid={recco.uid}
                        recco={recco.recco_game_id}
                        note={recco.note}
                    />
                )
            );
        }

        else {
            return 'No user recommendations for this game';
        }
    }

    render() {
        const gameCheck = this.context.games.find(({ id }) => id === parseInt(this.props.match.params.game_id));
        let thisGame = { title: '' };
        let gamePlays = 0;
        
        if(!gameCheck || this.context.games.length < 1) {
            this.getGames();
        }
        else {
            thisGame = gameCheck;

            // get total logged plays for this game
            const totalPlays = this.context.gameSessions.find(({ game_id }) => game_id === thisGame.id);
            if(totalPlays) {
                gamePlays = totalPlays.cnt;
            }
        }
        
        return (
            <section className='GamePage'>
                <h1>{thisGame.title}</h1>
                <img className='gamePageImage' src={thisGame.image} alt={thisGame.title} />
                <div className='gamePageUserGameAdd'>
                    <button>Add to my games</button>
                </div>
                <p>Total sessions logged on TTL: {gamePlays}</p>
                <p>BGG Rating: {thisGame.bgg_rating}</p>
                <p>{thisGame.description}</p>
                <h2>Player Tips</h2>
                {this.renderGameTips()}
                <h2>Player Recommendations</h2>
                {this.renderGameReccos()}
            </section>
        );
    }
}

export default GamePage;