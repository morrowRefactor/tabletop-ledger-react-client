import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './PickPlayBlock.css';

class PickPlayBlock extends Component {
    static contextType = APIContext;

    renderPlays = () => {
        if(this.props.playCount) {
            return <p className='PickPlayBlockPlayCount'>TTL Sessions Logged: {this.props.playCount}</p>;
        };
    };

    render() {
        const linkText = this.props.title.replace(/\s+/g, '-').toLowerCase();
        const link = `/game/${this.props.id}/${linkText}`;

        return (
            <section className='PickPlayBlock'>
                <img className='PickPlayBlockImage' src={this.props.gameImage} alt={this.props.title} />
                <section className='PickPlayInfo'>
                    <h3><Link to={link}>{this.props.title}</Link></h3>
                    <p className='PickPlayBlockRating'>BGG Rating: {this.props.bggRating}</p>
                </section>
                <button className='PickPlayButton' onClick={() => this.props.addGame(this.props.title)}>Add</button>
            </section>
        );
    }
}

export default PickPlayBlock;