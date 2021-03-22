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
	align-items: center;
`;

export const P = styled.p`
	font-family: freight-macro-pro, serif;
	font-size: 1rem;
`;

export const PrimaryButton = styled.button`
	background-color: #333;
	appearance: none;
	color: #fff;
	font-size: 1rem;
	border: 0;
	padding: 0.5rem 1rem;
`;

export const H1 = styled.h1`
	font-family: ohno-blazeface, sans-serif;
	font-size: 4rem;
	font-weight: 700;
`;

export const H2 = styled.h2`
	font-family: freight-macro-pro, serif;
	font-size: 3rem;
	font-weight: 700;
`;

export const H3 = styled.h3`
	font-family: freight-macro-pro, serif;
	font-size: 1.5rem;
	font-weight: 700;
`;

export const Subtitle = styled.p`
	font-family: freight-macro-pro, serif;
	font-size: 1.5rem;
`;
