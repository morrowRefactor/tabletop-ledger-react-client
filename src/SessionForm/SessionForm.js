import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import SessionPlayerForm from '../SessionPlayerForm/SessionPlayerForm';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import config from '../config';
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
            game_id: this.state.gameID,
            uid: this.state.hostID,
            date: this.state.date.value
        };

        fetch(`${config.API_ENDPOINT}/api/sessions`, {
            method: 'POST',
            body: JSON.stringify(newSession),
            headers: {
              'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            
            return res.json()
        })
        .then(data => {
            if(this.state.notes.touched === true && this.state.notes.value.length > 0) {
                this.handleSessionNotes(data);
            }
            else {
                this.handleSessionPlayers(data);
            }
        })
        .catch(error => {
            this.setState({ error })
        })
    };
    
    handleSessionNotes = newSession => {
        const newNote = {
            uid: this.state.hostID,
            session_id: newSession.id,
            note: this.state.notes.value
        };

        fetch(`${config.API_ENDPOINT}/api/session-notes`, {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
              'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .catch(error => {
            this.setState({ error })
        })

        this.handleSessionPlayers(newSession);
    };

    handleSessionPlayers = newSession => {
        // populate players array with each entry submitted
        let newSessionScores = [];

        const hostScore = {
            uid: parseInt(this.props.match.params.uid),
            session_id: newSession.id,
            game_id: this.state.gameID,
            name: document.getElementById('hostName').value,
            score: parseInt(document.getElementById('hostScore').value),
            winner: document.getElementById('hostWin').checked
        };
        let newArr = newSessionScores;
        newArr.push(hostScore);
        newSessionScores = newArr;

        if(this.state.playerCount.length > 1) {
            for(let i = 0; i < this.state.playerCount.length; i++) {
                const id = this.state.playerCount[i];
                const playerName = document.getElementById(`playerID[${id}]`);
                const playerScore = document.getElementById(`scoreID[${id}]`);
                const playerWin = document.getElementById(`winnerID[${id}]`);
                const newPlayer = {
                    session_id: newSession.id,
                    game_id: this.state.gameID,
                    name: playerName.value,
                    score: parseInt(playerScore.value),
                    winner: playerWin.checked
                };
                let newArr = newSessionScores;
                newArr.push(newPlayer);
                newSessionScores = newArr;
            }
        }

        fetch(`${config.API_ENDPOINT}/api/session-scores`, {
            method: 'POST',
            body: JSON.stringify(newSessionScores),
            headers: {
              'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .catch(error => {
            this.setState({ error })
        })

        this.handleHostStats(hostScore);
    }

    handleHostStats = hostScore => {
        const currStats = this.context.userStandings.find(({uid}) => uid === hostScore.uid);
        let newStats = currStats;

        if(hostScore.winner === true) {
            newStats.sessions = currStats.sessions + 1;
            newStats.wins = currStats.wins + 1;
        }
        else{
            newStats.sessions = currStats.sessions + 1;
            newStats.losses = currStats.losses + 1;
        }
        
        fetch(`${config.API_ENDPOINT}/api/user-standings/${newStats.id}`, {
            method: 'PATCH',
            body: JSON.stringify(newStats),
            headers: {
              'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .catch(error => {
            this.setState({ error })
        })
        
        this.props.history.push(`/gamer/${this.props.match.params.uid}`);
    }
    

    handleClickCancel = () => {
        this.props.history.push('/');
    };

    render() {
        const titleError = this.validateTitle();
        const dateError = this.validateDate();
        let gameList = [];
        let user = { name: '' };
        const addGameLink = `/add-games/${parseInt(this.props.match.params.uid)}`
        const sessionPlayers = this.state.playerCount.map(plyr => 
            <SessionPlayerForm
                key={plyr}
                id={plyr}
            />
        );
        
        if(this.context.users.length < 1) {
            this.context.refreshState();
        }

        //check whether a new game was just added and state needs to be refreshed
        if(this.props.location.pathname.includes('/new-game')) {
            this.context.refreshState();
            this.props.history.push(`/add-session/${this.props.match.params.uid}`)
        }

        else{
            const thisUser = this.context.users.find(({id}) => id === parseInt(this.props.match.params.uid));
            if(thisUser) {
                user = thisUser
            }
            
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

        }
        
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
                        <p className='gameTitleHelperText'>Don't see the game you're looking for? <Link to={addGameLink}>Add it!</Link></p>
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
                        <label htmlFor='winner'>
                            Winner
                        </label>
                        <input
                            id='hostWin'
                            type='checkbox'
                        />
                        <label htmlFor='sessionPlayerName'>
                            You
                        </label>
                        <input
                            type='text'
                            id='hostName'
                            defaultValue={user.name}
                            required
                        />
                        <label htmlFor='sessionPlayerScore'>
                            Score
                        </label>
                        <input
                            type='text'
                            id='hostScore'
                            placeholder='100'
                            required
                        />
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