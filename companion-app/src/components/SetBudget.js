import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../shared/global';
import axios from 'axios';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	& > * {
		margin: 0.2rem 0;
	}
`;

const SetBudget = (props) => {
	const username = props.username;

	const [housing, setHousing] = useState(0);
	const [utilities, setUtilities] = useState(0);
	const [transportation, setTransportation] = useState(0);
	const [grocery, setGrocery] = useState(0);
	const [entertainment, setEntertainment] = useState(0);
	const [restaurants, setRestaurants] = useState(0);
	const [pets, setPets] = useState(0);
	const [clothing, setClothing] = useState(0);
	const [health, setHealth] = useState(0);
	const [household, setHousehold] = useState(0);
	const [personal, setPersonal] = useState(0);
	const [total, setTotal] = useState(0);

	const calculateTotal = () => {
		let answer;
		answer =
			Number(housing) +
			Number(utilities) +
			Number(transportation) +
			Number(grocery) +
			Number(entertainment) +
			Number(restaurants) +
			Number(pets) +
			Number(clothing) +
			Number(health) +
			Number(household) +
			Number(personal);

		setTotal(answer);
	};

	const setBudget = (e) => {
		e.preventDefault();

		const budgetInfo = {
			housing: housing,
			utilities: utilities,
			transportation: transportation,
			grocery: grocery,
			entertainment: entertainment,
			restaurants: restaurants,
			pets: pets,
			clothing: clothing,
			health: health,
			household: household,
			personal: personal,
			total: total,
		};

		axios
			.post('http://localhost:5000/users/setBudget/' + username, budgetInfo)
			.then((res) => {
				console.log(res.data);
				alert('budget added');
			});
	};

	return (
		<div>
			<h1>Budget</h1>
			<StyledDiv>
				<input
					min="0"
					type="number"
					name="Housing"
					placeholder="Housing"
					onChange={(e) => {
						setHousing(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Utilities"
					placeholder="Utilities"
					onChange={(e) => {
						setUtilities(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Transportation"
					placeholder="Transportation"
					onChange={(e) => {
						setTransportation(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Grocery"
					placeholder="Grocery"
					onChange={(e) => {
						setGrocery(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Entertainment"
					placeholder="Entertainment"
					onChange={(e) => {
						setEntertainment(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Restaurants"
					placeholder="Restaurants"
					onChange={(e) => {
						setRestaurants(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Pets"
					placeholder="Pets"
					onChange={(e) => {
						setPets(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Clothing"
					placeholder="Clothing"
					onChange={(e) => {
						setClothing(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Health"
					placeholder="Health"
					onChange={(e) => {
						setHealth(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Household"
					placeholder="Household"
					onChange={(e) => {
						setHousehold(e.target.value);
					}}></input>
				<input
					min="0"
					type="number"
					name="Personal"
					placeholder="Personal"
					onChange={(e) => {
						setPersonal(e.target.value);
					}}></input>
				<button onClick={calculateTotal}>Calculate</button>
			</StyledDiv>

			<div>
				<p>housing: {housing}</p>
				<p>utilities: {utilities}</p>
				<p>transportation: {transportation}</p>
				<p>grocery: {grocery}</p>
				<p>entertainment: {entertainment}</p>
				<p>restaurants: {restaurants}</p>
				<p>pets: {pets}</p>
				<p>clothing: {clothing}</p>
				<p>health: {health}</p>
				<p>household: {household}</p>
				<p>personal: {personal}</p>
				<h3> total: {total}</h3>
			</div>
			<div>
				<button onClick={setBudget}>Set Budget</button>
			</div>
		</div>
	);
};

export default SetBudget;
