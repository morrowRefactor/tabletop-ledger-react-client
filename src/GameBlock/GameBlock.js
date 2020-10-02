import React, { Component } from 'react';
import APIContext from '../APIContext';
import './GameBlock.css';

class GameBlock extends Component {
    static contextType = APIContext;

    render() {

        return (
            <section className='GameBlock'>
                <img className='gameBlockImage' src={this.props.image} alt={this.props.title} />
                <h3>{this.props.title}</h3>
                <p className='gameBlockRating'>BGG Rating: {this.props.bggRating}</p>
                <p>{this.props.info}</p>
            </section>
        );
    }
}

export default GameBlock;