import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import SessionPlayer from '../SessionPlayer/SessionPlayer';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import './SessionForm.css';

class SessionForm extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props)
        this.state = {
            hostID: 0,
            gameID: 0,
            gameTitle: { value: '', touched: false },
            date: { value: '', touched: false },
            notes: { value: '', touched: false },
            playerCount: [ 1 ],
            scores: []
        };
    };

    componentDidMount = () => {
        this.setState({
            hostID: parseInt(this.props.match.params.uid)
        });

        if(this.context.games.length < 1) {
            this.context.refreshState();
        };
    };
    
    updateTitle = title => {
        this.setState({
            gameTitle: { value: title.value, touched: true },
            gameID: title.id
        });
    };

    updateDate = date => {
        this.setState({date: {value: date, touched: true }});
    };

    updateNotes = note => {
        this.setState({notes: {value: note, touched: true }});
    };

    //validate form field inputs
    validateTitle = () => {
        const title = this.state.gameTitle.value.trim();
        if (title.length === 0) {
            return 'A game title is required';
        };
    };

    validateDate = () => {
        const date = this.state.date.value.trim();
        if (date.length === 0) {
          return 'A posted date is required';
        };
    };
    
    addPlayer = () => {
        let newCount = this.state.playerCount;
        newCount.push(newCount.length + 1);
        
        this.setState({
          resCount: newCount
        });
    };

    handleSubmit = () => {
        const newSession = {
            id: (this.context.sessions.length + 1),
            game_id: this.state.gameID,
            uid: this.state.hostID,
            date: this.state.date.value
        };
        
        this.context.addSession(newSession);
       
        if(this.state.notes.touched === true && this.state.notes.value.length > 0) {
            this.handleSessionNotes(newSession);
        }
        else {
            this.handleSessionPlayers(newSession);
        }
    };
    
    handleSessionNotes = newSession => {
        const newNote = {
            id: (this.context.sessionNotes.length + 1),
            uid: this.state.hostID,
            session_id: newSession.id,
            note: this.state.notes.value
        };

        this.context.addSessionNotes(newNote);
        this.handleSessionPlayers(newSession);
    };

    handleSessionPlayers = newSession => {
        // populate players array with each entry submitted
        let newSessionScores = this.state.scores;
        for(let i = 0; i < this.state.playerCount.length; i++) {
            const id = this.state.playerCount[i];
            const playerName = document.getElementById(`playerID[${id}]`);
            const playerScore = document.getElementById(`scoreID[${id}]`);
            const newPlayer = {
                session_id: newSession.id,
                game_id: this.state.gameID,
                username: playerName.value,
                score: parseInt(playerScore.value)
            };
            newSessionScores.push(newPlayer);
        }

        this.context.addSessionScores(newSessionScores);
    }
    

    handleClickCancel = () => {
        this.props.history.push('/');
    };

    render() {
        let selectedValue;
        const titleError = this.validateTitle();
        const dateError = this.validateDate();

        let gameList = [];
        if(this.context.games.length > 0) {
            for(let i = 0; i < this.context.games.length; i++) {
                const thisGame = this.context.games[i];
                thisGame.value = thisGame.title;
                thisGame.label = thisGame.title;
                let newArr = gameList;
                newArr.push(thisGame);
                gameList = newArr.sort();
            }
        }

        const sessionPlayers = this.state.playerCount.map(plyr => 
            <SessionPlayer
                key={plyr}
                id={plyr}
            />
        );
      

        return (
            <section className='SessionForm'>
                <h1>Log a Game Session</h1>
                <form 
                    className='SessionForm_form'
                >
                    <section className='sessionForm_formField'>
                        <label htmlFor='gameTitle'>
                            Game title
                        </label>
                        <Select
                            id='gameTitle'
                            className='gameTitleOption'
                            options={gameList}
                            onChange={e => this.updateTitle(e)} 
                            value={gameList.filter(obj => obj.value === this.state.gameTitle.value)}
                            required
                        />
                        <p className='gameTitleHelperText'>Don't see the game you're looking for? <Link to='/add-games'>Add it!</Link></p>
                        {this.state.gameTitle.touched && (
                            <ValidationError message={titleError} />
                        )}
                    </section>
                    <section className='sessionForm_formField'>
                        <label htmlFor='date'>
                            Session Date
                        </label>
                        <input
                            type='date'
                            id='date'
                            min='2020-01-01'
                            onChange={e => this.updateDate(e.target.value)}
                            required
                        />
                        {this.state.date.touched && (
                            <ValidationError message={dateError} />
                        )}
                    </section>
                    <section className='sessionForm_formField'>
                        <label htmlFor='notes'>
                            Session Notes
                        </label>
                        <input
                            id='notes'
                            type='text'
                            placeholder='Notes are not required'
                            onChange={e => this.updateNotes(e.target.value)}
                        />
                    </section>
                    <section className='sessionForm_formField'>
                        <label htmlFor='sessionPlayer'>
                            Session Players
                        </label>
                        {sessionPlayers}
                        <button className='sessionFrom_addPlayer' type='button' onClick={e => this.addPlayer()}>Add another player</button>
                    </section>
                    <div className='AddDestinationForm_buttons'>
                        <button 
                            type='button'
                            onClick={e => this.handleSubmit()}
                        >
                            Add Session
                        </button>
                        {' '}
                        <button type='button' onClick={e => this.handleClickCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

export default SessionForm;