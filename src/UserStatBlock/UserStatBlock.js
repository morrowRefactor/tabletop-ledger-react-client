import React, { Component } from 'react';
import APIContext from '../APIContext';
import './UserStatBlock.css';

class UserStatBlock extends Component {
    static contextType = APIContext;

    render() {
        let boardStat;

        if(this.props.board === 'winRatio') {
            boardStat = this.props.ratio;
        }
        if(this.props.board === 'mostWins') {
            boardStat = this.props.wins;
        }
        if(this.props.board === 'mostSessions') {
            boardStat = this.props.sessions;
        }
        
        return (
            <section className='UserStatBlock'>
                <div className='userStatBlockImage'>[User Image]</div>
                <section className='UserStatBlock_stats'>
                    <p>{this.props.name}</p>
                    <p>{boardStat}</p>
                </section>
            </section>
        );
    }
}

export default UserStatBlock;