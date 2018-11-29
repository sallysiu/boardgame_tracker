import React from 'react';

const Boardgame = (props) => {
	// console.log(props)
	return (
		<div>
			{props.gameInfo.map(game => {
				// console.log(game)
				return (
					<div
						key={game.id}>
						<h2>{game.name.value}</h2>
					</div>
					
					
					// <div
					// 	key={game.id}>
					// 	<h2>{game.name[0].value}</h2>
					// 	{/* <img src={game.image} alt=""/> */}
					// 	<p>Average rating: {parseFloat(game.statistics.ratings.average.value).toFixed(2)} / 10 </p>
					// 	<p>Min: {game.minplayers.value} players</p>
					// 	<p>Max: {game.maxplayers.value} players</p>
					// 	{/* <p>{game.description}</p> */}
					// </div>
				);
			})}

		</div>

	);
};



export default Boardgame;