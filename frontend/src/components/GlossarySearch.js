import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexBetween } from '../shared/global';
import glossary from './../glossary';
import { GrFormClose } from 'react-icons/gr';

const GlossaryContainer = styled.div`
	width: 50%;
	text-align: center;
`;

const Modal = styled.div`
	background-color: #fff;
	position: absolute;
	top: 100;
	left: 0;
	right: 0;
	border: #ccc solid 1px;
	margin: 1rem auto;
	width: 100%;
	max-width: 600px;
	padding: 1rem;
	border-radius: 5px;
`;

const StyledSearchBar = styled.input`
	font-size: 1rem;
	padding: 0.5rem 1rem;
	border: #ccc solid 1px;
	border-radius: 5px;
	position: relative;
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
	height: 100%;
`;

const Title = styled.div`
	font-size: 1rem;
`;

const CloseButton = styled.button`
	background-color: transparent;
	appearance: none;
	border: 0;
	font-size: 2rem;
	line-height: 2rem;
`;

const SearchTerm = styled.p`
	text-transform: capitalize;
	display: inline;
	font-size: 1em;
`;

const GlossaryItemContainer = styled.div`
	margin: 1rem 0;
`;

const GlossaryTerm = styled.h1`
	font-size: 2rem;
`;

const GlossarySearch = (props) => {
	const [filterTerm, setFilterTerm] = useState('');

	const glossaryItem = glossary
		.filter(({ term }) => term === filterTerm.toLowerCase())
		.map((data) => (
			<GlossaryItemContainer key={data.term}>
				<GlossaryTerm>{data.term}</GlossaryTerm>
				<p>{data.definition}</p>
			</GlossaryItemContainer>
		));
	return (
		<GlossaryContainer>
			<StyledSearchBar
				value={filterTerm}
				placeholder="Search for Terms"
				onChange={(e) => {
					setFilterTerm(e.target.value);
				}}></StyledSearchBar>
			{filterTerm !== '' ? (
				<Modal>
					<Title>
						<FlexBetween>
							<h1>
								Searching for <SearchTerm>{filterTerm}</SearchTerm>
							</h1>
							<CloseButton>
								<GrFormClose onClick={() => setFilterTerm('')} />
							</CloseButton>
						</FlexBetween>
					</Title>
					{glossaryItem}
				</Modal>
			) : null}
		</GlossaryContainer>
	);
};

export default GlossarySearch;
