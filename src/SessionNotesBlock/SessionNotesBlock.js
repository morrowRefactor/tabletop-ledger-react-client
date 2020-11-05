import React, { Component } from 'react';
import APIContext from '../APIContext';
import './SessionNotesBlock.css';

class SessionNotesBlock extends Component {
    static contextType = APIContext;

    render() {
        
        return (
            <section className='SessionNotesBlock'>
                <p>{this.props.name}</p>
                <p>{this.props.note}</p>
            </section>
        );
    }
}

export default SessionNotesBlock;