import React, { useState } from 'react';
import styled from 'styled-components';
import glossary from './../glossary';

import { Container, H1, H3, P } from './../shared/global';

const StyledSearchBar = styled.input`
	font-size: 1rem;
	padding: 1rem;
	border: #333 solid 1px;
	position: relative;
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
`;

const Header = styled.div`
	width: 100%;
	text-align: center;
	margin-bottom: 1rem;
	padding: 1rem 0;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const GlossaryCard = styled.div`
	width: 100%;
	max-width: 1000px;
	padding: 1rem;
	margin: 0.5rem 0;
	border: 1px solid #333;
	background-color: white;
`;

const GlossaryPage = (props) => {
	const [filterTerm, setFilterTerm] = useState('');

	const allGlossaryItems = glossary.map((data) => (
		<GlossaryCard key={data.term}>
			<H3>{data.term}</H3>
			<P>{data.definition}</P>
		</GlossaryCard>
	));

	const glossaryItem = glossary
		.filter(({ term }) => term === filterTerm.toLowerCase())
		.map((data) => (
			<GlossaryCard key={data.term}>
				<H3>{data.term}</H3>
				<P>{data.definition}</P>
			</GlossaryCard>
		));
	return (
		<>
			<Header>
				<H1 style={{ margin: '1rem 0' }}>Glossary</H1>
				<StyledSearchBar
					value={filterTerm}
					placeholder="Search for Terms"
					onChange={(e) => {
						setFilterTerm(e.target.value);
					}}></StyledSearchBar>
			</Header>

			<Container>
				<Wrapper>{filterTerm !== '' ? glossaryItem : allGlossaryItems}</Wrapper>
			</Container>
		</>
	);
};

export default GlossaryPage;
