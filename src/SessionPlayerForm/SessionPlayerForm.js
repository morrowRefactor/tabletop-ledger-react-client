import React, { Component } from 'react';
import APIContext from '../APIContext';
import './SessionPlayerForm.css';

class SessionPlayer extends Component {
    static contextType = APIContext;

    render() {
        // populates a unique ID to form fields for identification when form is submitted
        const winnerID = `winnerID[${this.props.id}]`;
        const playerID = `playerID[${this.props.id}]`;
        const scoreID = `scoreID[${this.props.id}]`;

        return (
            <section className='SessionForm_sessionPlayer'>
                <div>
                    <label htmlFor='winner'>
                        Winner
                    </label>
                    <input
                        id={winnerID}
                        type='checkbox'
                        onChange={() => this.props.setGameType('scored')}
                    />
                </div>
                <div className='sessionForm_sessionPlayerInfoFields'>
                    <label htmlFor='sessionPlayerName'>
                        Player Name
                    </label>
                    <input
                        type='text'
                        id={playerID}
                        placeholder='Jane Doe'
                        onChange={() => this.props.setGameType('scored')}
                        required
                    />
                    <label htmlFor='sessionPlayerScore'>
                        Score
                    </label>
                    <input
                        type='text'
                        id={scoreID}
                        placeholder='100'
                        onChange={() => this.props.setGameType('scored')}
                        required
                    />
                    <button className='sessionForm_removePlayerButton' onClick={() => this.props.removePlayer(playerID)}>Remove player</button>
                </div>
            </section>
        );
    }
}

export default SessionPlayer;