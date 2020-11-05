import React, { Component } from 'react';
import APIContext from '../APIContext';
import SessionPlayerBlock from '../SessionPlayerBlock/SessionPlayerBlock';
import SessionNotesBlock from '../SessionNotesBlock/SessionNotesBlock';
import './SessionPage.css';

class SessionPage extends Component {
    static contextType = APIContext;

    render() {
        let thisSession = {};
        let sessionGame = {};
        let sessionScores = [];
        let sessionNotes = [];
        let playerScores;
        let playerNotes;
        let displayDate;

        if(this.context.sessions.length < 1 || this.context.games.length < 1) {
            this.context.getSessionData();
            this.context.refreshState();
        }
        else {
            //get session details
            thisSession = this.context.sessions.find(({id}) => id === parseInt(this.props.match.params.session_id));
            sessionGame = this.context.games.find(({id}) => id === thisSession.game_id);

            //display session date
            const sessionDate = new Date(thisSession.date);
            displayDate = sessionDate.toDateString();

            //populate array of session scores
            for(let i = 0; i < this.context.sessionScores.length; i++) {
                if(this.context.sessionScores[i].session_id === thisSession.id) {
                    const newArr = sessionScores;
                    newArr.push(this.context.sessionScores[i]);
                    sessionScores = newArr;
                }
            } 

            //order scores desc
            sessionScores.sort((a, b) => (parseInt(a.score) < parseInt(b.score)) ? 1 : -1);

            //display scores
            playerScores = sessionScores.map(sess => 
                <SessionPlayerBlock
                    key={sess.id}
                    name={sess.name}
                    score={sess.score}
                    winner={sess.winner}
                />
            )
            
            //populate session notes
            for(let i = 0; i < this.context.sessionNotes.length; i++) {
                if(this.context.sessionNotes[i].session_id === thisSession.id) {
                    const newNote = this.context.sessionNotes[i];
                    const user = this.context.users.find(({id}) => id === newNote.uid);
                    newNote.userName = user.name;
                    const newArr = sessionNotes;
                    newArr.push(newNote);
                    sessionNotes = newArr;
                }
            } 
            
            //display notes
            playerNotes = sessionNotes.map(sess => 
                <SessionNotesBlock
                    key={sess.id}
                    note={sess.note}
                    name={sess.userName}
                />
            )
        }
        
        return (
            <section className='SessionPage'>
                <h1>Session Overview</h1>
                <img className='sessionPageImage' src={sessionGame.image} alt={sessionGame.title} />
                <h2>{sessionGame.title}</h2>
                <p>Session date: {displayDate}</p>
                <h2>Players and Scores</h2>
                {playerScores}
                <h2>Session Notes</h2>
                {playerNotes}
            </section>
        );
    }
}

export default SessionPage;