import React, { Component } from 'react';
import APIContext from '../APIContext';
import './GameTip.css';

class GameTip extends Component {
    static contextType = APIContext;

    render() {
        const user = this.context.users.find(({id}) => id === this.props.uid);

        return (
            <section className='GameTip'>
                <p>{user.name}</p>
                <p>{this.props.tip}</p>
            </section>
        );
    }
}

export default GameTip;