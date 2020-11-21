import React from 'react';
import config from './config';

function postNewUserCatLogs(userCatLog) {
    fetch(`${config.API_ENDPOINT}/api/user-game-cat-logs`, {
        method: 'POST',
        body: JSON.stringify(userCatLog),
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
        
    })
};

function postNewUserMechLogs(userMechLog) {
    fetch(`${config.API_ENDPOINT}/api/user-game-mech-logs`, {
        method: 'POST',
        body: JSON.stringify(userMechLog),
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
        
    })
};

function patchUserCatLogs(userCatLog) {
    fetch(`${config.API_ENDPOINT}/api/user-game-cat-logs/${userCatLog.id}`, {
        method: 'PATCH',
        body: JSON.stringify(userCatLog),
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
        
    })
};

function patchUserMechLogs(userMechLog) {
    fetch(`${config.API_ENDPOINT}/api/user-game-mech-logs/${userMechLog.id}`, {
        method: 'PATCH',
        body: JSON.stringify(userMechLog),
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
        
    })
};


export default {
    postNewUserCatLogs,
    postNewUserMechLogs,
    patchUserCatLogs,
    patchUserMechLogs
};