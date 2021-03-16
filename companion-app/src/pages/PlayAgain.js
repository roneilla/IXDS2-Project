import React from 'react';
import { Container, PrimaryButton } from './../shared/global';
import { useHistory } from 'react-router-dom';

const PlayAgain = () => {
	const history = useHistory();
	return (
		<Container>
			<img alt="logo"></img>
			<h1>Thanks for playing! We hope you enjoyed the game.</h1>
			<PrimaryButton onClick={() => history.push('/')}>
				Play Again
			</PrimaryButton>
		</Container>
	);
};

export default PlayAgain;
