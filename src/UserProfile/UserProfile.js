import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserGameBlock from '../UserGameBlock/UserGameBlock';
import APIContext from '../APIContext';
import APIHellpers from '../api-helpers';
import './UserProfile.css';

class UserProfile extends Component {
    static contextType = APIContext;

    render() {
        let user = { name: '' };
        let userSessions = {};
        let mechBadgeMatches = [];
        let catBadgeMatches = [];
        let userMechBadges;
        let userCatBadges;
        let userGameMatches = [];
        let usersGames;
        const sessionLink = '/add-session/' + parseInt(this.props.match.params.uid);

        if(this.context.users.length < 1 || this.context.userGames.length < 1) {
            this.context.refreshState();
            this.context.getBadgeData();
            this.context.getSessionData();
            this.context.getGameData();
            this.context.getUserData(parseInt(this.props.match.params.uid));
        }

        else {
            const thisUser = this.context.users.find(({id}) => id === parseInt(this.props.match.params.uid));
            user = thisUser;
            userSessions = this.context.userStandings.find(({uid}) => uid === user.id);

            // get an array of all the badges this user has for mechanics and categories
            const getMechBadges = this.context.userBadgesMech.filter(function(badge) {
                return badge.uid === user.id;
            });
            const getCatBadges = this.context.userBadgesCat.filter(function(badge) {
                return badge.uid === user.id;
            });
            
            // use the array of matched badges to display the badge names
            getMechBadges.forEach(badge => {
                let badgeName;
                for(let i = 0; i < this.context.gameMechanics.length; i++) {
                    if(this.context.gameMechanics[i].mech_id === badge.badge_id) {
                        badgeName = this.context.gameMechanics[i].name;
                    }
                }
                    const tierName = this.context.badgeTiers.find(({ id }) => id === badge.tier_id);
                    const userBadge = { id: badge.id, name: badgeName, tier: tierName.name };
                    let newArr = mechBadgeMatches;
                    newArr.push(userBadge);
                    mechBadgeMatches = newArr;
                }
            );
            
            userMechBadges = mechBadgeMatches.map(badge => 
                <p className='userProfile_bagdesText' key={badge.id}>{badge.name} {badge.tier}</p>
            );
            
            getCatBadges.forEach(badge => {
                    let badgeName;
                    for(let i = 0; i < this.context.gameCategories.length; i++) {
                        if(this.context.gameCategories[i].cat_id === badge.badge_id) {
                            badgeName = this.context.gameCategories[i].name;
                        }
                    }
                    const tierName = this.context.badgeTiers.find(({ id }) => id === badge.tier_id);
                    const userBadge = { id: badge.id, name: badgeName, tier: tierName.name };
                    let newArr = catBadgeMatches;
                    newArr.push(userBadge);
                    catBadgeMatches = newArr;
                }
            );
            
            userCatBadges = catBadgeMatches.map(badge =>
                <p className='userProfile_badgesText' key={badge.id}>{badge.name} {badge.tier}</p>
            );

            // get list of games associated to this user and populate an array with the relevant game objects
            const getUserGames = this.context.userGames.filter(function(game) {
                return game.uid === user.id;
            });
            
            getUserGames.forEach(game =>
                userGameMatches.push(
                    this.context.games.find(({id}) => id === game.game_id)
                )
            );

            // get session counts for each user game
            userGameMatches.forEach(game => {
                let playCount = 0;
                for(let i = 0; i < this.context.userGameSessions.length; i++) {
                    if(this.context.userGameSessions[i].game_id === game.id) {
                        playCount++;
                    }
                }
                
                game.playCount = playCount;
            })
            
            usersGames = userGameMatches.map(game =>
                <UserGameBlock
                    key={game.id}
                    uid={parseInt(this.props.match.params.uid)}
                    gameID={game.id}
                    title={game.title}
                    info={game.info}
                    bggRating={game.bgg_rating}
                    gameImage={game.image}
                    playCount={game.playCount}
                />
            )
        }

        return (
            <section className='UserProfile'>
                <h1 className='userProfileName'>{user.name}</h1>
                <Link className='userProfileSessionLink' to={sessionLink}>Add a game session</Link>
                <section className='UserProfile_stats'>
                    <h3>Stats</h3>
                        <p>Total games sessions: {userSessions.sessions}</p>
                        <p>Total wins: {userSessions.wins}</p>
                        <p>Win ratio: {(userSessions.wins / userSessions.sessions) * 100}%</p>
                </section>
                <section className='UserProfile_badges'>
                    <h3>Your Badges</h3>
                    <p className='userProfile_badgesHeader'>Mechanics Badges</p>
                    {mechBadgeMatches.length > 1
                        ? userMechBadges
                        : 'No badges yet'
                    }
                    <p className='userProfile_badgesHeader'>Category Badges</p>
                    {catBadgeMatches.length > 1
                        ? userCatBadges
                        : 'No badges yet'
                    }
                </section>
                <section className='UserProfile_games'>
                    <h2>Your Games</h2>
                    {usersGames}
                </section>
            </section>
        );
    }
}

export default UserProfile;