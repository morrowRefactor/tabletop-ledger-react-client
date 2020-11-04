import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import GameBlock from '../GameBlock/GameBlock';
import APIContext from '../APIContext';
import './GamePageMain.css';

class GamePageMain extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props)
        this.state = {
            gameTitle: { value: '', touched: false },
            gameID: 0,
            searchedGame: ''
        };
    };

    getGames = () => {
        this.context.refreshState();
    }

    updateTitle = title => {
        this.setState({
            gameTitle: { value: title.value, touched: true },
            gameID: title.id
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            searchedGame: this.state.gameTitle.value
        });
    };

    renderSearchedGame = () => {
        const gameResult = this.context.games.find(({id}) => id === this.state.gameID);

        if(this.state.gameTitle.touched === true && this.state.gameID !== 0) {
            return (
                <GameBlock
                    key={gameResult.id}
                    title={gameResult.title}
                    description={gameResult.description}
                    image={gameResult.image}
                    bggRating={gameResult.bgg_rating}
                />
            )
        }
    };

    renderMostPlayed = () => {
        const topGames = this.context.gameSessions.slice(0, 10);
        let gameDetails = [];
        topGames.forEach(game => {
            const gameDeets = this.context.games.find(({id}) => id === game.game_id);
            gameDeets.playCount = game.cnt;
            let newArr = gameDetails;
            newArr.push(gameDeets);
            gameDetails = newArr;
        })

        
        return (
            gameDetails.map(game => 
                <GameBlock
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    description={game.description}
                    image={game.image}
                    bggRating={game.bgg_rating}
                    playCount={game.playCount}
                />
            )
        );
    };

    render() {
        if(this.context.games.length < 1) {
            this.getGames();
        }
        
        const games = this.context.games.map(game =>
            <GameBlock
                key={game.id}
                id={game.id}
                title={game.title}
                description={game.description}
                image={game.image}
                bggRating={game.bgg_rating}
            />
        );

        let gameList = [];
        if(this.context.games.length > 0) {
            for(let i = 0; i < this.context.games.length; i++) {
                const thisGame = this.context.games[i];
                thisGame.value = thisGame.title;
                thisGame.label = thisGame.title;
                let newArr = gameList;
                newArr.push(thisGame);
                gameList = newArr.sort();
            }
        }

        return (
            <section className='GamePageMain'>
                <h1>Games</h1>
                <form 
                    className='SessionForm_form'
                >
                    <label htmlFor='gameTitle'>
                        Game title
                    </label>
                    <Select
                        id='gameTitle'
                        className='gameTitleOption'
                        options={gameList}
                        onChange={e => this.updateTitle(e)} 
                        value={gameList.filter(obj => obj.value === this.state.gameTitle.value)}
                        required
                    />
                    <button 
                        type='button'
                        onClick={e => this.handleSubmit()}
                    >
                        Search
                    </button>
                </form>
                <p>Don't see a game you're looking for? <Link to='/add-games'>Add it!</Link></p>
                {this.renderSearchedGame()}
                <h2>Most Played on TableTop Ledger</h2>
                {this.renderMostPlayed()}
                <h2>All Games</h2>
                {games}
            </section>
        );
    }
}

export default GamePageMain;