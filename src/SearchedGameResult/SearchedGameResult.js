import React, { Component } from 'react';
import APIContext from '../APIContext';
import './SearchedGameResult.css';

class SearchedGameResult extends Component {
    static contextType = APIContext;

    render() {
        const gameID = this.props.id;

        return (
            <section className='SearchedGameResult'>
                <button onClick={e => this.props.getGameDetails(gameID)}>{this.props.title} ({this.props.yearPub})</button>
            </section>
        );
    }
}

export default SearchedGameResult;