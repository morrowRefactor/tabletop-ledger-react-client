import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
import APIContext from '../APIContext';
import config from '../config';
import './EditUserGame.css';

class EditUserGame extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props)
        this.state = {
            uid: 0,
            game_id: 0,
            ownsGame: { value: false, touched: false },
            favoriteRank: { value: 0, touched: false },
            userRating: { value: 0, touched: false },
            gameNotes: { value: '', touched: false },
            currentVals: []
        };
    };

    componentDidMount = () => {
        if(this.context.userGames.length < 1) {
            this.context.refreshState();
            this.context.getUserData();
        }
        
        const { uid, game_id } = this.props.location.state;
        let allUsersGames = [];
        for(let i = 0; i < this.context.userGames.length; i++) {
            if(this.context.userGames[i].uid === uid) {
                let newArr = allUsersGames;
                newArr.push(this.context.userGames[i]);
                allUsersGames = newArr;
            }
        }
        const gameID = game_id;
        const thisGame = allUsersGames.find(({ game_id }) => game_id === gameID);

        this.setState({
            uid: uid,
            game_id: game_id,
            ownsGame: { value: thisGame.own, touched: false },
            favoriteRank: { value: thisGame.favorite, touched: false },
            userRating: { value: thisGame.rating, touched: false },
            gameNotes: { value: thisGame.notes, touched: false },
            currentVals: thisGame
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        let newEdits = this.state.currentVals;

        if(this.state.ownsGame.touched === true && this.state.ownsGame.value !== this.state.currentVals.own) {
            let ownVal;
            if(this.state.ownsGame.value === "Yes") {
                ownVal = true;
            }
            else { ownVal = false }

            newEdits.own = ownVal;
        }
        if(this.state.userRating.touched === true && this.state.userRating.value !== this.state.currentVals.rating) {
            newEdits.rating = Number.parseFloat(this.state.userRating.value);
        }
        if(this.state.gameNotes.touched === true && this.state.gameNotes.value !== this.state.currentVals.notes) {
            newEdits.notes = this.state.gameNotes.value;
        }

        fetch(`${config.API_ENDPOINT}/api/user-games/${newEdits.id}`, {
            method: 'PATCH',
            body: JSON.stringify(newEdits),
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

            this.context.getUserData();
            this.props.history.push(`/gamer/${this.state.uid}`);
        })
        .catch(error => {
        })
    }

    updateRating = rating => {
        this.setState({userRating: {value: rating, touched: true}});
    };

    updateOwnGame = owns => {
        this.setState({ownsGame: {value: owns, touched: true}});
    };

    updateNotes = note => {
        this.setState({gameNotes: {value: note, touched: true}});
    };

    render() {
        const thisGame = this.context.games.find(({ id }) => id === parseInt(this.props.match.params.game_id));

        return (
            <section className='EditUserGame'>
                <h2>Update this game in your collection</h2>
                <h3>{thisGame.title}</h3>
                <form 
                    className='EditUserGame_form'
                    onSubmit={this.handleSubmit}
                >
                    <label htmlFor='userRating'>
                        Your rating
                    </label>
                    <input
                        type='number'
                        id='userRating'
                        min="0"
                        max="10"
                        step="0.1"
                        onChange={e => this.updateRating(e.target.value)}
                    />
                    <label htmlFor='ownGame'>
                        Do you own this game?
                    </label>
                    <select
                        id='ownGame'
                        type='select'
                        onChange={e => this.updateOwnGame(e.target.value)}
                    >
                        <option>Select</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <label htmlFor='gameNotes'>
                        Game notes
                    </label>
                    <input
                        type='textbox'
                        id='gameNotes'
                        placeholder='ex: One of my favorites!'
                        onChange={e => this.updateNotes(e.target.value)}
                    />
                    <div>
                        <button type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default withRouter(EditUserGame);