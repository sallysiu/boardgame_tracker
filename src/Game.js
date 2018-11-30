import React from 'react';

const Boardgame = (props) => {
	// console.log(props)
	return (
		<div>
			{props.gameInfo.map(game => {
					return (
						<div>
							<h2>{game.name.$t}</h2>
							<img src={game.image} alt="" />
							<p>Players: {game.minplayers} - {game.maxplayers}</p>
							<p>Categories: {game.boardgamecategory} </p>
							<p>Rating: {game.statistics.ratings.average} / 10</p>

						</div>
					)
				}
			)}	

		</div>

	);
};



export default Boardgame;