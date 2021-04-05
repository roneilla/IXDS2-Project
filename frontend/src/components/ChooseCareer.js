import React, { useState } from 'react';
import { ColumnFlex, H3, P, PrimaryButton, Select } from '../shared/global';
import axios from 'axios';
import careerData from './../careerData';
import styled from 'styled-components';

const CareerCard = styled.div`
	border-radius: 5px;
	background-color: #4f73b6;
	color: #fff;
	padding: 1rem;
	margin: 1rem 0;
`;

const ChooseCareer = (props) => {
	const username = props.username;
	const [chosenCareer, setChosenCareer] = useState();
	const [chosenSalary, setChosenSalary] = useState();

	const setOptions = (data) => {
		setChosenCareer(data.careerName);
		setChosenSalary(data.startingSalary);
	};

	const selectOptions = (value) => {
		careerData
			.filter(({ careerName }) => careerName === value)
			.map((data) => setOptions(data));
	};

	const pickCareer = (e) => {
		e.preventDefault();

		const careerInfo = {
			careerName: chosenCareer,
			startingSalary: chosenSalary,
		};

		axios
			.post(
				'https://the-price-of-life.herokuapp.com/users/setCareer/' + username,
				careerInfo
			)
			.then((res) => {
				console.log(res.data);
				alert('career added');
			});
	};

	return (
		<ColumnFlex>
			<Select
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
			</Select>

			{chosenCareer != null ? (
				<CareerCard>
					<H3>{chosenCareer}</H3>
					<P className="dollar">{chosenSalary}</P>
				</CareerCard>
			) : null}

			<PrimaryButton style={{ margin: '1rem 0' }} onClick={pickCareer}>
				Pick Career
			</PrimaryButton>
		</ColumnFlex>
	);
};

export default ChooseCareer;
