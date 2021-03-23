import React, { useState } from 'react';
import { Container, H1, PrimaryButton } from '../shared/global';
import axios from 'axios';

const Game = () => {
	const [username, setUsername] = useState();
	const [role, setRole] = useState();

	const beginGame = (e) => {
		e.preventDefault();
		console.log(username + ' is a ' + role);

		const user = {
			username: username,
			role: role,
		};

		axios
			.post('http://localhost:5000/users/add', user)
			.then((res) => console.log(res.data));
	};

	return (
		<Container>
			<div>
				<H1>What is your role?</H1>

				<label for="username">Username</label>
				<input
					placeholder="Write your username here"
					onChange={(e) => {
						setUsername(e.target.value);
					}}></input>

				<div
					onChange={(e) => {
						setRole(e.target.value);
					}}>
					<input type="radio" id="player" name="role" value="player"></input>
					<label for="player">Player</label>
					<br></br>

					<input
						type="radio"
						id="gamemaster"
						name="role"
						value="gamemaster"></input>
					<label for="gamemaster">Gamemaster</label>
					<br></br>
				</div>
				<PrimaryButton onClick={beginGame}>Submit</PrimaryButton>
			</div>
			<div>
				<H1>Join Server</H1>
			</div>
		</Container>
	);
};

export default Game;
