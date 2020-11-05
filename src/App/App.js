import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import GamePageMain from '../GamePageMain/GamePageMain';
import GamePage from '../GamePage/GamePage';
import Leaderboard from '../Leaderboard/Leaderboard';
import UserProfile from '../UserProfile/UserProfile';
import AddGame from '../AddGame/AddGame';
import SessionForm from '../SessionForm/SessionForm';
import SessionPage from '../SessionPage/SessionPage';
import APIContext from '../APIContext';
import config from '../config';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navbar: 'hidden',
      games: [],
      users: [],
      userGames: [],
      sessions: [],
      sessionScores: [],
      sessionNotes: [],
      userReccos: [],
      usersNotes: [],
      gameTips: [],
      badgesMech: [],
      badgesCat: [],
      userBadgesMech: [],
      userBadgesCat:[],
      userStandings: [],
      gameSessions: [],
      userGameSessions: []
    };
  };

  updateState = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/games`),
      fetch(`${config.API_ENDPOINT}/api/users`),
      fetch(`${config.API_ENDPOINT}/api/user-standings`),
      fetch(`${config.API_ENDPOINT}/api/sessions/game-sessions/0`)
    ])
    .then(([gameRes, userRes, userStandRes, gameSessRes]) => {
      if (!gameRes.ok)
        return gameRes.json().then(e => Promise.reject(e));
      if (!userRes.ok)
        return userRes.json().then(e => Promise.reject(e));
      if (!userStandRes.ok)
        return userStandRes.json().then(e => Promise.reject(e));
      if (!gameSessRes.ok)
        return gameSessRes.json().then(e => Promise.reject(e));
      return Promise.all([gameRes.json(), userRes.json(), userStandRes.json(), gameSessRes.json()]);
    })
    .then(([games, users, userStands, gameSessions]) => {
      this.setState({
        games: games,
        users: users,
        userStandings: userStands,
        gameSessions: gameSessions
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  getBadgeData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/badges-mech`),
      fetch(`${config.API_ENDPOINT}/api/badges-cat`),
      fetch(`${config.API_ENDPOINT}/api/user-badges-mech`),
      fetch(`${config.API_ENDPOINT}/api/user-badges-cat`)
    ])
    .then(([badgesMechRes, badgesCatRes, userMechRes, userCatRes]) => {
      if (!badgesMechRes.ok)
        return badgesMechRes.json().then(e => Promise.reject(e));
      if (!badgesCatRes.ok)
        return badgesCatRes.json().then(e => Promise.reject(e));
      if (!userMechRes.ok)
        return userMechRes.json().then(e => Promise.reject(e));
      if (!userCatRes.ok)
        return userCatRes.json().then(e => Promise.reject(e));
      return Promise.all([badgesMechRes.json(), badgesCatRes.json(), userMechRes.json(), userCatRes.json()]);
    })
    .then(([badgesMech, badgesCat, userBadgesMech, userBadgesCat]) => {
      this.setState({
        badgesMech: badgesMech,
        badgesCat: badgesCat,
        userBadgesMech: userBadgesMech,
        userBadgesCat: userBadgesCat
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  getSessionData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/sessions`),
      fetch(`${config.API_ENDPOINT}/api/session-scores`),
      fetch(`${config.API_ENDPOINT}/api/session-notes`)
    ])
    .then(([sessionsRes, sessScoresRes, sessNotesRes]) => {
      if (!sessionsRes.ok)
        return sessionsRes.json().then(e => Promise.reject(e));
      if (!sessScoresRes.ok)
        return sessScoresRes.json().then(e => Promise.reject(e));
      if (!sessNotesRes.ok)
        return sessNotesRes.json().then(e => Promise.reject(e));
      return Promise.all([sessionsRes.json(), sessScoresRes.json(), sessNotesRes.json()]);
    })
    .then(([sessions, sessScores, sessNotes]) => {
      this.setState({
        sessions: sessions,
        sessionScores: sessScores,
        sessionNotes: sessNotes
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  getUserData = uid => {
    let user = uid;
    if(!uid) {
      user = 1
    }
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/user-games`),
      fetch(`${config.API_ENDPOINT}/api/user-reccos`),
      fetch(`${config.API_ENDPOINT}/api/game-tips`),
      fetch(`${config.API_ENDPOINT}/api/sessions/user-sessions/${user}`)
    ])
    .then(([userGamesRes, userReccosRes, gameTipsRes, userSessRes]) => {
      if (!userGamesRes.ok)
        return userGamesRes.json().then(e => Promise.reject(e));
      if (!userReccosRes.ok)
        return userReccosRes.json().then(e => Promise.reject(e));
      if (!gameTipsRes.ok)
        return gameTipsRes.json().then(e => Promise.reject(e));
      if (!userSessRes.ok)
        return userSessRes.json().then(e => Promise.reject(e));
      return Promise.all([userGamesRes.json(), userReccosRes.json(), gameTipsRes.json(), userSessRes.json()]);
    })
    .then(([userGames, userReccos, gameTips, userSessions]) => {
      this.setState({
        userGames: userGames,
        userReccos: userReccos,
        gameTips: gameTips,
        userGameSessions: userSessions
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  componentDidMount = () => {
    this.updateState();
  }

  // toggle visibility of navbar
  toggleNav = () => {
    const css = (this.state.navbar === 'hidden') ? 'show' : 'hidden';
    this.setState({
      navbar: css
    });
  };

  render() {
    const value = {
      navbar: this.state.navbar,
      games: this.state.games,
      users: this.state.users,
      userGames: this.state.userGames,
      sessions: this.state.sessions,
      sessionScores: this.state.sessionScores,
      sessionNotes: this.state.sessionNotes,
      userReccos: this.state.userReccos,
      usersNotes: this.state.usersNotes,
      gameTips: this.state.gameTips,
      badgesMech: this.state.badgesMech,
      badgesCat: this.state.badgesCat,
      userBadgesMech: this.state.userBadgesMech,
      userBadgesCat: this.state.userBadgesCat,
      userStandings: this.state.userStandings,
      gameSessions: this.state.gameSessions,
      userGameSessions: this.state.userGameSessions,
      toggleNav: this.toggleNav,
      getBadgeData: this.getBadgeData,
      getSessionData: this.getSessionData,
      getUserData: this.getUserData,
      refreshState: this.updateState
    };

    return (
      <APIContext.Provider value={value}>
        <div className="App">
          <NavBar />
          <Route
            exact
            path='/leaderboards'
            component={Leaderboard}
          />
          <Route
            exact
            path='/games'
            component={GamePageMain}
          />
          <Route
            path='/game/:game_id'
            component={GamePage}
          />
          <Route
            path='/gamer/:uid'
            component={UserProfile}
          />
          <Route
            path={['/add-games/:uid', '/add-games']}
            component={AddGame}
          />
          <Route
            path='/add-session/:uid'
            component={SessionForm}
          />
          <Route
            path='/session/:session_id'
            component={SessionPage}
          />
          <Route
            exact
            path='/'
            component={Homepage}
          />
        </div>
      </APIContext.Provider>
    );
  };
};

export default withRouter(App);
