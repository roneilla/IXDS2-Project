import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, H1 } from '../shared/global';

import queryString from 'query-string';

import axios from 'axios';

const Player = ({ props, location }) => {
	// const socket = props.socket;
	const [username, setUsername] = useState('');
	const [servername, setServername] = useState('');
	const [roundCounter, setRoundCounter] = useState(0);

	const MINUTE_MS = 100;

	useEffect(() => {
		const { username, servername } = queryString.parse(location.search);

		setUsername(username);
		setServername(servername);
	}, [location.search]);

	useEffect(() => {
		const interval = setInterval(() => {
			axios
				.get('http://localhost:5000/serverRoom/currentRound/test6')
				.then((res) => {
					setRoundCounter(res.data.roundcounter);
				});

			// add an error handler
			console.log(servername);
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);

	return (
		<Container>
			<div>Server Name: {servername}</div>
			<div>Player Name:{username}</div>
			<div>Current Round: </div>
			<H1> {roundCounter}</H1>
		</Container>
	);
};

export default Player;
