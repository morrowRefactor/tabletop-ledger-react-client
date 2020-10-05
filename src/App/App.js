import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import GamePageMain from '../GamePageMain/GamePageMain';
import GamePage from '../GamePage/GamePage';
import UserProfile from '../UserProfile/UserProfile';
import AddGame from '../AddGame/AddGame';
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
      userBadgesCat:[]
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
      userBadgesCat: dummyData.user_badges_cat
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
    const newGamesArr = this.state.games;
    newGamesArr.push(game);

    this.setState({
      games: newGamesArr
    });
  }

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
      toggleNav: this.toggleNav,
      addNewGame: this.addNewGame,
      refreshState: this.updateState
    };

    return (
      <APIContext.Provider value={value}>
        <div className="App">
          <NavBar />
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
