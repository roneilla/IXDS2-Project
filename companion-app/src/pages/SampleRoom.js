import React from 'react';
import { Container } from '../shared/global';
import io from 'socket.io-client';

const SampleRoom = (server) => {
	const serverId = server.params.id;

	const socket = io('http://localhost:3000', {
		query: {
			token: localStorage.getItem('CC_Token'),
		},
	});

	return (
		<Container>
			<div>This is a sample server room</div>
		</Container>
	);
};

export default SampleRoom;
