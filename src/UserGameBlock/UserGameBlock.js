import React, { Component } from 'react';
import APIContext from '../APIContext';
import './UserGameBlock.css';

class UserGameBlock extends Component {
    static contextType = APIContext;

    render() {
        const gameID = this.props.gameID;
        const uid = this.props.uid;

        const userGameSpecs = this.context.userGames.filter(function(game) {
            return game.game_id === gameID && game.uid === uid;
        })

        return (
            <section className='UserBoardGame'>
                <img className='userBoardGameImage' src={this.props.gameImage} alt={this.props.title} />
                <h3>{this.props.title}</h3>
                <div className='userBoardGameRatings'>
                    <p>Your rating: {userGameSpecs[0].rating}</p>
                    <p>BGG rating: {this.props.bggRating}</p>
                </div>
                <p>{this.props.info}</p>
                <p className='userBoardGameNotesHeader'>Your notes:</p>
                <p>{userGameSpecs[0].notes}</p>
            </section>
        );
    }
}

export default UserGameBlock;