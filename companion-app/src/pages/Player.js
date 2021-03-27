import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, H1 } from '../shared/global';
import ChooseCareer from './../components/ChooseCareer';

import queryString from 'query-string';

import axios from 'axios';
import SetBudget from '../components/SetBudget';

const Player = ({ location }) => {
	const [username, setUsername] = useState('');
	const [servername, setServername] = useState('');
	const [roundCounter, setRoundCounter] = useState(0);

	let currentServerName = '';

	const MINUTE_MS = 500;

	useEffect(() => {
		const { username, servername } = queryString.parse(location.search);

		setUsername(username);
		setServername(servername);
		currentServerName = servername;
	}, [location.search]);

	useEffect(() => {
		const interval = setInterval(() => {
			axios
				.get(
					'http://localhost:5000/serverRoom/currentRound/' + currentServerName
				)
				.then((res) => {
					setRoundCounter(res.data.roundcounter);
				});

			console.log(currentServerName);
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);

	return (
		<Container>
			<div>Server Name: {servername}</div>
			<div>Player Name: {username}</div>
			<br></br>
			<div>Current Round </div>
			<H1> {roundCounter}</H1>
			<div>Career: </div>
			<div>Salary: </div>
			<ChooseCareer username={username}></ChooseCareer>
			<SetBudget username={username}></SetBudget>
		</Container>
	);
};

export default Player;
