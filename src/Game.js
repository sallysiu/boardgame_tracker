import React, { Component } from 'react';
import './App.css';


class Boardgame extends Component {

	categories = () => {

		if (typeof this.props.categories === "string") {
			// console.log('SINGLE', this.props.categories)
			return (
				<li>
					{this.props.categories}
				</li>)
		}
		else {
			const categoryArray = this.props.categories.map(category => {
				return (<li>{category}</li>)
			})
			return categoryArray;
		}
	}


	render() {

		// console.log(this.props.categories, 'categories')
		return (
			<div className="foundGame" key={this.props.id}>
				<img src={this.props.image} alt={this.props.title}/>
				<h3>{this.props.title}</h3>
				<h4>Players: <span className="paragraph">{this.props.minplayers} - {this.props.maxplayers}</span></h4>
				<h4>Categories: 
					<ul className="categories">
				{/* couldn't figure out how to do single category */}
					{ this.categories()}
					</ul>					
					</h4>
				<h4>Rating: <span className="paragraph">{this.props.rating}/10</span></h4>
			</div>
		)
	}
}








export default Boardgame;