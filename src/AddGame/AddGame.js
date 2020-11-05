import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import XMLParser from 'react-xml-parser';
import SearchedGameResult from '../SearchedGameResult/SearchedGameResult';
import AddSelectedGame from '../AddSelectedGame/AddSelectedGame';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import config from '../config';
import './AddGame.css';

class AddGame extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props)
        this.state = {
            searchedGame: [],
            searchTitle: { value: '', touched: false },
            selectedGame: {},
            duplicateGame: { value: { id: 0, title: '' }, status: false }
        };
    };

    getBGGid = game => {
        const baseURL = 'https://www.boardgamegeek.com/xmlapi2/search?query=';
        const url = baseURL + game + '&type=boardgame';
        
        fetch(url)
        .then(res => res.text())
        .then(data => {
            const xml = new XMLParser().parseFromString(data);
            const cleanRes = [];
            for(let i = 0; i < xml.children.length; i++) {
                const name = xml.children[i].children[0].attributes.value;
                const year = xml.children[i].children[1].attributes.value;
                const gameID = xml.children[i].attributes.id;
                const insertGame = {
                    id: gameID,
                    name: name,
                    yearPub: year
                };
                cleanRes.push(insertGame);
            }
            this.setState({
                searchedGame: cleanRes
            });
        })
        .catch(err => console.log(err));
    }

    getGameDetails = id => {
        const baseURL = 'https://www.boardgamegeek.com/xmlapi2/thing?id=';
        const url = baseURL + id + '&stats=1';
        
        fetch(url)
        .then(res => res.text())
        .then(data => {
            const xml = new XMLParser().parseFromString(data);
            const gameArr = xml.children[0].children;
            const image = gameArr.find(({name}) => name === 'image');
            const desc = gameArr.find(({name}) => name === 'description');
            const stats = gameArr.find(({name}) => name === 'statistics');
            const year = gameArr.find(({name}) => name === 'yearpublished');
            const gameStats = stats.children[0].children;
            const bggRating = gameStats.find(({name}) => name === 'average');
            let title;
            for(let i = 0; i < gameArr.length; i++) {
                if(gameArr[i].attributes.type === 'primary') {
                    title = gameArr[i].attributes.value;
                }
            }

            const newGame = {
                id: this.context.games.length + 1,
                bgg_id: id,
                title: title,
                description: desc.value,
                image: image.value,
                yearPub: year.attributes.value,
                bgg_rating: bggRating.attributes.value
            };
            
            this.setState({
                selectedGame: newGame
            });
        })
        .catch(err => console.log(err));
    };

    addSelectedGame = () => {
        fetch(`${config.API_ENDPOINT}/api/games`, {
            method: 'POST',
            body: JSON.stringify(this.state.selectedGame),
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
        .then(newGame => {
            if(this.props.match.params.uid) {
                const linkText = newGame.title.replace(/\s+/g, '-').toLowerCase();
                this.props.history.push(`/add-session/${this.props.match.params.uid}/new-game`)
            }
            else {
                const linkText = newGame.title.replace(/\s+/g, '-').toLowerCase();
                this.props.history.push(`/game/${newGame.id}/${linkText}`)
            }
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    checkDupeGame = () => {
        const checkGame = this.context.games.find(({ bgg_id }) => bgg_id === parseInt(this.state.selectedGame.bgg_id));
        if(checkGame) {
            this.setState({
                duplicateGame: { value: { id: checkGame.id, title: checkGame.title }, status: true }
            });
            this.dupeGame();
        }
        else {
            this.addSelectedGame();
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const searchedGame = document.getElementById('gameTitle').value;
        if(this.state.selectedGame.id) {
            this.setState({ selectedGame: {} });
        }
        this.getBGGid(searchedGame);
    };

    updateTitle = title => {
        this.setState({searchTitle: {value: title, touched: true}});
    };

    validateTitle = () => {
        const title = this.state.searchTitle.value.trim();
        if (title.length === 0) {
          return 'A game title is required';
        };
    };

    dupeGame = () => {
        if(this.state.duplicateGame.status === true) {
            const linkText = this.state.duplicateGame.value.title.replace(/\s+/g, '-').toLowerCase();
            const gameLink = `http://localhost:3000/game/${this.state.duplicateGame.value.id}/${linkText}`;
        
            return (
                <span>Looks like this game already exists on TTL.  <a href={gameLink}>Check it out</a></span>
            );
        };
    };

    renderSearchResultHeader = () => {
        if(this.state.searchedGame.length > 0) {
            return <h3 className='addGame_searchResultsHeader'>Your Results:</h3>
        }
    }

    renderSearchResults = () => {
        if(this.state.searchedGame.length > 0) {
            return this.state.searchedGame.map(game =>
                <SearchedGameResult
                    key={game.id}
                    id={game.id}
                    title={game.name}
                    yearPub={game.yearPub}
                    getGameDetails={this.getGameDetails}
                />
            )
        }
    }

    renderSelectedGame = () => {

        if(this.state.selectedGame.id) {
            return <AddSelectedGame
                key={this.state.selectedGame.id}
                title={this.state.selectedGame.title}
                desc={this.state.selectedGame.description}
                image={this.state.selectedGame.image}
                yearPub={this.state.selectedGame.yearPub}
                rating={this.state.selectedGame.bgg_rating}
                addGame={this.checkDupeGame}
            />
        }
    }

    render() {
        const titleError = this.validateTitle();
        const dupeError = this.dupeGame();

        return (
            <section className='AddGame'>
                <h1>Add a New Game</h1>
                <p>First, search for the game you want to add.</p>
                <form 
                    className='AddGame_form'
                    onSubmit={this.handleSubmit}
                >
                    <label htmlFor='gameTitle'>
                        Game title
                    </label>
                    <input
                        type='text'
                        id='gameTitle'
                        placeholder='ex: Terraforming Mars'
                        onChange={e => this.updateTitle(e.target.value)}
                        required
                    />
                    {this.state.searchTitle.touched && (
                        <ValidationError message={titleError} />
                    )}
                    {this.state.duplicateGame.status && (
                        <ValidationError message={dupeError} />
                    )}
                    <button type='submit'>
                        Search
                    </button>
                </form>
                <section className='AddGame_selectedGame'>
                    {this.renderSelectedGame()}
                </section>
                <section className='AddGame_searchResults'>
                    {this.renderSearchResultHeader()}
                    {this.renderSearchResults()}
                </section>
            </section>
        );
    }
}

export default withRouter(AddGame);