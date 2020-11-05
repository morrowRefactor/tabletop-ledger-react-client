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
                    required
                />
            </section>
        );
    }
}

export default AddSessionPlayerForm;