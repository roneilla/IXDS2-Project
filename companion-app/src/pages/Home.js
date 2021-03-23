import React from 'react';
import styled from 'styled-components';
import { Container, Subtitle } from '../shared/global';
import { Link } from 'react-router-dom';
import Logo from './../assets/logo.svg';

const Button = styled.button`
	background-color: #333;
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
	width: 50%;
`;

const StyledContainer = styled(Container)`
	text-align: center;
`;

const HeaderText = styled.div`
	padding: 2rem;
	width: 50%;
	margin: 0 auto;
`;

const StyledLink = styled(Link)`
	color: #fff;
	text-decoration: none;
`;

const Home = () => {
	return (
		<div>
			<StyledContainer>
				<StyledImg alt="Logo" src={Logo}></StyledImg>
				<HeaderText>
					<Subtitle>
						An educational board game that teaching young adults the basics of
						personal finance, strategy, and planning.
					</Subtitle>
				</HeaderText>
				<Button>
					<StyledLink to="/game">Start New Game</StyledLink>
				</Button>
			</StyledContainer>
		</div>
	);
};

export default Home;
