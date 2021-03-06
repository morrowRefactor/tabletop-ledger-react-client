import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './UserGameBlock.css';

class UserGameBlock extends Component {
    static contextType = APIContext;

    render() {
        const linkText = this.props.title.replace(/\s+/g, '-').toLowerCase();
        const gameID = this.props.gameID;
        const uid = this.props.uid;
        const gameLink = `/game/${this.props.gameID}/${linkText}`;
        const editLink = `/edit-game/${this.props.gameID}`;
        // get the data specific to this game in the user's collection
        let userGameSpecs = this.context.userGames.filter(function(game) {
            return (game.game_id === gameID && game.uid === uid);
        });
        if(userGameSpecs.length < 1) {
            userGameSpecs = [{rating: 'NA'}];
        };

        return (
            <section className='UserBoardGame'>
                <Link to={gameLink}><img className='userBoardGameImage' src={this.props.gameImage} alt={this.props.title} /></Link>
                <div className='userBoardGameEditLink'>
                    <Link 
                        to={{
                            pathname: editLink,
                            state: {
                                uid: uid,
                                game_id: gameID
                            }
                        }}>
                            Update game
                        </Link>
                </div>
                <Link to={gameLink}><h3 className='userBoardGame_title'>{this.props.title}</h3></Link>
                <div className='userBoardGameRatings'>
                    <p>Your rating: {!userGameSpecs[0].rating
                        ? 'NA'
                        : userGameSpecs[0].rating
                    }</p>
                    <p>BGG rating: {this.props.bggRating}</p>
                    <p>Your sessions: {this.props.playCount}</p>
                </div>
                <p>{this.props.info}</p>
                <p className='userBoardGameNotesHeader'>Your notes:</p>
                <p>{!userGameSpecs[0].notes
                    ? 'None yet'
                    : userGameSpecs[0].notes
                }</p>
            </section>
        );
    }
}

export default UserGameBlock;