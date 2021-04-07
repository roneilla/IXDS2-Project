import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
	PrimaryButton,
	CardHeading,
	Container,
	H2,
	HeadingImg,
	H3,
	H1,
	P,
	H4,
	TextInput,
	ColumnFlex,
	YellowButton,
	YellowButtonSmall,
	PrimaryButtonOutline,
	SmallOutlineButton,
} from '../shared/global';
import ChooseCareer from './../components/ChooseCareer';
import { GrFormClose } from 'react-icons/gr';

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
	max-height: calc(100vh - 75px - 50px - 2rem);
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

const TransferModal = styled.div`
	background-color: #fff;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: #ccc solid 1px;
	margin: 1rem auto;
	width: 100%;
	max-width: 600px;
	padding: 1rem;
	border-radius: 5px;
	text-align: left;
	box-shadow: 5px 10px 18px #ccc;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;

const CloseButton = styled.button`
	background-color: transparent;
	appearance: none;
	border: 0;
	font-size: 2rem;
	line-height: 2rem;
`;

const StockContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	border: 1px #eee solid;
	border-radius: 5px;
	padding: 0.5rem;
	margin: 0.25rem 0;
	align-items: center;
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

	const [myFirstCheckpoint, setMyFirstCheckpoint] = useState(0);
	const [mySecondCheckpoint, setMySecondCheckpoint] = useState(0);
	const [myGoalCheckpoint, setMyGoalCheckpoint] = useState(0);

	const [myBudget, setMyBudget] = useState([]);
	const [myStocks, setMyStocks] = useState([
		{
			stockName: '',
			purchasePrice: 0,
			quantity: 0,
		},
	]);

	const [budgetTotal, setBudgetTotal] = useState(0);

	const [chequingWithdraw, setChequingWithdraw] = useState(0);
	const [savingsWithdraw, setSavingsWithdraw] = useState(0);
	const [withdrawSavings, setWithdrawSavings] = useState(false);
	const [withdrawChequing, setWithdrawChequing] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [showStockPurchaseModal, setShowStockPurchaseModal] = useState(false);
	const [showStockSellModal, setShowStockSellModal] = useState(false);

	const [purchasePrice, setPurchasePrice] = useState(0);
	const [stockName, setStockName] = useState();
	const [quantity, setQuantity] = useState(0);
	const [sellQuantity, setSellQuantity] = useState(0);
	const [sellStockName, setSellStockName] = useState();

	const MINUTE_MS = 500;

	useEffect(() => {
		const { username, servername } = queryString.parse(location.search);

		setUsername(username);
		setServername(servername);
		// currentUsername = username;
		// currentServerName = servername;
	}, [location.search]);

	useEffect(() => {
		axios.get('http://localhost:3001/users/' + username).then((res) => {
			if (res.data.career != null) {
				setCareer(true);
				setMySalary(res.data.salary);
			}
			if (res.data.budget != null) {
				setBudget(true);
				setBudgetTotal(res.data.budgetTotal);
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
	}, [username]);

	useEffect(() => {
		const interval = setInterval(() => {
			axios
				.get('http://localhost:3001/serverRoom/currentRound/' + servername)
				.then((res) => {
					setRoundCounter(res.data.roundcounter);
				});

			axios.get('http://localhost:3001/users/' + username).then((res) => {
				setMyBudget(res.data.budget);
				setMySavings(res.data.savings);
				setMyCareer(res.data.career);
				setMyChequing(res.data.chequing);
				setMySavings(res.data.savings);
				setMySalary(res.data.salary);
				// setMyGoal(res.data.financialGoal);
				// setMyFirstCheckpoint(res.data.financialCheckpoints.first);
				// setMySecondCheckpoint(res.data.financialCheckpoints.second);
				// setMyGoalCheckpoint(res.data.financialCheckpoints.goal);
			});

			axios
				.get('http://localhost:3001/users/viewStocks/' + username)
				.then((res) => {
					setMyStocks(res.data);
				});
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, [servername, username]);

	const BudgetSummary = () => {
		const summary = Object.entries(myBudget).map(([key, value]) => (
			<InputRow key={key}>
				<H3 style={{ textTransform: 'capitalize' }}>{key}</H3>
				<P className="dollar">{value}</P>
			</InputRow>
		));
		return summary;
	};

	const transferMoney = (e) => {
		e.preventDefault();

		const bankInfo = {
			savingsWithdraw: savingsWithdraw,
			chequingWithdraw: chequingWithdraw,
		};

		axios
			.post('http://localhost:3001/users/transferMoney/' + username, bankInfo)
			.then((res) => {
				console.log('transferred');
			});
	};

	const transferMoneyModal = (
		<TransferModal>
			<Header>
				<H2>Transfer Money</H2>
				<CloseButton>
					<GrFormClose
						onClick={() => {
							setShowModal(false);
							setWithdrawSavings(false);
							setWithdrawChequing(false);
							setSavingsWithdraw(0);
							setChequingWithdraw(0);
						}}
					/>
				</CloseButton>
			</Header>

			{withdrawSavings === true ? (
				<ColumnFlex>
					<TextInput
						placeholder="Savings Withdrawal"
						onChange={(e) => setSavingsWithdraw(e.target.value)}></TextInput>
					<PrimaryButton onClick={transferMoney}>Transfer</PrimaryButton>
				</ColumnFlex>
			) : withdrawChequing === true ? (
				<ColumnFlex>
					<TextInput
						placeholder="Chequing Withdrawal"
						onChange={(e) => setChequingWithdraw(e.target.value)}></TextInput>
					<PrimaryButton onClick={transferMoney}>Transfer</PrimaryButton>
				</ColumnFlex>
			) : (
				<ColumnFlex style={{ margin: '2rem 0' }}>
					<P style={{ marginBottom: '2rem' }}>What would you like to do?</P>
					<PrimaryButton
						onClick={(e) => {
							setWithdrawSavings(true);
							setWithdrawChequing(false);
						}}>
						Move money into Chequing
					</PrimaryButton>
					<PrimaryButton
						onClick={(e) => {
							setWithdrawSavings(false);
							setWithdrawChequing(true);
						}}>
						Move money into Savings
					</PrimaryButton>
				</ColumnFlex>
			)}
		</TransferModal>
	);

	const purchaseStock = (e) => {
		e.preventDefault();
		const stockInfo = {
			stockName: stockName,
			purchasePrice: purchasePrice,
			quantity: quantity,
		};

		console.log(myStocks);

		axios
			.post('http://localhost:3001/users/purchaseStock/' + username, stockInfo)
			.then((res) => {
				console.log('Purchased!');
			});

		setStockName('');
		setPurchasePrice(0);
		setQuantity(0);

		setShowStockPurchaseModal(false);
	};

	const StockPurchaseModal = (
		<TransferModal style={{ maxWidth: '700px' }}>
			<Header>
				<H2>Purchase Stock</H2>
				<CloseButton>
					<GrFormClose
						onClick={() => {
							setShowStockPurchaseModal(false);
						}}
					/>
				</CloseButton>
			</Header>

			<InputRow>
				<TextInput
					placeholder="Stock Name"
					onChange={(e) => setStockName(e.target.value)}></TextInput>
				<TextInput
					type="number"
					placeholder="Stock Price"
					onChange={(e) => setPurchasePrice(e.target.value)}></TextInput>
				<TextInput
					type="number"
					placeholder="Quantity"
					onChange={(e) => setQuantity(e.target.value)}></TextInput>
			</InputRow>

			<PrimaryButton style={{ float: 'right' }} onClick={purchaseStock}>
				Purchase
			</PrimaryButton>
		</TransferModal>
	);

	const sellStocks = (e) => {
		e.preventDefault();

		const sellInfo = {
			stockName: sellStockName,
			quantity: sellQuantity,
		};
		axios
			.post('http://localhost:3001/users/sellStock/' + username, sellInfo)
			.then((res) => {
				console.log('Sold!');
			});
	};

	const StockSellModal = (
		<TransferModal style={{ width: '400px' }}>
			<Header>
				<H2>Sell this Stock</H2>
				<CloseButton>
					<GrFormClose
						onClick={() => {
							setShowStockSellModal(false);
						}}
					/>
				</CloseButton>
			</Header>
			<P>How many stocks would you like to sell?</P>
			<TextInput
				type="number"
				style={{ width: '100px' }}
				placeholder="Quantity"
				onChange={(e) => setSellQuantity(e.target.value)}></TextInput>
			<PrimaryButton onClick={sellStocks}>Sell</PrimaryButton>
		</TransferModal>
	);

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
					<CardHeading>
						<HeadingImg src={Goal}></HeadingImg>
						<H2>Set a Goal</H2>
					</CardHeading>
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
								<SmallOutlineButton
									style={{ marginLeft: 'auto' }}
									onClick={(e) => {
										setShowModal(true);
									}}>
									Transfer
								</SmallOutlineButton>
							</CardHeading>
							{showModal === true ? transferMoneyModal : null}
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
							<BudgetSummary></BudgetSummary>
						</DashboardCard>
						<DashboardCard style={{ height: '50%' }}>
							<CardHeading>
								<HeadingImg src={Stocks}></HeadingImg>
								<H2>My Stocks</H2>
								<SmallOutlineButton
									style={{ marginLeft: 'auto' }}
									onClick={(e) => setShowStockPurchaseModal(true)}>
									Purchase Stock
								</SmallOutlineButton>
							</CardHeading>
							{showStockPurchaseModal === true ? StockPurchaseModal : null}
							{showStockSellModal === true ? StockSellModal : null}
							<div>
								{myStocks
									.filter((props) => props.quantity > 0)
									.map((data, index) => (
										<StockContainer key={index}>
											<H4 style={{ gridColumn: 'span 2' }}>{data.stockName}</H4>
											<P style={{ gridColumn: 'span 2' }} className="dollar">
												{data.purchasePrice}
											</P>
											<P style={{ gridColumn: 'span 1' }}>{data.quantity}</P>
											<YellowButtonSmall
												style={{ gridColumn: 'span 1' }}
												onClick={(e) => {
													setShowStockSellModal(true);
													setSellStockName(data.stockName);
												}}>
												Sell
											</YellowButtonSmall>
										</StockContainer>
									))}
							</div>
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
								salary={mySalary}
								budget={budgetTotal}></FinancialTracker>
						</DashboardCard>
					</DashboardItem>
				</Grid>
			)}
		</Container>
	);
};

export default Player;
