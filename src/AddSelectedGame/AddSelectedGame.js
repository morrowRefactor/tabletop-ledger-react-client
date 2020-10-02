import React, { Component } from 'react';
import APIContext from '../APIContext';
import './AddSelectedGame.css';

class AddSelectedGame extends Component {
    static contextType = APIContext;

    truncate = str => {
        return (str.length > 200) ? str.substr(0, 199) + '... ' : str;
    };

    render() {
        const bggRating = this.props.rating;
        const rating = Math.round(bggRating * 10) / 10

        return (
            <section className='AddSelectedGame'>
                <img className='addSelectedGameImage' src={this.props.image} alt={this.props.title} />
                <h3>{this.props.title} ({this.props.yearPub})</h3>
                <p>BGG Rating: {rating}</p>
                <p>{this.truncate(this.props.info)}</p>
                <section className='AddSelectedGame_confirm'>
                    <p>Is this the game you're looking to add?</p>
                    <button>Yep! Add it!</button>
                    <p>No? Try a different game from the results below or try a new search term.</p>
                </section>
            </section>
        );
    }
}

export default AddSelectedGame;