import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Qs from "qs";
// import Boardgame from './Game';
// import Boardgame from "./Game"



class App extends Component {
	constructor() {
		super();
		this.state = {
			searchQuery: "",
			// boardgames: [],
			boardgameTitles: [],
			gameIds: [],
			gameInfo: [],
			description: [],
			minplayers: [],
			maxplayers: [],
			rating: [],
			categories: [],
			gameImg: []
		}
	}
	

	getGames = () => {

		axios({
			url: 'https://proxy.hackeryou.com',
			dataResponse: 'json',
			method: 'GET',
			paramsSerializer: function (params) {
				return Qs.stringify(params, { arrayFormat: 'brackets' })
			},
			params: {
				reqUrl: "https://www.boardgamegeek.com/xmlapi/search",
				params: {
					search: this.state.searchQuery,
					// search: "avalon",
				},
				xmlToJSON: true
			}
		}).then((res) => {
			// console.log(res)
			const gameData = res.data.boardgames.boardgame
			// console.log(gameData)				

			let gameIds = [];
			let boardgameTitles = [];

			// limit to finding only 10 games!!!!
			for (let i = 0; i < 10; i++) {
				if (gameData[i].name.$t !== undefined) {
					gameIds.push(gameData[i].objectid)
					boardgameTitles.push(gameData[i].name.$t)
				}
			}

			// console.log(gameIds)
			// console.log(boardgameTitles)
			

			this.setState({
				boardgamesTitles: boardgameTitles,
				gameIds: gameIds,
				// boardgames: gameData
			});
	
			this.getGameData()
		})
	}
	
	getGameData = () => {

		// map through state id array
		this.state.gameIds.map((id) => {
			axios({
				url: 'https://proxy.hackeryou.com',
				dataResponse: 'json',
				method: 'GET',
				paramsSerializer: function (params) {
					return Qs.stringify(params, { arrayFormat: 'brackets' })
				},
				params: {
					reqUrl: `https://www.boardgamegeek.com/xmlapi/boardgame/${id}`,
					params: {
						stats: 1,
					},
					xmlToJSON: true
				}
			})

				.then((info) => {
					// console.log('returning', info.data.boardgames.boardgame)

					const gameInfo = info.data.boardgames.boardgame

					// making general array of all game info
					const copyArray = Array.from(this.state.gameInfo);

					copyArray.push(gameInfo);
					// console.log(copyArray)

					this.setState({
						gameInfo: copyArray
					})


					this.getGameInfo(); // do I really need this?
					// console.log('test')
				})
			return "cake"
		})
	}



	getGameInfo = () => {


		/// making an array of min players 
		const minplayers = []
		
		this.state.gameInfo.map((game) => {
			minplayers.push(game.minplayers);
			return minplayers
		});

		this.setState({
			minplayers: minplayers
		})
		// console.log(this.state.minplayers)

		/// making an array of max players 
		const maxplayers = []

		this.state.gameInfo.map((game) => {
			maxplayers.push(game.maxplayers);
			return maxplayers
		});

		this.setState({
			maxplayers: maxplayers
		})
		// console.log(this.state.maxplayers)


		/// making an array of average rating
		const rating = []

		this.state.gameInfo.map((game) => {

			if (game.statistics.ratings.average === "0") {
				rating.push("0")
			} else {
				rating.push(parseFloat(game.statistics.ratings.average).toFixed(2));
			}
			return rating
		});

		this.setState({
			rating: rating
		})
		// console.log(this.state.rating)


		/// making an array of categories 
		const categories = []

		this.state.gameInfo.map((game) => {
			// console.log(game.id, game.boardgamecategory.$t);
			const oneGame = [];

			if (game.boardgamecategory.length > 0 && game.boardgamecategory !== undefined) {
				game.boardgamecategory.map((category) => {
					oneGame.push(category.$t);
					return category
				})
			}
			else {
				oneGame.push(game.boardgamecategory.$t)
			}
			categories.push(oneGame)
			return categories
		});

		this.setState({
			categories: categories
		})
		// console.log(this.state.categories)

		/// making an array of game images
		const gameImg = []

		this.state.gameInfo.map((game) => {
			gameImg.push(game.image)
			return gameImg
		});

		this.setState({
			gameImg: gameImg
		})
		// console.log(this.state.gameImg)

		


	}


	







	////////////////////////




	handleChange = (e) => {
		// console.log(e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	// add games for users
	handleSubmit = (e) => {
		e.preventDefault();
		
		this.setState({
			gameInfo: []
		})

		this.getGames();

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


				{/* game results */}

				{/* <Boardgame gameInfo={this.state.gameInfo} /> */}
				


				{this.state.gameInfo.map((game, i) => {
					return (
						<div key={game.objectid}>
							<h2>{this.state.boardgamesTitles[i]}</h2>
							<img src={game.image} alt="" />
							<p>Players: {game.minplayers} - {game.maxplayers}</p>
							{/* <p>Categories: {game.boardgamecategory} </p> */}
							<p>Rating: 
							{ (game.statistics.ratings.average === "0") ?
							" 0"
							:
								" " + (parseFloat(game.statistics.ratings.average)).toFixed(2)}
							 /10</p>

						</div>
					)
				}
				)}	








		

			</div>
		);
	}
}

export default App;
