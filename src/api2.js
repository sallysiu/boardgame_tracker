import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Qs from "qs";
// import Boardgame from "./Game"



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
			categories: [],
			newState: []
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
				reqUrl: "https://www.boardgamegeek.com//xmlapi/search",
				params: {
					query: this.state.searchQuery,
					// query: "shadow",
					type: "boardgame"
				},
				xmlToJSON: true
			}
		}).then((res) => {
			const gameData = res.data.items.item
			// console.log(gameData)				

			let gameIds = [];
			let boardgameTitles = [];

			// limit to finding only 10 games!!!!
			for (let i = 0; i < gameData.length; i++) {
				gameIds.push(gameData[i].id)
				boardgameTitles.push(gameData[i].name.value)
			}
			// console.log(gameIds)
			// console.log(boardgameTitles)



			this.setState({
				boardgamesTitles: boardgameTitles,
				gameIds: gameIds,
				// boardgames: gameData
			});

			// console.log("hello", this.state.gameIds)

			this.getGameData()


		})

		// }	

	}

	getGameData = () => {

		// this.setState({
		// 	gameInfo : []
		// })

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
					reqUrl: `https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`,
					params: {
						stats: 1,
					},
					xmlToJSON: true
				}
			})

				.then((data) => {
					console.log('returning', data)

					const description = [];
					// console.log(data.data.items.item.description)

					description.push(data.data.items.item.description)


					// working
					const copyArray = Array.from(this.state.gameInfo);

					copyArray.push(data.data.items.item);
					// console.log(copyArray)

					this.setState({
						gameInfo: copyArray
					})

					this.getGameInfo();

				})


			return "cake"


		})



	}

	getGameInfo2 = () => {
		// const description = [];

		console.log(this.state.gameInfo, "hello")

		this.state.gameInfo.map((game) => {
			// console.log(game.id)
			// 	console.log(game.name[0].value)
			// 	console.log(game.description)
			// 	description.push(game.description);
			// 	return description;

			return 'muffin'
		})
		// console.log(description)

		const categories = [];
		// console.log(this.state.gameInfo)




		//////// old category finder 
		// const categories = [];

		// this.state.gameInfo[0].link.map((category) => {

		// 	if (category.type === "boardgamecategory") {
		// 		// console.log(category.value)
		// 		categories.push(category.value)
		// 	}

		// 	this.setState({
		// 		categories: categories
		// 	})

		// 	return 'cake'
		// })






	};


	// getGameInfo = () => {
	// 	const description = [];
	// 	this.state.gameInfo.map((game) => {
	// 		description.push(game.description);
	// 		return description;
	// 	})
	// }//getgameinfo








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


				{/* <Boardgame 
				// gameTitle={this.state.boardgamesTitles} 
				// gameId={this.state.gameIds} 
				// gameFound={this.state.boardgames}
				// gameInfo={this.state.gameInfo}
				gameInfo={this.state.newState}
				/> */}



			</div>
		);
	}
}

export default App;
