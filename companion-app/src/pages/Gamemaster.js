import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container, PrimaryButton } from '../shared/global';
import WorldEvents from '../components/WorldEvents';
import StockMarket from '../components/StockMarket';

import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 1rem;
	padding: 0 1rem;
`;

const DashboardItem = styled.div`
	grid-column: span 1;
	padding: 1rem;
	border: #333 1px solid;
	background-color: white;
	margin: 1rem 0;
	overflow: auto;
	height: calc(100vh - 75px - 50px - 2rem);
`;

const RoundCounter = styled.h1`
	font-size: 5rem;
	margin: 2rem 0;
	font-family: ohno-blazeface, sans-serif;
	font-weight: 700;
	color: white;
`;

const Modal = styled.div`
	background-color: #fff;
	position: absolute;
	left: 0;
	right: 0;
	border: #ccc solid 1px;
	margin: 1rem auto;
	width: 100%;
	max-width: 500px;
	padding: 1rem;
	border-radius: 5px;
	color: #000;
	text-align: center;
`;

const RoundTrackerContainer = styled.div`
	background-color: #fac969;
	color: #fff;
	width: 100%;
	padding: 1rem;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	height: 100%;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	& ${PrimaryButton} {
		margin: 1rem 0;
	}
`;

let connectionOptions = {
	'force new connection': true,
	reconnectionAttempts: 'Infinity',
	timeout: 1000,
	transports: ['websocket'],
};

const Gamemaster = ({ location }) => {
	const [roundCount, setRoundCount] = useState(0);
	const [openDialog, setOpenDialog] = useState(false);

	const [username, setUsername] = useState('');
	const [servername, setServername] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const history = useHistory();

	const ENDPOINT = 'http://localhost:5000';

	useEffect(() => {
		const { username, servername } = queryString.parse(location.search);

		socket = io.connect(ENDPOINT, connectionOptions);

		setUsername(username);
		setServername(servername);

		socket.emit('join', { username, servername }, ({}) => {});

		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	return (
		<Container
			style={{
				padding: '0',
			}}>
			<Grid>
				<DashboardItem style={{ padding: '0rem' }}>
					<RoundTrackerContainer>
						<RoundCounter> {roundCount}</RoundCounter>

						<ButtonsContainer>
							<PrimaryButton
								onClick={() => {
									setRoundCount(roundCount + 1);
									console.log('hi');
								}}>
								Next Round
							</PrimaryButton>
							<PrimaryButton onClick={() => setOpenDialog(true)}>
								End Game
							</PrimaryButton>
						</ButtonsContainer>

						{openDialog === true ? (
							<Modal>
								<h2>Are you sure you want to end the game?</h2>
								<ButtonContainer>
									<PrimaryButton onClick={() => setOpenDialog(false)}>
										No, continue game
									</PrimaryButton>
									<PrimaryButton onClick={() => history.push('/play-again')}>
										Yes, end game
									</PrimaryButton>
								</ButtonContainer>
							</Modal>
						) : null}
					</RoundTrackerContainer>
				</DashboardItem>
				<DashboardItem>
					<WorldEvents roundCounter={roundCount}></WorldEvents>
				</DashboardItem>
				<DashboardItem>
					<StockMarket roundCounter={roundCount}></StockMarket>
				</DashboardItem>
			</Grid>
		</Container>
	);
};

export default Gamemaster;
