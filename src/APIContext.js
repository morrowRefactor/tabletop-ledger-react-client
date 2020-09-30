import React from 'react';

export default React.createContext({
    navbar: '',
    games: [],
    users: [],
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
    toggleNav: () => {}
});