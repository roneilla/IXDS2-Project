import React from 'react';
import styled from 'styled-components';
import { Container, Subtitle, PrimaryButtonLarge } from '../shared/global';
import { Link } from 'react-router-dom';
import Logo from './../assets/logo.svg';

const StyledImg = styled.img`
	margin: 2rem;
	height: 200px;
	object-fit: contain;
	width: auto;
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
				<Link to="/game">
					<PrimaryButtonLarge>Play</PrimaryButtonLarge>
				</Link>
			</StyledContainer>
		</div>
	);
};

export default Home;
