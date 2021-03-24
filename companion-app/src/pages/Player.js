import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../shared/global';

import queryString from 'query-string';

const Player = ({ props, location }) => {
	// const socket = props.socket;
	const [username, setUsername] = useState('');
	const [servername, setServername] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const { username, servername } = queryString.parse(location.search);

		setUsername(username);
		setServername(servername);
	}, []);

	return (
		<Container>
			<div>{servername}</div>
			<div>{username}</div>
		</Container>
	);
};

export default Player;
