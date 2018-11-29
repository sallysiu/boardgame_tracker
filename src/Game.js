import React from 'react';

const Boardgame = (props) => {
	// console.log(props)
	return (
		// <div>
		// 	{props.gameFound.map(game => {
		// 		return (
		// 			<div
		// 				 key={game.id}>
		// 				<h2>{game.name.value}</h2>
		// 			</div>
		// 		);
		// 	})}

		// </div>

		<div>
			{props.gameInfo.map(game => {
				return (
					<div
						key={game.id}>
						<h2>{game.name.value}</h2>
						<img src={game.image} alt=""/>
						{/* <p>{game.description}</p> */}
					</div>
				);
			})}

		</div>

	);
};



export default Boardgame;