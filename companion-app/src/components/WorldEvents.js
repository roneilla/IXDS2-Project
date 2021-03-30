import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CardHeading, HeadingImg, H1 } from '../shared/global';
import worldEventsData from '../worldEventsData';

import News from './../assets/Icon/News.png';

const Container = styled.div`
	width: 100%;
	overflow: auto;
`;

const CurrentNewsContainer = styled.div`
	font-size: 2rem;
	transition: 2s;
	background-color: #ecf1f7;
	color: #4f73b6;
	padding: 1rem;
	border-radius: 5px;
	margin: 1rem 0;
`;

const EventCard = styled.div`
	width: 100%;
	border: #eee 1px solid;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border-radius: 5px;
`;

const PastEventsContainer = styled.div`
	display: flex;
	flex-direction: column-reverse;
`;

const Label = styled.h3`
	color: #666;
	margin: 1rem 0;
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
			<CardHeading>
				<HeadingImg src={News}></HeadingImg>
				<H1>World Events</H1>
			</CardHeading>
			<Label>Latest</Label>
			{props.roundCounter > 1
				? newWorldEventsData.map((data, index) =>
						index === props.roundCounter ? (
							<CurrentNewsContainer key={index}>
								{data.text}
							</CurrentNewsContainer>
						) : null
				  )
				: null}

			<Label>Past</Label>
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
