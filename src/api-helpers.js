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

function postUserCatBadge(userCatBadge) {
    fetch(`${config.API_ENDPOINT}/api/user-badges-cat`, {
        method: 'POST',
        body: JSON.stringify(userCatBadge),
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

function postUserMechBadge(userMechBadge) {
    fetch(`${config.API_ENDPOINT}/api/user-badges-mech`, {
        method: 'POST',
        body: JSON.stringify(userMechBadge),
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

function patchUserCatBadge(id, userCatBadge) {
    fetch(`${config.API_ENDPOINT}/api/user-badges-cat/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(userCatBadge),
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

function patchUserMechBadge(id, userMechBadge) {
    fetch(`${config.API_ENDPOINT}/api/user-badges-mech/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(userMechBadge),
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
    patchUserMechLogs,
    postUserCatBadge,
    postUserMechBadge,
    patchUserCatBadge,
    patchUserMechBadge
};