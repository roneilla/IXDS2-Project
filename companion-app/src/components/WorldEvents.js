import React from 'react';
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

const WorldEvents = (props) => {
	// TODO: randomize order of world events

	return (
		<Container>
			<h1>World Events</h1>
			<h2>Latest</h2>

			{worldEventsData.map((data, index) =>
				index === props.roundCounter - 1 ? (
					<CurrentNewsContainer key={index}>{data.text}</CurrentNewsContainer>
				) : null
			)}

			<h2>Past</h2>
			<PastEventsContainer>
				{worldEventsData.slice(0, props.roundCounter - 1).map((data, index) => (
					<EventCard key={index}>{data.text}</EventCard>
				))}
			</PastEventsContainer>
		</Container>
	);
};

export default WorldEvents;
