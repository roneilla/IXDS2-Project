import React, { useState, useEffect } from 'react';
import {
	ColumnFlex,
	Container,
	H1,
	PrimaryButton,
	TextInput,
	Button,
} from '../shared/global';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Gamemaster from './../assets/gamemaster.png';
import Player from './../assets/player.png';
import Toast from '../shared/Toast';

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

	const history = useHistory();

	const beginGame = (e) => {
		e.preventDefault();

		const user = {
			username: username,
			role: role,
		};

		// create an error for if username is null or undefine
		// set parameter requirements for username

		axios.post('http://localhost:3001/users/add', user).then();

		setReady(true);
	};

	const createServer = (e) => {
		e.preventDefault();

		const serverInfo = {
			servername: serverName,
			population: 1,
		};

		for (let i = 0; i <= existingServers.length; i++) {
			if (serverName === existingServers[i]) {
				alert(
					'The server ' +
						serverName +
						' already exists. Please choose a new name.'
				);
				// TODO clear the input field
			} else {
				axios
					.post('http://localhost:3001/serverRoom/add', serverInfo)
					.then((res) => {
						history.push(
							'/gamemaster?username=' + username + '&servername=' + serverName
						);
					});
			}
		}
	};

	const joinServer = (e) => {
		e.preventDefault();

		for (let i = 0; i <= existingServers.length; i++) {
			if (serverName === existingServers[i]) {
				if (existingServers[i].population !== 7) {
					axios
						.post(
							'http://localhost:3001/serverRoom/updatePopulation/' + serverName
						)
						.then((res) => {});

					history.push(
						'/player?username=' + username + '&servername=' + serverName
					);
				}
			}
		}
	};

	useEffect(() => {
		axios
			.get('http://localhost:3001/serverRoom')
			.then((response) => {
				if (response.data.length > 0) {
					setExistingServers(response.data.map((server) => server.servername));
				}
			})
			.catch((error) => {});
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
							style={
								role === 'player'
									? { border: '2px solid #4F73B6' }
									: { border: 'none' }
							}
							onClick={(e) => {
								setRole('player');
							}}>
							<ColumnFlex>
								<img alt="" src={Player}></img>
								<span style={{ color: '#4f73b6' }}>Player</span>
							</ColumnFlex>
						</PlayerButton>
						<GamemasterButton
							style={
								role === 'gamemaster'
									? { border: '2px solid #F0C418' }
									: { border: 'none' }
							}
							onClick={(e) => {
								setRole('gamemaster');
							}}>
							<ColumnFlex>
								<img alt="" src={Gamemaster}></img>
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
