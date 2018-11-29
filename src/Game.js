import React from 'react';

const Boardgame = (props) => {
	// console.log(props)
	return (
		<div>
			{props.gameInfo.map(game => {
				return (
					<div key={game.id}>
						<h2>{game.name.value}</h2>
					</div>
				);
			})}

		</div>
	);
};

export default Boardgame;