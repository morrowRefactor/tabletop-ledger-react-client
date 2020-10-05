import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './GameBlock.css';

class GameBlock extends Component {
    static contextType = APIContext;

    truncate = str => {
        return (str.length > 200) ? str.substr(0, 199) + '... ' : str;
    };

    render() {
        const linkText = this.props.title.replace(/\s+/g, '-').toLowerCase();
        const link = `/game/${this.props.id}/${linkText}`;

        return (
            <section className='GameBlock'>
                <img className='gameBlockImage' src={this.props.image} alt={this.props.title} />
                <h3><Link to={link}>{this.props.title}</Link></h3>
                <p className='gameBlockRating'>BGG Rating: {this.props.bggRating}</p>
                <p>{this.truncate(this.props.info)}</p>
            </section>
        );
    }
}

export default GameBlock;