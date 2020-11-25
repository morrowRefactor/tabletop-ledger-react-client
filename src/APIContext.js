import React from 'react';

export default React.createContext({
    navbar: '',
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
    userGameMechLogs: [],
    toggleNav: () => {},
    getBadgeData: () => {},
    getSessionData: () => {},
    getUserData: () => {},
    getGameData: () => {},
    refreshState: () => {}
});