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
	flex-direction: row;
`;

export const ColumnFlex = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const H1 = styled.h1`
	font-family: freight-macro-pro, serif;
	font-size: 2rem;
	font-weight: 600;
`;

export const H2 = styled.h2`
	font-family: freight-macro-pro, serif;
	font-size: 1.5rem;
	font-weight: 600;
`;

export const H3 = styled.h3`
	font-family: freight-macro-pro, serif;
	font-size: 1.25rem;
	font-weight: 600;
`;

export const H4 = styled.h3`
	font-family: freight-macro-pro, serif;
	font-size: 1rem;
	font-weight: 600;
`;

export const P = styled.p`
	font-family: freight-macro-pro, serif;
	font-size: 1rem;
`;

export const LargeP = styled.p`
	font-family: freight-macro-pro, serif;
	font-size: 1.25rem;
`;

export const SmallP = styled.p`
	font-family: freight-macro-pro, serif;
	font-size: 0.75rem;
`;

export const Subtitle = styled.p`
	font-family: freight-macro-pro, serif;
	font-size: 1.5rem;
`;

export const Button = styled.button`
	appearance: none;
	border: 0;
	border-radius: 5px;
	font-size: 1rem;
	padding: 0.5rem 1rem;
	letter-spacing: 0.5px;
	margin: 0.25rem;
	font-weight: 600;
	&:hover {
		cursor: pointer;
	}
`;

export const SmallButton = styled(Button)`
	font-size: 0.75rem;
	padding: 0.25rem 0.5rem;
`;

export const OutlineButton = styled(Button)`
	border: 2px solid #111;
	background: transparent;
`;

export const SmallOutlineButton = styled(SmallButton)`
	border: 2px solid #111;
	background: transparent;
`;

export const LargeButton = styled(Button)`
	font-size: 1.5rem;
	padding: 0.75rem 1.5rem;
`;

export const PrimaryButton = styled(Button)`
	background-color: #111;
	color: #fff;
`;

export const PrimaryButtonLarge = styled(LargeButton)`
	background-color: #111;
	color: #fff;
`;

export const YellowButtonLarge = styled(LargeButton)`
	background-color: #f0c418;
	color: #fff;
`;

export const YellowButton = styled(Button)`
	background-color: #f0c418;
	color: #fff;
`;

export const YellowButtonSmall = styled(SmallButton)`
	background-color: #f0c418;
	color: #fff;
`;

export const ClearButton = styled(Button)`
	color: #111;
	background-color: transparent;
`;

export const PrimaryButtonOutline = styled(OutlineButton)`
	color: '#111';
`;

export const SmallPrimaryButtonOutline = styled(SmallOutlineButton)`
	color: '#111';
`;

export const TextInput = styled.input`
	background-color: #fff;
	border: #eee 1px solid;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	width: 100%;
	max-width: 600px;
	font-size: 1rem;
	margin: 1rem;
`;

export const HeadingImg = styled.img`
	width: 50px;
	height: 50px;
	object-fit: contain;
	margin-right: 1rem;
`;

export const CardHeading = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

export const Select = styled.select`
	background-color: #fff;
	border: #eee 1px solid;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	width: 100%;
	max-width: 600px;
	font-size: 1rem;
	margin: 1rem;
`;
