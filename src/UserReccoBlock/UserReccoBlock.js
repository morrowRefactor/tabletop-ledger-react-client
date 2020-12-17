import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './UserReccoBlock.css';

class UserReccoBlock extends Component {
    static contextType = APIContext;
    render() {
        const user = this.context.users.find(({id}) => id === this.props.uid) || { name: '' };
        const recco = this.context.games.find(({id}) => id === this.props.recco) || { title: '' };

        const linkText = recco.title.replace(/\s+/g, '-').toLowerCase();
        const reccoLink = `/game/${recco.id}/${linkText}`;

        return (
            <section className='UserReccoBlock'>
                <p>{user.name}</p>
                <p><Link to={reccoLink}>{recco.title}</Link></p>
                <p>{this.props.note}</p>
            </section>
        );
    }
}

export default UserReccoBlock;