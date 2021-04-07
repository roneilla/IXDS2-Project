import React, { useState } from 'react';
import styled from 'styled-components';
import {
	ColumnFlex,
	FlexBetween,
	PrimaryButton,
	TextInput,
	H3,
	H4,
} from '../shared/global';
import axios from 'axios';
import Toast from './../shared/Toast';

const StyledTextInput = styled(TextInput)`
	width: 200px;
	font-size: 1rem;
	margin: 0.5rem 0.5rem 0.5rem 2rem;
	padding: 0.125rem 0.5rem;
`;

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	background-color: #fff;
	padding: 0.5rem;
	border-radius: 5px;
	margin: 1rem 0;

	& > * {
		margin: 0.2rem 0;
	}
`;

const InputRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px #eee solid;
	border-radius: 5px;
	padding: 0 1rem;
`;

const StyledTotal = styled.div`
	background-color: #fff;
	padding: 1rem;
	border-radius: 5px;
	margin: 1rem 0;
`;

const Summary = styled.div`
	margin-left: 3rem;
`;

const SetBudget = (props) => {
	const username = props.username;
	const [toast, setToast] = useState(0);

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
			.post(
				'https://the-price-of-life.herokuapp.com/users/setBudget/' + username,
				budgetInfo
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
				text="Budget added!"
				show={toast}></Toast>
			<FlexBetween>
				<StyledDiv>
					<InputRow>
						<H4>Housing</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Housing"
							placeholder="$"
							onChange={(e) => {
								setHousing(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Utilities</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Utilities"
							placeholder="$"
							onChange={(e) => {
								setUtilities(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Transportation</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Transportation"
							placeholder="$"
							onChange={(e) => {
								setTransportation(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Grocery</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Grocery"
							placeholder="$"
							onChange={(e) => {
								setGrocery(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Entertainment</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Entertainment"
							placeholder="$"
							onChange={(e) => {
								setEntertainment(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Restaurants</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Restaurants"
							placeholder="$"
							onChange={(e) => {
								setRestaurants(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Pets</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Pets"
							placeholder="$"
							onChange={(e) => {
								setPets(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Clothing</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Clothing"
							placeholder="$"
							onChange={(e) => {
								setClothing(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Health</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Health"
							placeholder="$"
							onChange={(e) => {
								setHealth(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Household</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Household"
							placeholder="$"
							onChange={(e) => {
								setHousehold(e.target.value);
							}}></StyledTextInput>
					</InputRow>
					<InputRow>
						<H4>Personal</H4>
						<StyledTextInput
							min="0"
							type="number"
							name="Personal"
							placeholder="$"
							onChange={(e) => {
								setPersonal(e.target.value);
							}}></StyledTextInput>
					</InputRow>
				</StyledDiv>

				<Summary>
					{/* <StyledP>housing: {housing}</StyledP>
					<StyledP>utilities: {utilities}</StyledP>
					<StyledP>transportation: {transportation}</StyledP>
					<StyledP>grocery: {grocery}</StyledP>
					<StyledP>entertainment: {entertainment}</StyledP>
					<StyledP>restaurants: {restaurants}</StyledP>
					<StyledP>pets: {pets}</StyledP>
					<StyledP>clothing: {clothing}</StyledP>
					<StyledP>health: {health}</StyledP>
					<StyledP>household: {household}</StyledP>
					<StyledP>personal: {personal}</StyledP> */}
					<StyledTotal>
						<H3> Total: ${total}</H3>
					</StyledTotal>
					<ColumnFlex>
						<PrimaryButton onClick={calculateTotal}>Calculate</PrimaryButton>
						<PrimaryButton onClick={setBudget}>Set Budget</PrimaryButton>
					</ColumnFlex>
				</Summary>
			</FlexBetween>
		</ColumnFlex>
	);
};

export default SetBudget;
