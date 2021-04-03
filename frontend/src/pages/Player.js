import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
	PrimaryButton,
	CardHeading,
	Container,
	H2,
	HeadingImg,
	H3,
	P,
	H4,
} from '../shared/global';
import ChooseCareer from './../components/ChooseCareer';

import queryString from 'query-string';

import axios from 'axios';
import SetBudget from '../components/SetBudget';
import SetFinancialGoal from '../components/SetFinancialGoal';
import FinancialTracker from '../components/FinancialTracker';

import Career from './../assets/Icon/Career.png';
import Bank from './../assets/Icon/Bank.png';
import Goal from './../assets/Icon/Goal.png';
import Budget from './../assets/Icon/Budget.png';
import Stocks from './../assets/Icon/Stocks.png';
import Calendar from './../assets/Icon/Calendar.png';
import CheckImg from './../assets/Icon/Check.svg';

const SetupCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 75px - 50px - 2rem);
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 1rem;
	padding: 0 1rem;
	height: calc(100vh - 75px - 50px - 2rem);
`;

const DashboardItem = styled.div`
	grid-column: span 1;
	display: flex;
	flex-direction: column;
	margin: 1rem 0;
	border-radius: 5px;
`;

const DashboardCard = styled.div`
	border-radius: 5px;
	background-color: #fff;
	color: #111;
	padding: 1rem;
	margin-bottom: 1rem;
	flex-grow: 1;
	overflow: auto;
`;

const GameStrip = styled.div`
	width: 100%;
	color: #fff;
	background-color: #4f73b6;
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	font-size: 1.25rem;
`;

const CareerCard = styled.div`
	border-radius: 5px;
	background-color: #4f73b6;
	color: #fff;
	padding: 1rem;
	margin-bottom: 1rem;
`;

const InputRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px #eee solid;
	border-radius: 5px;
	padding: 0.5rem;
	margin: 0.25rem 0;
`;

const GoalRow = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border: 1px #eee solid;
	border-radius: 5px;
	padding: 0.5rem;
	margin: 0.25rem 0;
`;

const CheckContainer = styled.div`
	width: 30px;
	height: 30px;
	margin-right: 1rem;
`;

const StyledCheckImg = styled.img`
	object-fit: contain;
	width: 100%;
`;

const Player = ({ location }) => {
	const [username, setUsername] = useState('');
	const [servername, setServername] = useState('');
	const [roundCounter, setRoundCounter] = useState(0);
	const [career, setCareer] = useState(false);
	const [budget, setBudget] = useState(false);
	const [goal, setGoal] = useState(false);

	const [myCareer, setMyCareer] = useState();
	const [mySalary, setMySalary] = useState(0);
	const [myChequing, setMyChequing] = useState(0);
	const [mySavings, setMySavings] = useState(0);
	const [myGoal, setMyGoal] = useState();

	const [myNetWorth, setMyNetWorth] = useState(0);

	const [myFirstCheckpoint, setMyFirstCheckpoint] = useState(0);
	const [mySecondCheckpoint, setMySecondCheckpoint] = useState(0);
	const [myGoalCheckpoint, setMyGoalCheckpoint] = useState(0);

	const [myBudget, setMyBudget] = useState([{}]);

	let currentServerName = '',
		currentUsername = '';

	const MINUTE_MS = 500;

	useEffect(() => {
		const { username, servername } = queryString.parse(location.search);

		setUsername(username);
		setServername(servername);
		currentUsername = username;
		currentServerName = servername;
	}, [location.search]);

	useEffect(() => {
		axios
			.get('https://the-price-of-life.herokuapp.com/users/' + currentUsername)
			.then((res) => {
				if (res.data.career != null) {
					setCareer(true);
					setMySalary(res.data.salary);
				}

				if (res.data.budget != null) {
					setBudget(true);
					setMyBudget(res.data.budget);
				}

				if (res.data.financialGoal != null) {
					setGoal(true);
					setMyGoal(res.data.financialGoal);
					setMyFirstCheckpoint(res.data.financialCheckpoints.first);
					setMySecondCheckpoint(res.data.financialCheckpoints.second);
					setMyGoalCheckpoint(res.data.financialCheckpoints.goal);
				}

				setMyCareer(res.data.career);
				setMyChequing(res.data.chequing);
				setMySavings(res.data.savings);
			});
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			axios
				.get(
					'https://the-price-of-life.herokuapp.com/serverRoom/currentRound/' +
						currentServerName
				)
				.then((res) => {
					setRoundCounter(res.data.roundcounter);
				});

			console.log(currentServerName);
			axios
				.get('https://the-price-of-life.herokuapp.com/users/' + currentUsername)
				.then((res) => {
					setMyChequing(res.data.chequing);
					setMySavings(res.data.savings);
					setMyNetWorth(+res.data.savings + +res.data.chequing);
				});
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);

	const BudgetSummary = () => {
		const results = [];

		for (let [key, value] of Object.entries(myBudget)) {
			results.push(
				<InputRow>
					<H3 style={{ textTransform: 'capitalize' }}>{key}</H3>
					<P>${value}</P>
				</InputRow>
			);
		}

		return results;
	};

	return (
		<Container
			style={{
				padding: '0',
			}}>
			<GameStrip>
				<span>Server: {servername}</span>
				<span style={{ fontWeight: '700' }}>{username}'s Dashboard</span>
				<span>Round {roundCounter}</span>
			</GameStrip>

			{career === false ? (
				<SetupCard>
					<CardHeading>
						<HeadingImg src={Career}></HeadingImg>
						<H2>Choose a Career</H2>
					</CardHeading>
					<ChooseCareer username={username}></ChooseCareer>
					<PrimaryButton onClick={(e) => setCareer(true)}>Next</PrimaryButton>
				</SetupCard>
			) : budget === false ? (
				<SetupCard>
					<CardHeading>
						<HeadingImg src={Budget}></HeadingImg>
						<H2>Set a Budget</H2>
					</CardHeading>
					<SetBudget username={username}></SetBudget>
					<PrimaryButton onClick={(e) => setBudget(true)}>Next</PrimaryButton>
				</SetupCard>
			) : goal === false ? (
				<SetupCard>
					<SetFinancialGoal username={username}></SetFinancialGoal>
					<PrimaryButton onClick={(e) => setGoal(true)}>Next</PrimaryButton>
				</SetupCard>
			) : (
				<Grid>
					<DashboardItem>
						<CareerCard>
							<CardHeading>
								<HeadingImg src={Career}></HeadingImg>
								<H2>My Career</H2>
							</CardHeading>
							<div>
								<H3>{myCareer}</H3>
								<P className="dollar">{mySalary} per month</P>
							</div>
						</CareerCard>
						<DashboardCard>
							<CardHeading>
								<HeadingImg src={Bank}></HeadingImg>
								<H2>My Bank Accounts</H2>
							</CardHeading>
							<div>
								<InputRow>
									<H3>Chequing</H3>
									<P className="dollar">{myChequing}</P>
								</InputRow>
								<InputRow>
									<H3>Savings</H3>
									<P className="dollar">{mySavings}</P>
								</InputRow>
								<H2 style={{ textAlign: 'right' }}>
									Total: ${+mySavings + +myChequing}
								</H2>
							</div>
						</DashboardCard>
						<DashboardCard>
							<CardHeading>
								<HeadingImg src={Goal}></HeadingImg>
								<H2>My Goal</H2>
							</CardHeading>
							<div>
								<GoalRow>
									<H4>{myGoal}</H4>
								</GoalRow>
								<GoalRow
									style={
										mySavings >= myFirstCheckpoint
											? { backgroundColor: '#FEF9E6' }
											: null
									}>
									<CheckContainer>
										{mySavings >= myFirstCheckpoint ? (
											<StyledCheckImg src={CheckImg}></StyledCheckImg>
										) : null}
									</CheckContainer>
									<H4 className="dollar">{myFirstCheckpoint}</H4>
								</GoalRow>
								<GoalRow
									style={
										mySavings >= mySecondCheckpoint
											? { backgroundColor: '#FEF9E6' }
											: null
									}>
									<CheckContainer>
										{mySavings >= mySecondCheckpoint ? (
											<StyledCheckImg src={CheckImg}></StyledCheckImg>
										) : null}
									</CheckContainer>
									<H4 className="dollar">{mySecondCheckpoint}</H4>
								</GoalRow>
								<GoalRow
									style={
										mySavings >= myGoalCheckpoint
											? { backgroundColor: '#FEF9E6' }
											: null
									}>
									<CheckContainer>
										{mySavings >= myGoalCheckpoint ? (
											<StyledCheckImg src={CheckImg}></StyledCheckImg>
										) : null}
									</CheckContainer>
									<H4 className="dollar">{myGoalCheckpoint}</H4>
								</GoalRow>
							</div>
						</DashboardCard>
					</DashboardItem>
					<DashboardItem>
						<DashboardCard style={{ height: '50%' }}>
							<CardHeading>
								<HeadingImg src={Budget}></HeadingImg>
								<H2>My Budget</H2>
							</CardHeading>
							<div>
								<BudgetSummary></BudgetSummary>
							</div>
						</DashboardCard>
						<DashboardCard>
							<CardHeading>
								<HeadingImg src={Stocks}></HeadingImg>
								<H2>My Stocks</H2>
							</CardHeading>
						</DashboardCard>
					</DashboardItem>
					<DashboardItem>
						<DashboardCard>
							<CardHeading>
								<HeadingImg src={Calendar}></HeadingImg>
								<H2>Monthly Finance Tracker</H2>
							</CardHeading>
							<FinancialTracker
								username={username}
								roundCount={roundCounter}
								salary={mySalary}></FinancialTracker>
						</DashboardCard>
					</DashboardItem>
				</Grid>
			)}
		</Container>
	);
};

export default Player;
