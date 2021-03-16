import React from 'react';
import styled from 'styled-components';
import { Container } from './../shared/global';

const Header = styled.div`
	padding: 5rem 0;
`;

const StyledImg = styled.img`
	background-color: #ccc;
	width: 100%;
	object-fit: contain;
	min-width: 300px;
	max-width: 1000px;
	display: block;
	margin: 2rem auto;
`;

const About = () => {
	return (
		<Container>
			<Header>
				<img alt="logo"></img>
				<p>
					An educational board game that teaching young adults the basics of
					personal finance, strategy, and planning. While making financial
					mistakes in a risk-free environment, users will learn key lessons and
					be able to apply and practice their new knowledge and skills. After
					creating a financial plan, young adults will be challenged to overcome
					hypothetical obstacles inspired by real world events that involve
					being financially prepared through the ups and downs of the economy.
				</p>
			</Header>
			<StyledImg alt="Photo of all game components + tablet with the app open"></StyledImg>
			<StyledImg alt="Close up of board"></StyledImg>
			<StyledImg alt="Photos of pieces"></StyledImg>
			<StyledImg alt="Screenshot of app"></StyledImg>
		</Container>
	);
};

export default About;
