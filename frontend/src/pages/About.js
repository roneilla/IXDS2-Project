import React from 'react';
import styled from 'styled-components';
import { Container, P } from './../shared/global';
import Logo from './../assets/logo.svg';
import About1 from './../assets/Photos/About-1.png';
import About2 from './../assets/Photos/About-2.png';
import About3 from './../assets/Photos/About-3.png';

const Header = styled.div`
	padding: 2rem 0 5rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
	margin: 0 auto;
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

const StyledLogo = styled.img`
	width: 100%;
	margin: 0 auto 3rem auto;
	text-align: center;
`;

const About = () => {
	return (
		<Container>
			<Header>
				<StyledLogo alt="logo" src={Logo}></StyledLogo>
				<P>
					An educational board game that teaching young adults the basics of
					personal finance, strategy, and planning. While making financial
					mistakes in a risk-free environment, users will learn key lessons and
					be able to apply and practice their new knowledge and skills. After
					creating a financial plan, young adults will be challenged to overcome
					hypothetical obstacles inspired by real world events that involve
					being financially prepared through the ups and downs of the economy.
				</P>
			</Header>
			<StyledImg src={About1} alt="Photo of all game components"></StyledImg>
			<StyledImg
				src={About2}
				alt="Close up of board during gameplay"></StyledImg>
			<StyledImg src={About3} alt="Close up of game pieces"></StyledImg>
		</Container>
	);
};

export default About;
