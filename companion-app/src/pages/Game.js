import React, { useState, useEffect } from 'react';
import { Container, H1, PrimaryButton } from '../shared/global';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import CreateServer from './CreateServer';

const Game = () => {
	const [username, setUsername] = useState();
	const [role, setRole] = useState();
	const [serverName, setServerName] = useState();
	const [ready, setReady] = useState(false);
	const [existingServers, setExistingServers] = useState([]);

	const history = useHistory();

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

		setReady(true);
	};

	const createServer = (e) => {
		e.preventDefault();
		console.log('server name is' + serverName);

		const serverInfo = {
			servername: serverName,
		};

		axios
			.post('http://localhost:5000/serverRoom/add', serverInfo)
			.then((res) => console.log(res.data));

		history.push(
			'/gamemaster?username=' + username + '&servername=' + serverName
		);
	};

	const joinServer = (e) => {
		e.preventDefault();

		console.log('server name is' + serverName);

		for (let i = 0; i <= existingServers.length; i++) {
			if (serverName === existingServers[i]) {
				history.push(
					'/player?username=' + username + '&servername=' + serverName
				);
			} else {
				console.log('server does not exist');
			}
		}
	};

	useEffect(() => {
		axios
			.get('http://localhost:5000/serverRoom')
			.then((response) => {
				if (response.data.length > 0) {
					setExistingServers(response.data.map((server) => server.servername));
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Container>
			{ready === false ? (
				<div>
					<H1>What is your role?</H1>

					<label htmlFor="username">Username</label>
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
						<label htmlFor="player">Player</label>
						<br></br>

						<input
							type="radio"
							id="gamemaster"
							name="role"
							value="gamemaster"></input>
						<label htmlFor="gamemaster">Gamemaster</label>
						<br></br>
					</div>
					<PrimaryButton onClick={beginGame}>Submit</PrimaryButton>
				</div>
			) : (
				<div>
					{role === 'player' ? (
						<span>
							<H1>Join Server</H1>
							<label htmlFor="username">Server</label>
							<input
								placeholder="Find a Server"
								onChange={(e) => {
									setServerName(e.target.value);
								}}></input>

							<button onClick={joinServer}>Join</button>
						</span>
					) : (
						<span>
							<H1>Host Server</H1>
							<label htmlFor="servername">Server</label>
							<input
								name="servername"
								placeholder="Create a Server"
								onChange={(e) => {
									setServerName(e.target.value);
								}}></input>

							<button onClick={createServer}>Create Room</button>
						</span>
					)}
				</div>
			)}
		</Container>
	);
	//
};

export default Game;
