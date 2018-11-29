import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Qs from "qs";
import Boardgame from "./Game"



class App extends Component {
	constructor() {
		super();
		this.state = {
			searchQuery: "",
			boardgames: [],
			boardgameTitles: [],
			gameIds: [],
			gameInfo: [],
			description: [],
		}
	}
	

	getGames = () => {

		// getGameId = (searchQuery) => {
			axios({
				url: 'https://proxy.hackeryou.com',
				dataResponse: 'json',
				method: 'GET',
				paramsSerializer: function (params) {
					return Qs.stringify(params, { arrayFormat: 'brackets' })
				},
				params: {
					reqUrl: "https://www.boardgamegeek.com/xmlapi2/search",
					params: {
						// query: this.state.searchQuery,
						query: "shadow",
						type: "boardgame"
					},
					xmlToJSON: true
				}
			}).then((res) => {
				const gameData = res.data.items.item
				// console.log(gameData)				

				let gameIds = [];
				let boardgameTitles = [];

				for (let i = 0; i < gameData.length; i++) {
					gameIds.push(gameData[i].id)
					boardgameTitles.push(gameData[i].name.value)
				}
				// console.log(gameIds)
				// console.log(boardgameTitles)
				


				this.setState({
					boardgamesTitles: boardgameTitles,
					gameIds: gameIds,
					boardgames: gameData
				});
		

				
			})

		// }	

	}

	getGameInfo = (id) => {

		axios({
			url: 'https://proxy.hackeryou.com',
			dataResponse: 'json',
			method: 'GET',
			paramsSerializer: function (params) {
				return Qs.stringify(params, { arrayFormat: 'brackets' })
			},
			params: {
				reqUrl: `https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`,
				params: {
					type: "boardgame",
					marketplace: 1,
					stats: 1,
					versions: 1
				},
				xmlToJSON: true
			}
		}).then((data) => {
			// console.log('returning')
			// console.log(data)

			const gameInfo = [];
			gameInfo.push(data.data.items.item);

			console.log(gameInfo)
			

			this.setState({
				gameInfo: gameInfo,
				// description: description
			})

			// console.log('hello')

			// this.getGameDescription();


		})

	}

	getGameDescription = () => {
		const description = [];

		this.state.gameInfo.map((game) => {
			// console.log(game.id)
			console.log(game.name[0].value)
			console.log(game.description)
			description.push(game.description);
			return description;
		})
		console.log(description)
	}



	handleChange = (e) => {
		// console.log(e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	// add games for users
	handleSubmit = (e) => {
		e.preventDefault();

		this.getGames();

		this.getGameInfo("24068");

		// clear the form
		this.setState({
			searchQuery: ""
		})
	}
			
	



	render() {
		return (
			<div className="App">
				<h1>Games shelf</h1>

				<form action="" onSubmit={this.handleSubmit}>
					<label htmlFor="searchQuery">Search for board games:</label>
					<input 
					onChange={this.handleChange} 
					value={this.state.searchQuery} 
					type="text" 
					id="searchQuery"
					/>
					<input type="submit" value="Find games" />
				</form>


				<Boardgame 
				// gameTitle={this.state.boardgamesTitles} 
				// gameId={this.state.gameIds} 
				// gameFound={this.state.boardgames}
				gameInfo={this.state.gameInfo}
				/>

		

			</div>
		);
	}
}

export default App;
