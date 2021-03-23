import React, { useState, useEffect } from 'react';
import { Container, H1, H2, PrimaryButton } from '../shared/global';
import axios from 'axios';

const CreateServer = (props) => {
	const [servername, setservername] = useState();
	const [existingServers, setExistingServers] = useState([]);

	const createServername = (e) => {
		e.preventDefault();
		console.log(servername);

		const serverRoom = {
			servername: servername,
		};

		axios
			.post('http://localhost:5000/serverRoom/add', serverRoom)
			.then((res) => console.log(res.data));
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

	console.log(existingServers);

	const openServers = existingServers.map((data, index) => (
		<p key={index} value={data.servername}>
			{data}
		</p>
	));

	return (
		<Container>
			<H1>Create a Server</H1>
			<input
				onChange={(e) => {
					setservername(e.target.value);
				}}></input>
			<PrimaryButton onClick={createServername}>Create</PrimaryButton>
			<div>
				<H2>Servers</H2>
				{openServers}
			</div>
		</Container>
	);
};

export default CreateServer;
