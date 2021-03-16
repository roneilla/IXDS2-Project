import React from 'react';
import styled from 'styled-components';
import { Container } from './../shared/global';
import RoundTracker from './../components/RoundTracker';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 1rem;
`;

const DashboardItem = styled.div`
	grid-column: span 1;
	padding: 1rem;
	border: #ccc 1px solid;
	border-radius: 5px;
	margin: 1rem 0;
`;

const Game = () => {
	return (
		<Container style={{ padding: '0 1rem 0 0' }}>
			<Grid>
				<RoundTracker></RoundTracker>
				<DashboardItem>2</DashboardItem>
				<DashboardItem>3</DashboardItem>
			</Grid>
		</Container>
	);
};

export default Game;
