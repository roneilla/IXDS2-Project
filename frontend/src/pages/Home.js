import React from 'react';
import styled from 'styled-components';
import { Container, Subtitle, PrimaryButtonLarge } from '../shared/global';
import { Link } from 'react-router-dom';
import HomeLogo from './../assets/Homepage/Logo.svg';
import Right from './../assets/Homepage/Right.svg';
import Left from './../assets/Homepage/Left.svg';

const StyledImg = styled.img`
	margin-top: 2rem;
	height: 400px;
	object-fit: contain;
	width: auto;
`;

const StyledContainer = styled(Container)`
	text-align: center;
	background-color: #f0c418;
	height: calc(100vh - 75px);
	background-image: url(${Left}), url(${Right});
	background-position: left bottom, right bottom;
	background-repeat: no-repeat;
	background-size: 40%;
`;

const HeaderText = styled.div`
	padding: 1rem;
	width: 30%;
	margin: 0 auto;
`;

const Home = () => {
	return (
		<div>
			<StyledContainer>
				<StyledImg alt="Logo" src={HomeLogo}></StyledImg>
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
