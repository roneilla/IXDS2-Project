import React, { useState } from 'react';
import axios from 'axios';
import financialGoalData from './../financialGoalData';

const SetFinancialGoal = (props) => {
	const username = props.username;

	const [financialGoal, setFinancialGoal] = useState();
	const [firstCheckpoint, setFirstCheckpoint] = useState(0);
	const [secondCheckpoint, setSecondCheckpoint] = useState(0);

	const findGoal = (value) => {
		financialGoalData
			.filter(({ code }) => code === value)
			.map((data) => {
				setFinancialGoal(data.goal);
				setFirstCheckpoint(data.firstCheckpoint);
				setSecondCheckpoint(data.secondCheckpoint);
			});
	};

	const setGoal = (e) => {
		e.preventDefault();

		const goalInfo = {
			financialGoal: financialGoal,
			firstCheckpoint: firstCheckpoint,
			secondCheckpoint: secondCheckpoint,
		};

		axios
			.post(
				'http://localhost:5000/users/setFinancialGoal/' + username,
				goalInfo
			)
			.then((res) => {
				console.log(res.data);
				alert('goal added');
			});
	};

	return (
		<div>
			<h1>set financial goal</h1>
			<p>type the code exactly as you see it</p>
			<input type="text" onChange={(e) => findGoal(e.target.value)}></input>
			<button onClick={setGoal}>Set Goal</button>

			<h1>
				{financialGoal}
				<br></br>
				{firstCheckpoint}
				<br></br>
				{secondCheckpoint}
			</h1>
		</div>
	);
};

export default SetFinancialGoal;
