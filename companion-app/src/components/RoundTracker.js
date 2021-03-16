import React, { useState } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from './../shared/global';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
	background-color: #444;
	color: #fff;
	width: 100%;
	padding: 1rem;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	min-height: 85vh;
`;

const RoundCounter = styled.h1`
	font-size: 5rem;
	margin: 2rem 0;
`;

const Modal = styled.div`
	background-color: #fff;
	position: absolute;
	left: 0;
	right: 0;
	border: #ccc solid 1px;
	margin: 1rem auto;
	width: 100%;
	max-width: 500px;
	padding: 1rem;
	border-radius: 5px;
	color: #000;
	text-align: center;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const RoundTracker = () => {
	const [roundCount, setRoundCount] = useState(0);
	const [openDialog, setOpenDialog] = useState(false);

	const history = useHistory();

	return (
		<Container>
			<RoundCounter> {roundCount}</RoundCounter>

			<PrimaryButton onClick={() => setRoundCount(roundCount + 1)}>
				Next Round
			</PrimaryButton>
			<PrimaryButton onClick={() => setOpenDialog(true)}>
				End Game
			</PrimaryButton>

			{openDialog === true ? (
				<Modal>
					<h2>Are you sure you want to end the game?</h2>
					<ButtonContainer>
						<PrimaryButton onClick={() => setOpenDialog(false)}>
							No, continue game
						</PrimaryButton>
						<PrimaryButton onClick={() => history.push('/play-again')}>
							Yes, end game
						</PrimaryButton>
					</ButtonContainer>
				</Modal>
			) : null}
		</Container>
	);
};

export default RoundTracker;
