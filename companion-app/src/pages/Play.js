import React from 'react';
import styled from 'styled-components';
import { Container } from './../shared/global';
import { Link } from 'react-router-dom';

const Button = styled.button`
	background-color: #000;
	appearance: none;
	color: #fff;
	padding: 1rem 2rem;
	font-size: 1.25rem;
	border: 0;
	border-radius: 5px;
	margin: 2rem 0;
`;

const StyledImg = styled.img`
	margin: 2rem;
`;

const StyledContainer = styled(Container)`
	text-align: center;
	height: 100vh;
`;

const HeaderText = styled.p`
	font-size: 2rem;
	padding: 2rem;
	width: 50%;
	margin: 0 auto;
`;

const StyledLink = styled(Link)`
	color: #fff;
	text-decoration: none;
`;

const Play = () => {
	return (
		<div>
			<StyledContainer>
				<StyledImg alt="Logo"></StyledImg>
				<HeaderText>
					An educational board game that teaching young adults the basics of
					personal finance, strategy, and planning.
				</HeaderText>
				<Button>
					<StyledLink to="/game">Start New Game</StyledLink>
				</Button>
			</StyledContainer>
		</div>
	);
};

export default Play;
