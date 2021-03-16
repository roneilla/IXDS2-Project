import React, { useState } from 'react';
import styled from 'styled-components';
import glossary from './../glossary';

import { Container } from './../shared/global';

const StyledSearchBar = styled.input`
	font-size: 1rem;
	padding: 1rem;
	border: #ccc solid 1px;
	border-radius: 5px;
	position: relative;
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
`;

const Header = styled.div`
	width: 100%;
	text-align: center;
	margin-bottom: 1rem;
	background-color: #ccc;
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
	margin: 1rem 0;
	border: 1px solid #ccc;
	border-radius: 5px;
`;

const GlossaryPage = (props) => {
	const [filterTerm, setFilterTerm] = useState('');

	const allGlossaryItems = glossary.map((data) => (
		<GlossaryCard key={data.term}>
			<h1>{data.term}</h1>
			<p>{data.definition}</p>
		</GlossaryCard>
	));

	const glossaryItem = glossary
		.filter(({ term }) => term === filterTerm.toLowerCase())
		.map((data) => (
			<GlossaryCard key={data.term}>
				<h1>{data.term}</h1>
				<p>{data.definition}</p>
			</GlossaryCard>
		));
	return (
		<>
			<Header>
				<h1 style={{ margin: '1rem 0' }}>Glossary</h1>
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
