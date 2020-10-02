import React, { Component } from 'react';
import APIContext from '../APIContext';
import './GameBlock.css';

class GameBlock extends Component {
    static contextType = APIContext;

    render() {
        

        return (
            <section className='BoardGame'>
                <h3>{this.props.title}</h3>
                <p>{this.props.info}</p>
            </section>
        );
    }
}

export default GameBlock;