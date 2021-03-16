import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
	width: 100%;
	padding: 1rem 2rem;
	background-color: #eee;
`;

const Footer = () => {
	return (
		<StyledFooter>
			<p>Created by Roneilla Bumanlag &copy; 2021</p>
		</StyledFooter>
	);
};

export default Footer;
