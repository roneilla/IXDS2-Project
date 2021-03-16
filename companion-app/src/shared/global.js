import styled from 'styled-components';

export const Container = styled.div`
	max-width: 1920px;
	margin: 0 auto;
	padding: 1rem;
`;

export const FlexBetween = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const P = styled.p`
	font-size: 1rem;
`;

export const ClearButton = styled.button`
	background-color: #ccc;
	text-decoration: underline;
	appearance: none;
	color: #000;
	font-size: 1rem;
	border: 0;
	padding: 0.5rem 1rem;
	height: 100%;
`;

export const PrimaryButton = styled.button`
	background-color: #000;
	appearance: none;
	color: #fff;
	font-size: 1rem;
	border: 0;
	padding: 0.5rem 1rem;
	margin: 1rem;
`;
