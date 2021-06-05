import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickPlayBlock from '../PickPlayBlock/PickPlayBlock';
import APIContext from '../APIContext';
import './PickPlay.css';

class PickPlay extends Component {
    static contextType = APIContext;
    constructor(props) {
        super(props)
        this.state = {
            gameSelections: [],
            randomGame: ''
        };
    };

    addGame = game => {
        let newArr = this.state.gameSelections;
        newArr.push(game);

        this.setState({
            gameSelections: newArr
        });
    };

    pickGame = () => {
        const random = Math.floor(Math.random() * this.state.gameSelections.length);
        this.setState({
            randomGame: this.state.gameSelections[random]
        });
    }

    render() {
        let user = { name: '' };
        let userGameMatches = [];
        let userGames;

        // ensure that all required data is present in context
        if(this.context.users.length < 1 || this.context.userGames.length < 1) {
            this.context.refreshState();
            this.context.getGameData();
            this.context.getUserData(parseInt(this.props.match.params.uid));
        }
        else if(this.props.location.pathname.includes('new-session')) {
            this.context.getUserData(parseInt(this.props.match.params.uid));
            this.props.history.push(`/gamer/${this.props.match.params.uid}`);
        }
        else {
            const thisUser = this.context.users.find(({id}) => id === parseInt(this.props.match.params.uid));
            user = thisUser;

            // get list of games associated to this user and populate an array with the relevant game objects
            const getUserGames = this.context.userGames.filter(function(game) {
                return game.uid === user.id;
            });
            
            getUserGames.forEach(game =>
                userGameMatches.push(
                    this.context.games.find(({id}) => id === game.game_id)
                )
            );
            
            userGames = userGameMatches.map(game => 
                <PickPlayBlock
                    key={game.id}
                    title={game.title}
                    bggRating={game.bgg_rating}
                    gameImage={game.image}
                    addGame={this.addGame}
                />
            )
        }

        return (
            <section className='PickPlay'>
                <h2>Pick-a-Play</h2>
                <h3>Can't decide what game to play?<br/>Narrow your games down to a select few and have TTL pick one at random!</h3>
                <button className='PickPlayButton' onClick={() => this.pickGame()}>Pick-a-Play!</button><br/>
                {this.state.randomGame}
                {userGames}
            </section>
        );
    }
}

export default PickPlay;