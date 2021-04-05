import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
	Container,
	LargeP,
	PrimaryButton,
	ClearButton,
} from '../shared/global';
import WorldEvents from '../components/WorldEvents';
import StockMarket from '../components/StockMarket';
import axios from 'axios';
import queryString from 'query-string';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 1rem;
	padding: 0 1rem;
`;

const DashboardItem = styled.div`
	grid-column: span 1;
	padding: 1rem;
	background-color: white;
	margin: 1rem 0;
	overflow: auto;
	height: calc(100vh - 75px - 50px - 2rem);
	border-radius: 5px;
`;

const RoundCounter = styled.h1`
	font-size: 7rem;
	margin: 2rem 0;
	font-family: ohno-blazeface, sans-serif;
	font-weight: 700;
	color: #f0c418;
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
	background-color: #fef9e6;
	color: #f0c418;
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

const GameStrip = styled.div`
	width: 100%;
	background-color: #f0c418;
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	font-size: 1.25rem;
`;

const Gamemaster = ({ location }) => {
	const [roundCount, setRoundCount] = useState(1);
	const [openDialog, setOpenDialog] = useState(false);
	const [username, setUsername] = useState('');
	const [servername, setServername] = useState('');

	const history = useHistory();

	useEffect(() => {
		const { username, servername } = queryString.parse(location.search);
		setUsername(username);
		setServername(servername);
		console.log(roundCount);
	}, []);

	const updateDb = (e) => {
		e.preventDefault();

		setRoundCount(roundCount + 1);

		const roundCounter = {
			roundcounter: roundCount + 1,
		};

		axios
			.post(
				'https://the-price-of-life.herokuapp.com/serverRoom/updateRound/' +
					servername,
				roundCounter
			)
			.then((res) => {
				console.log(res.data);
			});
	};

	const endGame = () => {
		axios
			.delete(
				'https://the-price-of-life.herokuapp.com/serverRoom/' + servername
			)
			.then((res) => {
				console.log(res.data);
			});

		history.push('/play-again');
	};

	return (
		<Container
			style={{
				padding: '0',
			}}>
			<GameStrip>
				<span>Server: {servername}</span>
				<span style={{ fontWeight: '700' }}>{username}'s Dashboard</span>
				<span>
					{/* population in room: */}
					{/* TOD: get population via axios */}
				</span>
			</GameStrip>
			<Grid>
				<DashboardItem style={{ padding: '0rem' }}>
					<RoundTrackerContainer>
						<LargeP> Round Tracker</LargeP>
						<RoundCounter> {roundCount}</RoundCounter>
						<ButtonsContainer>
							<PrimaryButton onClick={updateDb}>Next Round</PrimaryButton>
							<ClearButton onClick={() => setOpenDialog(true)}>
								End Game
							</ClearButton>
						</ButtonsContainer>
						{openDialog === true ? (
							<Modal>
								<h2>Are you sure you want to end the game?</h2>
								<ButtonContainer>
									<PrimaryButton onClick={() => setOpenDialog(false)}>
										No, continue game
									</PrimaryButton>
									<PrimaryButton onClick={endGame}>Yes, end game</PrimaryButton>
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
