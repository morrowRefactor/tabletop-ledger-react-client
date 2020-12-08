import React, { Component } from 'react';
import APIContext from '../APIContext';
import './AddSessionPlayerForm.css';

class AddSessionPlayerForm extends Component {
    static contextType = APIContext;

    render() {
        const playerID = `playerIDWL[${this.props.id}]`;

        return (
            <section className='SessionForm_sessionPlayerWL'>
                <label htmlFor='sessionPlayerName'>
                    Player Name
                </label>
                <input
                    type='text'
                    id={playerID}
                    placeholder='Jane Doe'
                    onChange={() => this.props.setGameType('win-loss')}
                    required
                />
                <button className='sessionForm_removePlayerButton' onClick={() => this.props.removePlayer(playerID)}>Remove player</button>
            </section>
        );
    }
}

export default AddSessionPlayerForm;