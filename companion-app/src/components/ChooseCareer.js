import React, { useState } from 'react';
import { Container } from '../shared/global';
import axios from 'axios';
import careerData from './../careerData';

const ChooseCareer = (props) => {
	const username = props.username;
	const [chosenCareer, setChosenCareer] = useState();
	const [chosenSalary, setChosenSalary] = useState();

	const selectOptions = (value) => {
		careerData
			.filter(({ careerName }) => careerName === value)
			.map((data) => {
				setChosenCareer(data.careerName);
				setChosenSalary(data.startingSalary);
			});
	};

	const pickCareer = (e) => {
		e.preventDefault();

		const careerInfo = {
			careerName: chosenCareer,
			startingSalary: chosenSalary,
		};

		axios
			.post('http://localhost:5000/users/setCareer/' + username, careerInfo)
			.then((res) => {
				console.log(res.data);
				alert('career added');
			});
	};

	return (
		<div>
			<select
				onChange={(e) => {
					selectOptions(e.target.value);
				}}
				defaultValue={`Select One`}>
				<option disabled>Select One</option>
				{careerData.map((data, index) => (
					<option key={index} value={data.careerName}>
						{data.careerName}
					</option>
				))}
			</select>

			<p>{chosenCareer}</p>

			<p>{chosenSalary}</p>

			<button onClick={pickCareer}>Pick Career</button>
		</div>
	);
};

export default ChooseCareer;
