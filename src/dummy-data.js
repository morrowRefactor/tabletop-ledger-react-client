const games = [
    {
        id: 1,
        bgg_id: 1234,
        title: 'Gloomhaven',
        bgg_rating: 8.2,
        info: 'This is a board game'
    },
    {
        id: 2,
        bgg_id: 1234,
        title: 'Last Bastion',
        bgg_rating: 8.1,
        info: 'This is a board game'
    },
    {
        id: 3,
        bgg_id: 1234,
        title: 'Nemesis',
        bgg_rating: 7.8,
        info: 'This is a board game'
    },
    {
        id: 4,
        bgg_id: 1234,
        title: 'Carcassonne',
        bgg_rating: 7.7,
        info: 'This is a board game'
    },
    {
        id: 5,
        bgg_id: 1234,
        title: 'Atlantis Rising',
        bgg_rating: 7.5,
        info: 'This is a board game'
    },
    {
        id: 6,
        bgg_id: 1234,
        title: 'Zombicide: Black Plague',
        bgg_rating: 8.2,
        info: 'This is a board game'
    },
    {
        id: 7,
        bgg_id: 1234,
        title: 'Mechs vs Minions',
        bgg_rating: 8.2,
        info: 'This is a board game'
    },
    {
        id: 8,
        bgg_id: 1234,
        title: 'Spirit Island',
        bgg_rating: 8.2,
        info: 'This is a board game'
    },
    {
        id: 9,
        bgg_id: 1234,
        title: 'Cthulhu: Death May Die',
        bgg_rating: 8.0,
        info: 'This is a board game'
    },
    {
        id: 10,
        bgg_id: 1234,
        title: 'Dominion',
        bgg_rating: 8.1,
        info: 'This is a board game'
    }
];

const users = [
    {
        id: 1,
        name: 'John Doe',
        about: 'I am a gaming enthusiast'
    },
    {
        id: 2,
        name: 'Jane Doe',
        about: 'I am a gaming enthusiast'
    },
    {
        id: 3,
        name: 'Joe Thornton',
        about: 'I am a gaming enthusiast'
    },
    {
        id: 4,
        name: 'Brent Burns',
        about: 'I am a gaming enthusiast'
    },
    {
        id: 5,
        name: 'Patrick Marleau',
        about: 'I am a gaming enthusiast'
    }
];

const sessions = [
    {
        id: 1,
        game_id: 1,
        uid: 2,
        date:'2020-08-25'
    },
    {
        id: 2,
        game_id: 1,
        uid: 2,
        date:'2020-08-04'
    },
    {
        id: 3,
        game_id: 1,
        uid: 2,
        date:'2020-07-29'
    },
    {
        id: 4,
        game_id: 3,
        uid: 1,
        date:'2020-07-29'
    },
    {
        id: 5,
        game_id: 3,
        uid: 4,
        date:'2020-09-02'
    },
    {
        id: 6,
        game_id: 1,
        uid: 2,
        date:'2020-06-29'
    },
    {
        id: 7,
        game_id: 1,
        uid: 4,
        date:'2020-06-30'
    },
    {
        id: 8,
        game_id: 4,
        uid: 3,
        date:'2020-04-23'
    },
    {
        id: 9,
        game_id: 7,
        uid: 5,
        date:'2020-06-01'
    },
    {
        id: 10,
        game_id: 10,
        uid: 1,
        date:'2020-03-02'
    }
];

const session_scores = [
    {
        id: 1,
        session_id: 1,
        uid: 2,
        score: 100,
        username: 'Jane Doe',
        game_id: 1
    },
    {
        id: 2,
        session_id: 1,
        uid: null,
        score: 85,
        username: 'Some Guy',
        game_id: 1
    },
    {
        id: 3,
        session_id: 1,
        uid: 3,
        score: 91,
        username: 'Joe Thornton',
        game_id: 1
    },
    {
        id: 4,
        session_id: 2,
        uid: 2,
        score: 77,
        username: 'Jane Doe',
        game_id: 1
    },
    {
        id: 5,
        session_id: 2,
        uid: null,
        score: 88,
        username: 'Steve Smith',
        game_id: 1
    },
    {
        id: 6,
        session_id: 4,
        uid: 1,
        score: 97,
        username: 'John Doe',
        game_id: 3
    },
    {
        id: 7,
        session_id: 4,
        uid: 5,
        score: 67,
        username: 'Patrick Marleau',
        game_id: 3
    },
    {
        id: 8,
        session_id: 4,
        uid: null,
        score: 77,
        username: 'Some Lady',
        game_id: 3
    },
    {
        id: 9,
        session_id: 10,
        uid: 1,
        score: 47,
        username: 'John Doe',
        game_id: 10
    },
    {
        id: 10,
        session_id: 10,
        uid: null,
        score: 97,
        username: 'Some Guy',
        game_id: 10
    },
    {
        id: 11,
        session_id: 10,
        uid: null,
        score: 84,
        username: 'Some Lady',
        game_id: 10
    },
];

const session_notes = [
    {
        id: 1,
        session_id: 1,
        uid: 1,
        note: 'I did X and it gave me an extra 20 points.'
    },
    {
        id: 2,
        session_id: 1,
        uid: 3,
        note: 'john had a great game. I missed my window of opportunity'
    },
    {
        id: 3,
        session_id: 4,
        uid: 5,
        note: 'My first game.  Fun, but I have a lot to learn!'
    },
    {
        id: 4,
        session_id: 4,
        uid: 1,
        note: `Patrick's first game.  He did great!  We'll keep playing more sessions.`
    },
    {
        id: 5,
        session_id: 2,
        uid: 2,
        note: 'Another fun time!'
    }
];

const user_reccos = [
    {
        id: 1,
        uid: 1,
        game_id: 1,
        recco_game_id: 7,
        note: 'If you love Gloomhaven, I highly recommend Mechs vs Minions.'
    },
    {
        id: 2,
        uid: 3,
        game_id: 3,
        recco_game_id: 4,
        note: 'If you love Nemesis, I highly recommend Carcassonne.'
    },
    {
        id: 3,
        uid: 4,
        game_id: 8,
        recco_game_id: 9,
        note: 'If you love Spirit Island, I highly recommend Cthulhu: Death May Die.'
    },
    {
        id: 4,
        uid: 5,
        game_id: 2,
        recco_game_id: 7,
        note: 'If you love Last Bastion, I highly recommend Mechs vs Minions.'
    }
];

const user_games = [
    {
        id: 1,
        uid: 1,
        game_id: 1,
        own: true,
        favorite: 1,
        rating: 9.0,
        notes: 'My favorite game of all time'
    },
    {
        id: 2,
        uid: 1,
        game_id: 3,
        own: true,
        favorite: 2,
        rating: 8.6,
        notes: null
    },
    {
        id: 3,
        uid: 1,
        game_id: 6,
        own: false,
        favorite: 3,
        rating: 8.5,
        notes: `Don't own this one yet, but it's on my list`
    },
    {
        id: 4,
        uid: 2,
        game_id: 8,
        own: true,
        favorite: 1,
        rating: 9.0,
        notes: 'great game'
    },
    {
        id: 5,
        uid: 2,
        game_id: 9,
        own: true,
        favorite: 2,
        rating: 8.0,
        notes: 'all time great'
    },
    {
        id: 6,
        uid: 2,
        game_id: 1,
        own: true,
        favorite: 2,
        rating: 9.0,
        notes: 'all time great'
    },
    {
        id: 7,
        uid: 2,
        game_id: 2,
        own: true,
        favorite: 1,
        rating: 8.0,
        notes: 'good stuff'
    },
    {
        id: 8,
        uid: 2,
        game_id: 5,
        own: true,
        favorite: 3,
        rating: 8.0,
        notes: 'so much fun!'
    }
];

const game_tips = [
    {
        id: 1,
        uid: 1,
        game_id: 1,
        tip: 'Always do X before Y'
    },
    {
        id: 2,
        uid: 3,
        game_id: 1,
        tip: 'Never do X.  bad idea.'
    },
    {
        id: 3,
        uid: 5,
        game_id: 3,
        tip: `Sometimes it's best to do X`
    },
    {
        id: 4,
        uid: 5,
        game_id: 10,
        tip: 'Always do X before Y'
    }
];

const badges_mech = [
    {
        id: 1,
        name: 'Co-op beginner'
    },
    {
        id: 2,
        name: 'Co-op intermediate'
    },
    {
        id: 3,
        name: 'Co-op expert'
    },
    {
        id: 4,
        name: 'Dungeon crawl beginner'
    },
    {
        id: 5,
        name: 'Dungeon crawl intermediate'
    },
    {
        id: 6,
        name: 'Dungeon crawl expert'
    },
    {
        id: 7,
        name: 'Worker placement beginner'
    },
    {
        id: 8,
        name: 'Worker placement intermediate'
    },
    {
        id: 9,
        name: 'Worker placement expert'
    }
];

const badges_cat = [
    {
        id: 1,
        name: 'Adventure beginner'
    },
    {
        id: 2,
        name: 'Adventure intermediate'
    },
    {
        id: 3,
        name: 'Adventure expert'
    },
    {
        id: 4,
        name: 'City Building beginner'
    },
    {
        id: 5,
        name: 'City building beginner'
    },
    {
        id: 6,
        name: 'City building beginner'
    },
    {
        id: 7,
        name: 'Deduction beginner'
    },
    {
        id: 8,
        name: 'Deduction intermediate'
    },
    {
        id: 9,
        name: 'Deduction expert'
    }
]

const user_badges_mech = [
    {
        id: 1,
        uid: 1,
        badge_id: 3
    },
    {
        id: 2,
        uid: 1,
        badge_id: 5
    },
    {
        id: 3,
        uid: 2,
        badge_id: 6
    },
    {
        id: 4,
        uid: 2,
        badge_id: 7
    },
    {
        id: 5,
        uid: 5,
        badge_id: 5
    },
    {
        id: 6,
        uid: 4,
        badge_id: 1
    },
];

const user_badges_cat = [
    {
        id: 1,
        uid: 1,
        badge_id: 2
    },
    {
        id: 2,
        uid: 1,
        badge_id: 6
    },
    {
        id: 3,
        uid: 3,
        badge_id: 1
    },
    {
        id: 4,
        uid: 4,
        badge_id: 7
    },
    {
        id: 5,
        uid: 5,
        badge_id: 4
    },{
        id: 6,
        uid: 2,
        badge_id: 5
    }
]

module.exports = {
    games,
    users,
    sessions,
    session_scores,
    session_notes,
    user_reccos,
    user_games,
    game_tips,
    badges_cat,
    badges_mech,
    user_badges_cat,
    user_badges_mech
}