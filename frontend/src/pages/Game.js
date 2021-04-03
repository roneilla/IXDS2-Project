import React, { useState, useEffect } from 'react';
import {
	ColumnFlex,
	Container,
	H1,
	PrimaryButton,
	TextInput,
	Button,
	FlexBetween,
} from '../shared/global';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Gamemaster from './../assets/gamemaster.png';
import Player from './../assets/player.png';

const PlayerButton = styled(Button)`
	background-color: #ecf1f7;
	text-align: center;
	vertical-align: center;
	width: 250px;
	margin: 1rem;
	font-size: 1.5rem;
	font-weight: 700;
`;

const GamemasterButton = styled(Button)`
	background-color: #fef9e6;
	text-align: center;
	vertical-align: center;
	width: 250px;
	margin: 1rem;
	font-size: 1.5rem;
	font-weight: 700;
`;

const FlexContainer = styled.div`
	display: flex;
`;

const Game = () => {
	const [username, setUsername] = useState();
	const [role, setRole] = useState();
	const [serverName, setServerName] = useState();
	const [ready, setReady] = useState(false);
	const [existingServers, setExistingServers] = useState([]);
	const [newPopulation, setNewPopulation] = useState(1);

	const history = useHistory();

	const beginGame = (e) => {
		e.preventDefault();
		console.log(username + ' is a ' + role);

		const user = {
			username: username,
			role: role,
		};

		// create an error for if username is null or undefine
		// set parameter requirements for username

		axios
			.post('https://the-price-of-life.herokuapp.com/users/add', user)
			.then((res) => console.log(res.data));

		setReady(true);
	};

	const createServer = (e) => {
		e.preventDefault();

		console.log('server name is' + serverName);

		const serverInfo = {
			servername: serverName,
			population: 1,
		};

		for (let i = 0; i <= existingServers.length; i++) {
			if (serverName === existingServers[i]) {
				alert('server already exists. choose a new name');
				// TODO clear the input field
			} else {
				axios
					.post(
						'https://the-price-of-life.herokuapp.com/serverRoom/add',
						serverInfo
					)
					.then((res) => {
						console.log(res.data);
						history.push(
							'/gamemaster?username=' + username + '&servername=' + serverName
						);
					});
			}
		}
	};

	const joinServer = (e) => {
		e.preventDefault();

		console.log('server name is' + serverName);

		for (let i = 0; i <= existingServers.length; i++) {
			if (serverName === existingServers[i]) {
				if (existingServers[i].population !== 7) {
					axios
						.post(
							'https://the-price-of-life.herokuapp.com/serverRoom/updatePopulation/' +
								serverName
						)
						.then((res) => {
							console.log(res.data.population);
						});

					history.push(
						'/player?username=' + username + '&servername=' + serverName
					);
				} else {
					console.log('too many people here');
				}
			} else {
				console.log('server does not exist');
			}
		}
	};

	useEffect(() => {
		axios
			.get('https://the-price-of-life.herokuapp.com/serverRoom')
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
				<ColumnFlex>
					<H1>What would you like to be called?</H1>

					<TextInput
						placeholder="Write your username here"
						onChange={(e) => {
							setUsername(e.target.value);
						}}></TextInput>
					<H1>What is your role?</H1>
					<FlexContainer>
						<PlayerButton
							onClick={(e) => {
								setRole('player');
							}}>
							<ColumnFlex>
								<img src={Player}></img>
								<span style={{ color: '#4f73b6' }}>Player</span>
							</ColumnFlex>
						</PlayerButton>
						<GamemasterButton
							onClick={(e) => {
								setRole('gamemaster');
							}}>
							<ColumnFlex>
								<img src={Gamemaster}></img>
								<span style={{ color: '#f0c418' }}>Gamemaster</span>
							</ColumnFlex>
						</GamemasterButton>
					</FlexContainer>

					<PrimaryButton onClick={beginGame}>Submit</PrimaryButton>
				</ColumnFlex>
			) : (
				<div>
					{role === 'player' ? (
						<ColumnFlex>
							<H1>Join Server</H1>
							<TextInput
								placeholder="Find a Server"
								onChange={(e) => {
									setServerName(e.target.value);
								}}></TextInput>
							<PrimaryButton onClick={joinServer}>Join</PrimaryButton>
						</ColumnFlex>
					) : (
						<ColumnFlex>
							<H1>Host Server</H1>
							<TextInput
								name="servername"
								placeholder="Create a Server"
								onChange={(e) => {
									setServerName(e.target.value);
								}}></TextInput>
							<PrimaryButton onClick={createServer}>Create Room</PrimaryButton>
						</ColumnFlex>
					)}
				</div>
			)}
		</Container>
	);
	//
};

export default Game;
