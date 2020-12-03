import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import UserLogin from '../UserLogin/UserLogin';
import UserRegistration from '../UserRegistration/UserRegistration';
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
      thisUser: {},
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
      badgeTiers: [],
      userBadgesMech: [],
      userBadgesCat:[],
      userStandings: [],
      gameSessions: [],
      userGameSessions: [],
      gameMechanics: [],
      gameCategories: [],
      gameMechMatches: [],
      gameCatMatches: [],
      userGameCatLogs: [],
      userGameMechLogs: []
    };
  };

  updateState = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/games`),
      fetch(`${config.API_ENDPOINT}/api/users`),
      fetch(`${config.API_ENDPOINT}/api/user-standings`)
    ])
    .then(([gameRes, userRes, userStandRes]) => {
      if (!gameRes.ok)
        return gameRes.json().then(e => Promise.reject(e));
      if (!userRes.ok)
        return userRes.json().then(e => Promise.reject(e));
      if (!userStandRes.ok)
        return userStandRes.json().then(e => Promise.reject(e));
      return Promise.all([gameRes.json(), userRes.json(), userStandRes.json()]);
    })
    .then(([games, users, userStands, gameSess]) => {
      this.setState({
        games: games,
        users: users,
        userStandings: userStands
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  componentDidMount = () => {
    this.updateState();
  };

  getBadgeData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/badges-mech`),
      fetch(`${config.API_ENDPOINT}/api/badges-cat`),
      fetch(`${config.API_ENDPOINT}/api/user-badges-mech`),
      fetch(`${config.API_ENDPOINT}/api/user-badges-cat`),
      fetch(`${config.API_ENDPOINT}/api/badge-tiers`)
    ])
    .then(([badgesMechRes, badgesCatRes, userMechRes, userCatRes, badgeTierRes]) => {
      if (!badgesMechRes.ok)
        return badgesMechRes.json().then(e => Promise.reject(e));
      if (!badgesCatRes.ok)
        return badgesCatRes.json().then(e => Promise.reject(e));
      if (!userMechRes.ok)
        return userMechRes.json().then(e => Promise.reject(e));
      if (!userCatRes.ok)
        return userCatRes.json().then(e => Promise.reject(e));
      if (!badgeTierRes.ok)
        return badgeTierRes.json().then(e => Promise.reject(e));
      return Promise.all([badgesMechRes.json(), badgesCatRes.json(), userMechRes.json(), userCatRes.json(), badgeTierRes.json()]);
    })
    .then(([badgesMech, badgesCat, userBadgesMech, userBadgesCat, badgeTiers]) => {
      this.setState({
        badgesMech: badgesMech,
        badgesCat: badgesCat,
        userBadgesMech: userBadgesMech,
        userBadgesCat: userBadgesCat,
        badgeTiers: badgeTiers
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  getSessionData = id => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/sessions`),
      fetch(`${config.API_ENDPOINT}/api/session-scores`),
      fetch(`${config.API_ENDPOINT}/api/session-notes`),
      fetch(`${config.API_ENDPOINT}/api/sessions/game-sessions/${id}`)
    ])
    .then(([sessionsRes, sessScoresRes, sessNotesRes, gameSessRes]) => {
      if (!sessionsRes.ok)
        return sessionsRes.json().then(e => Promise.reject(e));
      if (!sessScoresRes.ok)
        return sessScoresRes.json().then(e => Promise.reject(e));
      if (!sessNotesRes.ok)
        return sessNotesRes.json().then(e => Promise.reject(e));
      if (!gameSessRes.ok)
        return gameSessRes.json().then(e => Promise.reject(e));
      return Promise.all([sessionsRes.json(), sessScoresRes.json(), sessNotesRes.json(), gameSessRes.json()]);
    })
    .then(([sessions, sessScores, sessNotes, gameSess]) => {
      this.setState({
        sessions: sessions,
        sessionScores: sessScores,
        sessionNotes: sessNotes,
        gameSessions: gameSess
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  getUserData = uid => {
    let user = uid;
    if(!uid) {
      user = 0
    }
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/user-games`),
      fetch(`${config.API_ENDPOINT}/api/user-reccos`),
      fetch(`${config.API_ENDPOINT}/api/game-tips`),
      fetch(`${config.API_ENDPOINT}/api/sessions/user-sessions/${user}`),
      fetch(`${config.API_ENDPOINT}/api/user-game-cat-logs`),
      fetch(`${config.API_ENDPOINT}/api/user-game-mech-logs`)
    ])
    .then(([userGamesRes, userReccosRes, gameTipsRes, userSessRes, userCatLogsRes, userMechLogsRes]) => {
      if (!userGamesRes.ok)
        return userGamesRes.json().then(e => Promise.reject(e));
      if (!userReccosRes.ok)
        return userReccosRes.json().then(e => Promise.reject(e));
      if (!gameTipsRes.ok)
        return gameTipsRes.json().then(e => Promise.reject(e));
      if (!userSessRes.ok)
        return userSessRes.json().then(e => Promise.reject(e));
      if (!userCatLogsRes.ok)
        return userCatLogsRes.json().then(e => Promise.reject(e));
      if (!userMechLogsRes.ok)
        return userMechLogsRes.json().then(e => Promise.reject(e));
      return Promise.all([userGamesRes.json(), userReccosRes.json(), gameTipsRes.json(), userSessRes.json(), userCatLogsRes.json(), userMechLogsRes.json()]);
    })
    .then(([userGames, userReccos, gameTips, userSessions, userCatLogs, userMechLogs]) => {
      this.setState({
        userGames: userGames,
        userReccos: userReccos,
        gameTips: gameTips,
        userGameSessions: userSessions,
        userGameCatLogs: userCatLogs,
        userGameMechLogs: userMechLogs
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  // fetch data pertaining to game mechanics and categories
  getGameData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/games-mech`),
      fetch(`${config.API_ENDPOINT}/api/games-cat`),
      fetch(`${config.API_ENDPOINT}/api/games-mech-matches`),
      fetch(`${config.API_ENDPOINT}/api/games-cat-matches`)
    ])
    .then(([gamesMechRes, gamesCatRes, mechMatchesRes, catMatchesRes]) => {
      if (!gamesMechRes.ok)
        return gamesMechRes.json().then(e => Promise.reject(e));
      if (!gamesCatRes.ok)
        return gamesCatRes.json().then(e => Promise.reject(e));
      if (!mechMatchesRes.ok)
        return mechMatchesRes.json().then(e => Promise.reject(e));
      if (!catMatchesRes.ok)
        return catMatchesRes.json().then(e => Promise.reject(e));
      return Promise.all([gamesMechRes.json(), gamesCatRes.json(), mechMatchesRes.json(), catMatchesRes.json()]);
    })
    .then(([gamesMech, gamesCat, mechMatches, catMatches]) => {
      this.setState({
        gameMechanics: gamesMech,
        gameCategories: gamesCat,
        gameMechMatches: mechMatches,
        gameCatMatches: catMatches
      })
    })
    .catch(error => {
      console.error({error});
    });
  }

  setUser = u => {
    const user = {
      id: u.id,
      name: u.name,
      about: u.about,
      joined_date: u.joined_date
    };

    this.setState({
      thisUser: user
    });
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
      thisUser: this.state.thisUser,
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
      badgeTiers: this.state.badgeTiers,
      userBadgesMech: this.state.userBadgesMech,
      userBadgesCat: this.state.userBadgesCat,
      userStandings: this.state.userStandings,
      gameSessions: this.state.gameSessions,
      userGameSessions: this.state.userGameSessions,
      gameMechanics: this.state.gameMechanics,
      gameCategories: this.state.gameCategories,
      gameMechMatches: this.state.gameMechMatches,
      gameCatMatches: this.state.gameCatMatches,
      userGameCatLogs: this.state.userGameCatLogs,
      userGameMechLogs: this.state.userGameMechLogs,
      setUser: this.setUser,
      toggleNav: this.toggleNav,
      getBadgeData: this.getBadgeData,
      getSessionData: this.getSessionData,
      getUserData: this.getUserData,
      getGameData: this.getGameData,
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
          <PrivateRoute
            path='/gamer/:uid'
            component={UserProfile}
          />
          <PrivateRoute
            path={['/add-games/:uid', '/add-games']}
            component={AddGame}
          />
          <PrivateRoute
            path='/add-session/:uid'
            component={SessionForm}
          />
          <PrivateRoute
            path='/session/:session_id'
            component={SessionPage}
          />
          <Route
            exact
            path='/login'
            component={UserLogin}
          />
          <Route
            exact
            path='/create-account'
            component={UserRegistration}
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
