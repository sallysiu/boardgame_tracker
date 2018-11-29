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
			gameIds: []
		}
	}
	

	getGame = () => {

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
						query: this.state.searchQuery,
						// query: searchQuery,
						type: "boardgame"
					},
					xmlToJSON: true
				}
			}).then((res) => {
				// console.log(res)
				const gameData = res.data.items.item
				
				this.setState({
					boardgames: res.data.items.item,
				});

				console.log(gameData)

				// let gameIds = [];
				
				// gamesIds.push(gameData.id)
	
	
			})
	
		// }	

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

		this.getGame();
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


				<Boardgame gameInfo={this.state.boardgames}/>

		

			</div>
		);
	}
}

export default App;
