import React, { Component } from 'react';
import APIContext from '../APIContext';
import './UserStatBlock.css';

class UserStatBlock extends Component {
    static contextType = APIContext;

    render() {
        let boardStat;

        if(this.props.board === 'winRatio') {
            boardStat = parseFloat(this.props.ratio * 100).toFixed(2)+'%';
        }
        if(this.props.board === 'mostWins') {
            boardStat = this.props.wins;
        }
        if(this.props.board === 'mostSessions') {
            boardStat = this.props.sessions;
        }
        
        return (
            <section className='UserStatBlock'>
                <p>{this.props.name}</p>
                <p>{boardStat}</p>
            </section>
        );
    }
}

export default UserStatBlock;