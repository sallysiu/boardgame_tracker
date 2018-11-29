import React from 'react';

class SearchGames extends Component {

	handleSubmit = (e) => {
		e.preventDefault();

		const searchQuery = this.state.searchQuery;

		// this.getGame();
		// clear the form
		this.setState({
			searchQuery: ""
		})
	}


}