import React, { Component } from 'react';
import APIContext from '../APIContext';
import './SessionPlayerBlock.css';

class SessionPlayerBlock extends Component {
    static contextType = APIContext;

    render() {
        
        return (
            <section className='SessionPlayerBlock'>
                <p>Player: {this.props.name}</p>
                <p>Score: {this.props.score}</p>
                <p>Winner: {this.props.winner}</p>
            </section>
        );
    }
}

export default SessionPlayerBlock;