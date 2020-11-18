import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import SessionPlayerForm from '../SessionPlayerForm/SessionPlayerForm';
import AddSessionPlayerForm from '../AddSessionPlayerForm/AddSessionPlayerForm';
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
            sessName: '',
            gameID: 0,
            gameTitle: { value: '', touched: false },
            date: { value: '', touched: false },
            notes: { value: '', touched: false },
            playerCount: [ 1 ],
            playerCountWL: [ 1 ],
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

    updateName = name => {
        this.setState({sessName: name});
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
            playerCount: newCount
        });
    };

    addPlayerWL = () => {
        let newCount = this.state.playerCountWL;
        newCount.push(newCount.length + 1);

        this.setState({
            playerCountWL: newCount
        });
    };

    handleSubmit = () => {
        const newSession = {
            game_id: this.state.gameID,
            uid: this.state.hostID,
            date: this.state.date.value,
            name: this.state.sessName
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
                this.handleUserCatMechLogs(newSession.game_id);
            }
            else {
                this.handleSessionPlayers(data);
                this.handleUserCatMechLogs(newSession.game_id);
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
        let newSessionScores = [];
        let hostScore = {};
        let winnerVal;

        // check whether scored or win/loss session was submitted
        const gameType = document.getElementById('winLoss').value;
        if(gameType === 'Yes' || gameType === 'No') {
            if (gameType === 'Yes') {
                winnerVal = true;
            }
            if (gameType === 'No') {
                winnerVal = false;
            }

            hostScore = {
                uid: parseInt(this.props.match.params.uid),
                session_id: newSession.id,
                game_id: this.state.gameID,
                name: document.getElementById('hostName').value,
                winner: winnerVal
            }
        }
        else {
            hostScore = {
                uid: parseInt(this.props.match.params.uid),
                session_id: newSession.id,
                game_id: this.state.gameID,
                name: document.getElementById('hostName').value,
                score: parseInt(document.getElementById('hostScore').value),
                winner: document.getElementById('hostWin').checked
            };
        }

        let newArr = newSessionScores;
        newArr.push(hostScore);
        newSessionScores = newArr;

        if(gameType === 'Yes' || gameType === 'No') {
            if(this.state.playerCountWL.length > 0) {
                for(let i = 0; i < this.state.playerCountWL.length; i++) {
                    const id = this.state.playerCountWL[i];
                    const playerName = document.getElementById(`playerIDWL[${id}]`);
                    const newPlayer = {
                        session_id: newSession.id,
                        game_id: this.state.gameID,
                        name: playerName.value,
                        winner: winnerVal
                    };
                    let newArr = newSessionScores;
                    newArr.push(newPlayer);
                    newSessionScores = newArr;
                }
            }
        }
        else {
            if(this.state.playerCount.length > 0) {
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

    // update the user logs for sessions played by game category and mechanic
    handleUserCatMechLogs = gameID => {
        // arrays of the category and mechanic IDs for this game
        let gameCats = [];
        let gameMechs = [];

        for(let i = 0; i < this.context.gameCatMatches; i++) {
            if(this.context.gameCatMatches[i].game_id === gameID) {
                let newArr = gameCats;
                newArr.push(this.context.gameCatMatches[i].cat_id);
                gameCats = newArr;
            }
        }

        for(let i = 0; i < this.context.gameMechMatches; i++) {
            if(this.context.gameMechMatches[i].game_id === gameID) {
                let newArr = gameMechs;
                newArr.push(this.context.gameMechMatches[i].mech_id);
                gameMechs = newArr;
            }
        }

        // arrays of the current session logs for this user by category and mechanic
        let userCatLogs = [];
        let userMechLogs = [];

        for(let i = 0; i < this.context.userGameCatLogs.length; i++) {
            if(this.context.userGameCatLogs[i].uid === this.state.hostID) {
                let newArr = userCatLogs;
                newArr.push(this.context.userGameCatLogs[i]);
                userCatLogs = newArr;
            }
        }

        for(let i = 0; i < this.context.userGameMechLogs.length; i++) {
            if(this.context.userGameMechLogs[i].uid === this.state.hostID) {
                let newArr = userMechLogs;
                newArr.push(this.context.userGameMechLogs[i]);
                userMechLogs = newArr;
            }
        }

        // arrays for any new category/mechanic logs that need to be posted or any existing logs that need to be patched
        let newUserCatLogs = [];
        let newUserMechLogs = [];
        let updateUserCatLogs = [];
        let updateUserMechLogs = [];

        gameCats.forEach(cat => {
            const catCheck = userCatLogs.find(({ cat_id }) => cat_id === cat);

            if(!catCheck) {
                const newCatLog = {
                    uid: this.state.hostID,
                    cat_id: cat,
                    sessions: 1
                };

                let newArr = newUserCatLogs;
                newArr.push(newCatLog);
                newUserCatLogs = newArr;
            }
            else {
                const updateCatLog = {
                    uid: catCheck.uid,
                    cat_id: catCheck.cat_id,
                    sessions: catCheck.sessions + 1
                };

                let newArr = updateUserCatLogs;
                newArr.push(updateCatLog);
                updateUserCatLogs = newArr;
            }
        });

        gameMechs.forEach(mech => {
            const mechCheck = userMechLogs.find(({ mech_id }) => mech_id === mech);

            if(!mechCheck) {
                const newMechLog = {
                    uid: this.state.hostID,
                    mech_id: mech,
                    sessions: 1
                };

                let newArr = newUserMechLogs;
                newArr.push(newMechLog);
                newUserMechLogs = newArr;
            }
            else {
                const updateMechLog = {
                    uid: mechCheck.uid,
                    mech_id: mechCheck.mech_id,
                    sessions: mechCheck.sessions + 1
                };

                let newArr = updateUserMechLogs;
                newArr.push(updateMechLog);
                updateUserMechLogs = newArr;
            }
        });
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

        const sessionPlayersWL = this.state.playerCountWL.map(plyr => 
            <AddSessionPlayerForm
                key={plyr}
                id={plyr}
            />
        );
        
        if(this.context.users.length < 1 || this.context.userGameMechLogs.length < 1) {
            this.context.refreshState();
            this.context.getUserData();
            this.context.getGameData();
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
                        <label htmlFor='name'>
                            Session Name (optional)
                        </label>
                        <input
                            type='name'
                            id='name'
                            placeholder='Gary exacts his revenge!'
                            onChange={e => this.updateName(e.target.value)}
                            required
                        />
                    </section>
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
                    <h3>Scored Sessions</h3>
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
                    <h3>Win/Loss Sessions</h3>
                    <section className='sessionForm_winLoss'>
                        <label htmlFor='winLoss'>
                            Did you win?
                        </label>
                        <select
                            type='select'
                            id='winLoss'
                        >
                            <option>Select</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        <label htmlFor='sessionPlayerName'>
                            You
                        </label>
                        <input
                            type='text'
                            id='hostNameWL'
                            defaultValue={user.name}
                            required
                        />
                        {sessionPlayersWL}
                        <button className='sessionFrom_addPlayer' type='button' onClick={e => this.addPlayerWL()}>Add another player</button>
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