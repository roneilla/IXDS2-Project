import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import financialGoalData from './../financialGoalData';
import { PrimaryButton, TextInput, H4, ColumnFlex, P } from '../shared/global';
import Toast from './../shared/Toast';

const GoalRow = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px #eee solid;
	border-radius: 5px;
	padding: 0.5rem 1rem;
	margin: 0.25rem 0;
	background-color: #fff;
	width: 200px;
`;

const SetFinancialGoal = (props) => {
	const username = props.username;
	const [toast, setToast] = useState(0);

	const [financialGoal, setFinancialGoal] = useState();
	const [firstCheckpoint, setFirstCheckpoint] = useState(0);
	const [secondCheckpoint, setSecondCheckpoint] = useState(0);
	const [goalCheckpoint, setGoalCheckpoint] = useState(0);

	const sendFindGoal = (data) => {
		setFinancialGoal(data.goal);
		setFirstCheckpoint(data.firstCheckpoint);
		setSecondCheckpoint(data.secondCheckpoint);
		setGoalCheckpoint(data.goalCheckpoint);
	};

	const findGoal = (value) => {
		financialGoalData
			.filter(({ code }) => code === value)
			.map((data) => sendFindGoal(data));
	};

	const setGoal = (e) => {
		e.preventDefault();

		const goalInfo = {
			financialGoal: financialGoal,
			firstCheckpoint: firstCheckpoint,
			secondCheckpoint: secondCheckpoint,
			goalCheckpoint: goalCheckpoint,
		};

		axios
			.post(
				'http://localhost:3001/users/setFinancialGoal/' + username,
				goalInfo
			)
			.then((res) => {
				setToast(1);
			});
	};

	return (
		<ColumnFlex>
			<Toast
				color="#F0C418"
				bgColor="#FEF9E6"
				text="Goal added!"
				show={toast}></Toast>
			<P>Type the code exactly as you see it</P>
			<TextInput
				type="text"
				onChange={(e) => findGoal(e.target.value)}></TextInput>

			<span style={{ margin: '2rem 0' }}>
				<GoalRow style={{ backgroundColor: '#FEF9E6' }}>
					<H4>{financialGoal}</H4>
					<P className="dollar">{goalCheckpoint}</P>
				</GoalRow>
				<GoalRow>
					<H4>Checkpoint 1</H4>
					<P className="dollar">{firstCheckpoint}</P>
				</GoalRow>
				<GoalRow>
					<H4>Checkpoint 2</H4>
					<P className="dollar">{secondCheckpoint}</P>
				</GoalRow>
			</span>

			<PrimaryButton onClick={setGoal}>Set Goal</PrimaryButton>
		</ColumnFlex>
	);
};

export default SetFinancialGoal;
