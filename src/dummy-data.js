const games = [
    {
        id: 1,
        bgg_id: 174430,
        title: 'Gloomhaven',
        bgg_rating: 8.2,
        info: 'Gloomhaven  is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for traveling to this dark corner of the world.',
        image: 'https://cf.geekdo-images.com/original/img/lDN358RgcYvQfYYN6Oy2TXpifyM=/0x0/pic2437871.jpg'
    },
    {
        id: 2,
        bgg_id: 285984,
        title: 'Last Bastion',
        bgg_rating: 8.1,
        info: 'A handful of heroes have just stolen the powerful relics of the Baleful Queen. Without them, the immortal sovereign is weakened; recovering them is now her sole purpose.',
        image: 'https://cf.geekdo-images.com/original/img/JKYwSt8a2tcBYG20Oom7Rebth_Y=/0x0/pic4882123.png'
    },
    {
        id: 3,
        bgg_id: 167355,
        title: 'Nemesis',
        bgg_rating: 7.8,
        info: 'Playing Nemesis will take you into the heart of sci-fi survival horror in all its terror. A soldier fires blindly down a corridor, trying to stop the alien advance. A scientist races to find a solution in his makeshift lab. A traitor steals the last escape pod in the very last moment.',
        image: 'https://cf.geekdo-images.com/original/img/fOgLH666aTUqwnhtZjSGH4-XJ8U=/0x0/pic5073276.jpg'
    },
    {
        id: 4,
        bgg_id: 822,
        title: 'Carcassonne',
        bgg_rating: 7.7,
        info: 'Carcassonne is a tile-placement game in which the players draw and place a tile with a piece of southern French landscape on it. The tile might feature a city, a road, a cloister, grassland or some combination thereof, and it must be placed adjacent to tiles that have already been played, in such a way that cities are connected to cities, roads to roads, etcetera.',
        image: 'https://cf.geekdo-images.com/original/img/o4p6f88SGE899BTNMzTvERVWZ-M=/0x0/pic2337577.jpg'
    },
    {
        id: 5,
        bgg_id: 248490,
        title: 'Atlantis Rising',
        bgg_rating: 7.5,
        info: 'Atlantis Rising is a co-operative worker placement game in which you must work together with up to five other players to deploy citizens across your homeland, gathering resources in order to build a cosmic gate that can save your people.',
        image: 'https://cf.geekdo-images.com/original/img/L9MTX-jaDgKZ-0Ml8xZG4pHicWU=/0x0/pic4895878.jpg'
    },
    {
        id: 6,
        bgg_id: 176189,
        title: 'Zombicide: Black Plague',
        bgg_rating: 8.2,
        info: `Zombicide: Black Plague takes the zombie apocalypse into a fantastical medieval setting! The arcane powers of the Necromancers have unleashed a zombie invasion in the age of swords and sorcery, and it's up to your group of straggling survivors to not only stay alive during these dark times`,
        image: 'https://cf.geekdo-images.com/original/img/vs4UlIiZ1p3k5yIJ_vlvd2N-474=/0x0/pic2482309.jpg'
    },
    {
        id: 7,
        bgg_id: 209010,
        title: 'Mechs vs Minions',
        bgg_rating: 8.2,
        info: 'Mechs vs. Minions is a cooperative tabletop campaign for 2-4 players. Set in the world of Runeterra, players take on the roles of four intrepid Yordles: Corki, Tristana, Heimerdinger, and Ziggs, who must join forces and pilot their newly-crafted mechs against an army of marauding minions.',
        image: 'https://cf.geekdo-images.com/original/img/WhHdMb8GiMY-RhHddEByDyPkrWo=/0x0/pic3184103.jpg'
    },
    {
        id: 8,
        bgg_id: 162886,
        title: 'Spirit Island',
        bgg_rating: 8.2,
        info: 'In the most distant reaches of the world, magic still exists, embodied by spirits of the land, of the sky, and of every natural thing. As the great powers of Europe stretch their colonial empires further and further, they will inevitably lay claim to a place where spirits still hold power - and when they do, the land itself will fight back alongside the islanders who live there.',
        image: 'https://cf.geekdo-images.com/original/img/RmP2yBDA0LE-ZFWrEXAkgRuYjn0=/0x0/pic3615739.png'
    },
    {
        id: 9,
        bgg_id: 253344,
        title: 'Cthulhu: Death May Die',
        bgg_rating: 8.0,
        info: 'In Cthulhu: Death May Die, inspired by the writings of H.P. Lovecraft, you and your fellow players represent investigators in the 1920s who instead of trying to stop the coming of Elder Gods, want to summon those otherworldly beings so that you can put a stop to them permanently.',
        image: 'https://cf.geekdo-images.com/original/img/tVhbvCp1Vlqi6zy4uR_-Z1NIVfg=/0x0/pic4705171.jpg'
    },
    {
        id: 10,
        bgg_id: 142131,
        title: 'Dominion',
        bgg_rating: 8.1,
        info: 'Dominion, the popular strategy card game now comes to you in this massive combination pack jammed full of the best boxed sets, additional cards and extras.',
        image: 'https://cf.geekdo-images.com/original/img/KJ90XVwavBtGvNdptuETteLeNbI=/0x0/pic874537.jpg'
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
        winner: true,
        game_id: 1
    },
    {
        id: 2,
        session_id: 1,
        uid: null,
        score: 85,
        username: 'Some Guy',
        winner: false,
        game_id: 1
    },
    {
        id: 3,
        session_id: 1,
        uid: 3,
        score: 91,
        username: 'Joe Thornton',
        winner: false,
        game_id: 1
    },
    {
        id: 4,
        session_id: 2,
        uid: 2,
        score: 77,
        username: 'Jane Doe',
        winner: false,
        game_id: 1
    },
    {
        id: 5,
        session_id: 2,
        uid: null,
        score: 88,
        username: 'Steve Smith',
        winner: true,
        game_id: 1
    },
    {
        id: 6,
        session_id: 4,
        uid: 1,
        score: 97,
        username: 'John Doe',
        winner: true,
        game_id: 3
    },
    {
        id: 7,
        session_id: 4,
        uid: 5,
        score: 67,
        username: 'Patrick Marleau',
        winner: false,
        game_id: 3
    },
    {
        id: 8,
        session_id: 4,
        uid: null,
        score: 77,
        username: 'Some Lady',
        winner: false,
        game_id: 3
    },
    {
        id: 9,
        session_id: 10,
        uid: 1,
        score: 47,
        username: 'John Doe',
        winner: false,
        game_id: 10
    },
    {
        id: 10,
        session_id: 10,
        uid: null,
        score: 97,
        username: 'Some Guy',
        winner: true,
        game_id: 10
    },
    {
        id: 11,
        session_id: 10,
        uid: null,
        score: 84,
        username: 'Some Lady',
        winner: false,
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
];

const user_standings = [
    {
        id: 1,
        uid: 1,
        wins: 3,
        losses: 1,
        sessions: 4
    },
    {
        id: 2,
        uid: 2,
        wins: 1,
        losses: 3,
        sessions: 4
    },
    {
        id: 3,
        uid: 3,
        wins: 0,
        losses: 1,
        sessions: 1
    },
    {
        id: 4,
        uid: 4,
        wins: 0,
        losses: 2,
        sessions: 2
    },
    {
        id: 5,
        uid: 5,
        wins: 0,
        losses: 1,
        sessions: 1
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
    user_badges_mech,
    user_standings
}