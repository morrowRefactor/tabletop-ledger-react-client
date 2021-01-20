import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import SessionPlayerForm from '../SessionPlayerForm/SessionPlayerForm';
import AddSessionPlayerForm from '../AddSessionPlayerForm/AddSessionPlayerForm';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import apiHelpers from '../api-helpers';
import TokenService from '../services/token-service';
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
            typeSelection: { value: '', touched: false },
            winTypeSelection: { value: '', touched: false },
            playerCount: { value: [ ], touched: false },
            playerCountWL: [ ],
            scores: [],
            gameType: '',
            validatedPlayers: [],
            validatedHostScore: {},
            submitError: { value: '', status: false }
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

    // update state with form field inputs
    updateName = name => {
        this.setState({sessName: name});
    };
    
    updateTitle = title => {
        if(this.state.submitError.status == true) {
            this.setState({
                submitError: { value: '', status: false },
                gameTitle: { value: title.value, touched: true },
                gameID: title.id
            })
        }
        else {
            this.setState({
                gameTitle: { value: title.value, touched: true },
                gameID: title.id
            });
        }
    };

    updateDate = date => {
        if(this.state.submitError.status == true) {
            this.setState({
                submitError: { value: '', status: false },
                date: {value: date, touched: true }
            })
        }
        else {
            this.setState({date: {value: date, touched: true }});
        }
    };

    updateNotes = note => {
        this.setState({notes: {value: note, touched: true }});
    };

    updateTypeSelect = type => {
        this.setState({typeSelection: {value: type, touched: true}});
    };

    updateWinTypeSelect = type => {
        this.setState({winTypeSelection: {value: type, touched: true}});
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
    
    // add fields to the form when user wants to add more players
    addPlayer = () => {
        let newCount = this.state.playerCount.value;
        newCount.push(newCount.length + 1);

        this.setState({
            playerCount: { value: newCount, touched: true }
        });
    };

    addPlayerWL = () => {
        let newCount = this.state.playerCountWL;
        newCount.push(newCount.length + 1);

        this.setState({
            playerCountWL: newCount
        });
    };

    removePlayer = player => {
        if(player.includes('WL')) {
            const currCount = this.state.playerCountWL;
            
            this.setState({
                playerCountWL: currCount
            });
        }
        else {
            const currCount = this.state.playerCount.value;
            
            this.setState({
                playerCount: {
                    value: currCount,
                    touched: true
                }
            });
        }
    }

    // set whether the user is inputing a scored game or a win/loss game
    setGameType = type => {
        if(this.state.submitError.status == true) {
            this.setState({
                submitError: {
                    value: '',
                    status: false
                },
                gameType: type
            });
        }
        else {
            this.setState({
                gameType: type
            })
        }
    };
    

    handleSubmit = () => {
        //in case previous errors were corrected, clear error in state
        if(this.state.submitError.status == true) {
            this.setState({
                submitError: {
                    value: '',
                    status: false
                }
            });
        };

        if(this.state.gameTitle.value.length < 1) {
            this.setState({
                submitError: {
                    value: 'A game title is required',
                    status: true
                }
            });
        };

        if(this.state.date.value.length < 1) {
            this.setState({
                submitError: {
                    value: 'A session date is required',
                    status: true
                }
            });
        };

        // host user (submitting user) info needs to be validated prior to submission
        if(this.state.gameType === 'scored') {
            const hostNameCheck = document.getElementById('hostName');
            if(!hostNameCheck || hostNameCheck.value.length < 1) {
                this.setState({
                    submitError: {
                        value: 'A name is required for each submitted player',
                        status: true
                    }
                });
            }
        };
        
        if(this.state.gameType === 'scored') {
            const hostScoreCheck = document.getElementById('hostScore');
            if(!hostScoreCheck || hostScoreCheck.value.length < 1) {
                this.setState({
                    submitError: {
                        value: 'For scored sessions, a score value is required for each player',
                        status: true
                    }
                });
            }
        };

        if(this.state.gameType === 'win-loss') {
            const hostNameCheck = document.getElementById('hostNameWL');
            if(!hostNameCheck || hostNameCheck.value.length < 1) {
                this.setState({
                    submitError: {
                        value: 'A name is required for each submitted player',
                        status: true
                    }
                });
            }
        };

        let newSessionScores = [];
        let hostScore = {};
        let winnerVal;

        // populate the host's score object for the session
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
                game_id: this.state.gameID,
                name: document.getElementById('hostName').value,
                winner: winnerVal
            }
        }
        else {
            hostScore = {
                uid: parseInt(this.props.match.params.uid),
                game_id: this.state.gameID,
                name: document.getElementById('hostName').value,
                score: parseInt(document.getElementById('hostScore').value),
                winner: document.getElementById('hostWin').checked
            };
        }

        let newArr = newSessionScores;
        newArr.push(hostScore);
        newSessionScores = newArr;

        // ensure a name and score is included for each player where relevant
        // if required values are present, populaye a score object for each player
        if(this.state.gameType === 'win-loss') {
            if(this.state.playerCountWL.length > 0) {
                for(let i = 0; i < this.state.playerCountWL.length; i++) {
                    const id = this.state.playerCountWL[i];
                    const playerName = document.getElementById(`playerIDWL[${id}]`);

                    if(!playerName || playerName.value.length < 1) {
                        this.setState({
                            submitError: {
                                value: 'A name is required for each submitted player',
                                status: true
                            }
                        });
                    }
                    else {
                        const newPlayer = {
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
        }
        else {
            if(this.state.gameType === 'scored' && this.state.playerCount.value.length > 0) {
                for(let i = 0; i < this.state.playerCount.value.length; i++) {
                    const id = this.state.playerCount.value[i];
                    const playerName = document.getElementById(`playerID[${id}]`);
                    const playerScore = document.getElementById(`scoreID[${id}]`);
                    if(!playerName || playerName.value.length < 1) {
                        this.setState({
                            submitError: {
                                value: 'A name is required for each submitted player',
                                status: true
                            }
                        });
                    }
                    else if(!playerScore || playerScore.value.length < 1) {
                        this.setState({
                            submitError: {
                                value: 'For scored sessions, a score value is required for each player',
                                status: true
                            }
                        });
                    }
                    else {
                        const playerWin = document.getElementById(`winnerID[${id}]`);
                        const newPlayer = {
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
        }
        
        // if all required data is present, proceed to POST data and populate all other required info
        if(this.state.submitError.status == false) {
            this.setState({
                validatedHostScore: hostScore,
                validatedPlayers: newSessionScores
            });

            this.submitSession();
        }
    };

    // submit the overall session info to the sessions table in db
    submitSession = () => {
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
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
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
            this.packageSessionData(data);
        })
        .catch(error => {
            this.setState({ error })
        })
    };

    // after obtaining the new session ID, package all remaining session data for POST
    packageSessionData = newSess => {
        let sessionData = {};

        // handle session notes
        if(this.state.notes.touched === true && this.state.notes.value.length > 0) {
            const newNote = {
                uid: this.state.hostID,
                session_id: newSess.id,
                note: this.state.notes.value
            };

            sessionData.notes = newNote;
        };

        // handle player scores
        let newSessionScores = this.state.validatedPlayers;
        newSessionScores.forEach(sess => {
            sess.session_id = newSess.id
        });
        sessionData.scores = newSessionScores;

        // handle host player's user standings stats
        const currStats = this.context.userStandings.find(({uid}) => uid === this.state.hostID);
        let newStats = currStats;

        if(this.state.validatedHostScore.winner === true) {
            newStats.sessions = currStats.sessions + 1;
            newStats.wins = currStats.wins + 1;
        }
        else {
            newStats.sessions = currStats.sessions + 1;
            newStats.losses = currStats.losses + 1;
        }
        sessionData.hostStats = newStats;

        // handle game mechanics and category updates
        // arrays of the category and mechanic IDs for this game
        let gameCats = [];
        let gameMechs = [];

        for(let i = 0; i < this.context.gameCatMatches.length; i++) {
            if(this.context.gameCatMatches[i].game_id === newSess.game_id) {
                let newArr = gameCats;
                newArr.push(this.context.gameCatMatches[i].cat_id);
                gameCats = newArr;
            }
        }

        for(let i = 0; i < this.context.gameMechMatches.length; i++) {
            if(this.context.gameMechMatches[i].game_id === newSess.game_id) {
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

        // check whether all game mechanics and categories already exists in db
        // if not, POST them to the appropriate tables
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
                    id: catCheck.id,
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
                    id: mechCheck.id,
                    uid: mechCheck.uid,
                    mech_id: mechCheck.mech_id,
                    sessions: mechCheck.sessions + 1
                };

                let newArr = updateUserMechLogs;
                newArr.push(updateMechLog);
                updateUserMechLogs = newArr;
            }
        });

        sessionData.newCatLogs = newUserCatLogs;
        sessionData.updateCatLogs = updateUserCatLogs;
        sessionData.newMechLogs = newUserMechLogs;
        sessionData.updateMechLogs = updateUserMechLogs;

        // update badge tracking data
        // get arrays of user's current badges
        let usersCatBadges = [];
        let usersMechBadges = [];

        this.context.userBadgesCat.forEach(badge => {
            if(badge.uid === this.state.hostID) {
                usersCatBadges.push(badge);
            }
        });
        this.context.userBadgesMech.forEach(badge => {
            if(badge.uid === this.state.hostID) {
                usersMechBadges.push(badge);
            }
        });

        // populate new badge data arrays
        let newCatBadges = [];
        let newMechBadges = [];

        sessionData.newCatLogs.forEach(log => {
            const newBadge = {
                uid: this.state.hostID,
                badge_id: log.cat_id,
                tier_id: 1
            };

            newCatBadges.push(newBadge);
        });

        sessionData.newMechLogs.forEach(log => {
            const newBadge = {
                uid: this.state.hostID,
                badge_id: log.mech_id,
                tier_id: 1
            };

            newMechBadges.push(newBadge);
        });

        let updateCatBadges = [];
        let updateMechBadges = [];

        sessionData.updateCatLogs.forEach(log => {
            if(log.sessions === 25) {
                const catBadge = usersCatBadges.find(({ cat_id }) => cat_id === log.cat_id);
                const newBadge = {
                    id: catBadge.id,
                    uid: this.state.hostID,
                    badge_id: catBadge.cat_id,
                    tier_id: 2
                };

                updateCatBadges.push(newBadge);
            }

            if(log.sessions === 100) {
                const catBadge = usersCatBadges.find(({ cat_id }) => cat_id === log.cat_id);
                const newBadge = {
                    id: catBadge.id,
                    uid: this.state.hostID,
                    badge_id: log.cat_id,
                    tier_id: 3
                };

                updateCatBadges.push(newBadge);
            }
        });

        sessionData.updateMechLogs.forEach(log => {
            if(log.sessions === 25) {
                const mechBadge = usersMechBadges.find(({ mech_id }) => mech_id === log.mech_id);
                const newBadge = {
                    id: mechBadge.id,
                    uid: this.state.hostID,
                    badge_id: log.cat_id,
                    tier_id: 2
                };

                updateMechBadges.push(newBadge);
            }

            if(log.sessions === 100) {
                const mechBadge = usersMechBadges.find(({ mech_id }) => mech_id === log.mech_id);
                const newBadge = {
                    id: mechBadge.id,
                    uid: this.state.hostID,
                    badge_id: log.cat_id,
                    tier_id: 3
                };

                updateMechBadges.push(newBadge);
            }
        });

        sessionData.newCatBadges = newCatBadges;
        sessionData.newMechBadges = newMechBadges;
        sessionData.updateCatBadges = updateCatBadges;
        sessionData.updateMechBadges = updateMechBadges;
        console.log(sessionData);

        fetch(`${config.API_ENDPOINT}/api/session-package/`, {
            method: 'POST',
            body: JSON.stringify(sessionData),
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            
            this.props.history.push(`/gamer/${this.props.match.params.uid}/new-session`)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/');
    };

    render() {
        const titleError = this.validateTitle();
        const dateError = this.validateDate();
        let gameList = [];
        let user = { name: '' };
        const uid = parseInt(this.props.match.params.uid) || 1;
        const addGameLink = `/add-games/${uid}`;
        const renderWinOptions = this.state.typeSelection.touched ? 'sessionForm_gameWinOptions' : 'hidden';
        const renderScoredForm = this.state.winTypeSelection.value === 'Scored' ? 'sessionForm_scored' : 'hidden';
        const renderWinLossForm = this.state.winTypeSelection.value === 'WinLoss' ? 'sessionForm_winLoss' : 'hidden';
        const buttonClassCompetitive = this.state.typeSelection.value === 'Competitive' ? 'gameTypeButton highlight' : 'gameTypeButton';
        const buttonClassCooperative = this.state.typeSelection.value === 'Cooperative' ? 'gameTypeButton highlight' : 'gameTypeButton';
        const buttonClassSolo = this.state.typeSelection.value === 'Solo' ? 'gameTypeButton highlight' : 'gameTypeButton';
        const buttonClassTeams = this.state.typeSelection.value === 'Teams' ? 'gameTypeButton highlight' : 'gameTypeButton';
        const buttonClassScored = this.state.winTypeSelection.value === 'Scored' ? 'gameTypeButton highlight' : 'gameTypeButton';
        const buttonClassWinLoss = this.state.winTypeSelection.value === 'WinLoss' ? 'gameTypeButton highlight' : 'gameTypeButton';

        // display field inputs for each player of scored game
        const sessionPlayers = this.state.playerCount.value.map(plyr => 
            <SessionPlayerForm
                key={plyr}
                id={plyr}
                setGameType={this.setGameType}
                removePlayer={this.removePlayer}
            />
        );

        // display field inputs for each player of a win/loss game
        const sessionPlayersWL = this.state.playerCountWL.map(plyr => 
            <AddSessionPlayerForm
                key={plyr}
                id={plyr}
                setGameType={this.setGameType}
                removePlayer={this.removePlayer}
            />
        );
        
        // ensure necessary data is present in context when page loads
        if(this.context.users.length < 1 || this.context.userGameMechLogs.length < 1) {
            this.context.refreshState();
            this.context.getUserData();
            this.context.getGameData();
            this.context.getBadgeData();
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
                    <h3 className='sessionFormGameTypeHeader'>Select the type of game play</h3>
                    <section className='sessionForm_gameTypeOptions'>
                        <button className={buttonClassCompetitive} onClick={() => this.updateTypeSelect('Competitive')}>Competitive</button>
                        <button className={buttonClassCooperative} onClick={() => this.updateTypeSelect('Cooperative')}>Cooperative</button>
                        <button className={buttonClassSolo} onClick={() => this.updateTypeSelect('Solo')}>Solo</button>
                        <button className={buttonClassTeams} onClick={() => this.updateTypeSelect('Teams')}>Teams</button>
                    </section>
                    <section className={renderWinOptions}>
                        <button className={buttonClassScored} onClick={() => this.updateWinTypeSelect('Scored')}>Scored Session</button>
                        <button className={buttonClassWinLoss} onClick={() => this.updateWinTypeSelect('WinLoss')}>Win/Loss Session</button>
                    </section>
                    <section className={renderScoredForm}>
                        <h3 className='sessionForm_Header'>Scored Sessions</h3>
                        <label htmlFor='sessionPlayer'>
                            Session Players
                        </label>
                        <section className='sessionForm_playerInfo'>
                            <div>
                                <label htmlFor='winner'>
                                    Winner
                                </label>
                                <input
                                    id='hostWin'
                                    type='checkbox'
                                    onChange={() => this.setGameType('scored')}
                                />
                            </div>
                            <div className='sessionForm_playerInfoFields'>
                                <label htmlFor='sessionPlayerName'>
                                    You
                                </label>
                                <input
                                    type='text'
                                    id='hostName'
                                    defaultValue={user.name}
                                    onChange={() => this.setGameType('scored')}
                                    required
                                />
                                <label htmlFor='sessionPlayerScore'>
                                    Score
                                </label>
                                <input
                                    type='text'
                                    id='hostScore'
                                    placeholder='100'
                                    onChange={() => this.setGameType('scored')}
                                    required
                                />
                            </div>
                        </section>
                        {sessionPlayers}
                        <div className='AddDestinationForm_buttons'>
                            <button className='sessionFrom_addPlayer' type='button' onClick={e => this.addPlayer()}>Add another player</button>
                            <p></p>
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
                        <div className='AddDestinationForm_credError'>
                        {this.state.submitError.status
                            ? this.state.submitError.value
                            : ''
                        }
                        </div>
                    </section>
                    <section className={renderWinLossForm}>
                        <h3 className='sessionForm_Header'>Win/Loss Sessions</h3>
                        <div className='sessionForm_winLossField'>
                            <label htmlFor='winLoss'>
                                Did you win?
                            </label>
                            <select
                                type='select'
                                id='winLoss'
                                onChange={() => this.setGameType('win-loss')}
                            >
                                <option>Select</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <div className='sessionForm_winLossField'>
                            <label htmlFor='sessionPlayerName'>
                                You
                            </label>
                            <input
                                type='text'
                                id='hostNameWL'
                                defaultValue={user.name}
                                onChange={() => this.setGameType('win-loss')}
                                required
                            />
                        </div>
                        {sessionPlayersWL}
                        <button className='sessionForm_addPlayer' type='button' onClick={e => this.addPlayerWL()}>Add another player</button>
                        <div className='sessionForm_buttons'>
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
                    </section>
                    <section className='sessionForm_credError'>
                        {this.state.submitError.status
                            ? this.state.submitError.value
                            : ''
                        }
                    </section>
                </form>
            </section>
        );
    }
}

export default SessionForm;