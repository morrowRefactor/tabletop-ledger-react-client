import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIContext from '../APIContext';
import GameTip from '../GameTip/GameTip';
import TokenService from '../services/token-service';
import jwt_decode from 'jwt-decode';
import config from '../config';
import './GamePage.css';

class GamePage extends Component {
    static contextType = APIContext;

    getGames = () => {
        this.context.refreshState();
        this.context.getUserData();
        this.context.getSessionData();
    }

    // allows users to add a game to their account list
    addUserGame = gameId => {
        const token = TokenService.getAuthToken();
        const user = jwt_decode(token);
        let userGame = {
            uid: user.user_id,
            game_id: gameId
        };

        fetch(`${config.API_ENDPOINT}/api/user-games`, {
            method: 'POST',
            body: JSON.stringify(userGame),
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(() => {
            this.context.getUserData();
            this.props.history.push(`/gamer/${userGame.uid}`);
        })
        .catch(error => {  
        })
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

    renderAddGameButton = () => {
        const thisGame = this.context.games.find(({ id }) => id === parseInt(this.props.match.params.game_id));
        return (
            <div className='gamePageUserGameAdd'>
                <button onClick={() => this.addUserGame(thisGame.id)}>Add to my games</button>
            </div>
        );
    };

    render() {
        const gameCheck = this.context.games.find(({ id }) => id === parseInt(this.props.match.params.game_id));
        let thisGame = { title: '' };
        let gamePlays = 0;
        
        // ensure games are populated in state when loading component
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
                <section className='GamePage_gameInfo'>
                    {TokenService.hasAuthToken()
                        ? this.renderAddGameButton()
                        : ''
                    }
                    <p className='gamePagePlayCount'>TTL Sessions Logged: {gamePlays}</p>
                    <p className='gamePageRating'>BGG Rating: {thisGame.bgg_rating}</p>
                    <p>{thisGame.description}</p>
                    <h2>Player Tips</h2>
                    {this.renderGameTips()}
                </section>
            </section>
        );
    }
}

export default withRouter(GamePage);