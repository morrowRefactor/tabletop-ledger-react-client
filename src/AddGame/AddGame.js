import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import XMLParser from 'react-xml-parser';
import SearchedGameResult from '../SearchedGameResult/SearchedGameResult';
import AddSelectedGame from '../AddSelectedGame/AddSelectedGame';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import './AddGame.css';

class AddGame extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props)
        this.state = {
            searchedGame: [],
            searchTitle: { value: '', touched: false },
            selectedGame: {}
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
            const info = gameArr.find(({name}) => name === 'description');
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
            
            this.setState({
                selectedGame: {
                    id: id,
                    title: title,
                    info: info.value,
                    image: image.value,
                    yearPub: year.attributes.value,
                    rating: bggRating.attributes.value
                }
            });
        })
        .catch(err => console.log(err));
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
                info={this.state.selectedGame.info}
                image={this.state.selectedGame.image}
                yearPub={this.state.selectedGame.yearPub}
                rating={this.state.selectedGame.rating}
            />
        }
    }

    render() {
        const titleError = this.validateTitle();

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