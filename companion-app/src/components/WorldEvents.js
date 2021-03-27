import React, { useEffect } from 'react';
import styled from 'styled-components';
import worldEventsData from '../worldEventsData';

const Container = styled.div`
	width: 100%;
	overflow: auto;
`;

const CurrentNewsContainer = styled.div`
	font-size: 4rem;
	transition: 2s;
`;

const EventCard = styled.div`
	width: 100%;
	border: #ccc 1px solid;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border-radius: 5px;
`;

const PastEventsContainer = styled.div`
	display: flex;
	flex-direction: column-reverse;
`;
let newWorldEventsData;

const shuffle = () => {
	let array = worldEventsData;

	// stackoverflow code
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	newWorldEventsData = array;
};

shuffle();

const WorldEvents = (props) => {
	// TODO: randomize order of world events

	return (
		<Container>
			<h1>World Events</h1>
			<h2>Latest</h2>
			{console.log(newWorldEventsData)}
			{props.roundCounter > 1
				? newWorldEventsData.map((data, index) =>
						index === props.roundCounter ? (
							<CurrentNewsContainer key={index}>
								{data.text}
							</CurrentNewsContainer>
						) : null
				  )
				: null}

			<h2>Past</h2>
			<PastEventsContainer>
				{props.roundCounter > 1
					? newWorldEventsData
							.slice(2, props.roundCounter)
							.map((data, index) => (
								<EventCard key={index}>{data.text}</EventCard>
							))
					: null}
			</PastEventsContainer>
		</Container>
	);
};

export default WorldEvents;
