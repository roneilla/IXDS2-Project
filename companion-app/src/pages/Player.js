import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import { Container } from '../shared/global';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

let connectionOptions = {
	'force new connection': true,
	reconnectionAttempts: 'Infinity',
	timeout: 1000,
	transports: ['websocket'],
};

const Player = ({ location }) => {
	const [username, setUsername] = useState('');
	const [servername, setServername] = useState('');

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const ENDPOINT = 'http://localhost:5000';

	useEffect(() => {
		const { username, servername } = queryString.parse(location.search);

		socket = io.connect(ENDPOINT, connectionOptions);

		setUsername(username);
		setServername(servername);

		socket.emit('join', { username, servername }, (error) => {
			if (error) {
				alert(error);
			}
		});
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	console.log(message, messages);

	return (
		<Container>
			<div>
				<input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={(event) =>
						event.key === 'Enter' ? sendMessage(event) : null
					}
				/>
			</div>
		</Container>
	);
};

export default Player;
