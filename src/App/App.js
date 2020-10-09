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
import APIContext from '../APIContext';
import dummyData from '../dummy-data';
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
      userStandings: []
    };
  };

  updateState = () => {
    this.setState({
      games: dummyData.games,
      users: dummyData.users,
      userGames: dummyData.user_games,
      sessions: dummyData.sessions,
      sessionScores: dummyData.session_scores,
      sessionNotes: dummyData.session_notes,
      userReccos: dummyData.user_reccos,
      usersNotes: dummyData.user_notes,
      gameTips: dummyData.game_tips,
      badgesMech: dummyData.badges_mech,
      badgesCat: dummyData.badges_cat,
      userBadgesMech: dummyData.user_badges_mech,
      userBadgesCat: dummyData.user_badges_cat,
      userStandings: dummyData.user_standings
    })
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

  addNewGame = game => {
    let newGamesArr = this.state.games;
    newGamesArr.push(game);

    this.setState({
      games: newGamesArr
    });
  };

  addSession = session => {
    let newSessArr = this.state.sessions;
    newSessArr.push(session);

    this.setState({
      sessions: newSessArr
    });
  };

  addSessionNotes = note => {
    let newNote = this.state.sessionNotes;
    newNote.push(note);

    this.setState({
      sessionNotes: newNote
    });
  };

  addSessionScores = scores => {
    let newScores = this.state.sessionScores;
    for(let i = 0; i < scores.length; i++) {
      newScores.push(scores[i]);
    }
    
    this.setState({
      sessionScores: newScores
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
      toggleNav: this.toggleNav,
      addNewGame: this.addNewGame,
      addSession: this.addSession,
      addSessionNotes: this.addSessionNotes,
      addSessionScores: this.addSessionScores,
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
            exact
            path='/add-games'
            component={AddGame}
          />
          <Route
            path='/add-session/:uid'
            component={SessionForm}
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
