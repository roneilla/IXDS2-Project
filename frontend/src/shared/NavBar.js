import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FlexBetween, PrimaryButton } from './global';
import GlossarySearch from './../components/GlossarySearch';
import Glyph from './../assets/Glyph.png';

const Nav = styled.nav`
	width: 100%;
	padding: 1rem 2rem;
	background-color: transparent;
	display: flex;
	justify-content: space-between;
`;

const NavMenu = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 40%;
`;

const NavItem = styled.li`
	list-style-type: none;
`;

const StyledLink = styled(Link)`
	color: #000;
	text-decoration: none;
`;

const StyledA = styled.a`
	color: #000;
	text-decoration: none;
`;

const StyledImg = styled.img`
	&:hover {
		transform: translateX(360deg);
	}
`;

const NavBar = () => {
	const location = useLocation();

	if (location.pathname !== '/player' && location.pathname !== '/gamemaster') {
		return (
			<Nav
				style={
					location.pathname === '/' ? { backgroundColor: '#f0c418' } : null
				}>
				<StyledLink to="/">
					<StyledImg src={Glyph} alt="Logo"></StyledImg>
				</StyledLink>

				<NavMenu>
					<NavItem>
						<StyledA
							rel="noreferrer"
							href="https://drive.google.com/file/d/1c6LgapP6Zcp1UBV8EuF6e69i16JZXo2N/view"
							target="_blank">
							Guidebook
						</StyledA>
					</NavItem>
					<NavItem>
						<StyledLink to="/glossary">Glossary</StyledLink>
					</NavItem>
					<NavItem>
						<StyledLink to="/about">About</StyledLink>
					</NavItem>
					<NavItem>
						<StyledLink to="/help">Help</StyledLink>
					</NavItem>
					<NavItem>
						<StyledLink to="/game">
							<PrimaryButton>Play</PrimaryButton>
						</StyledLink>
					</NavItem>
				</NavMenu>
			</Nav>
		);
	} else {
		return (
			<Nav>
				<FlexBetween>
					<span style={{ width: '25%' }}>
						<StyledLink to="/">
							<StyledImg src={Glyph} alt="Logo"></StyledImg>
						</StyledLink>
					</span>

					<GlossarySearch></GlossarySearch>
					<span style={{ width: '25%', textAlign: 'right' }}>
						<PrimaryButton>
							<StyledA
								style={{ color: 'white' }}
								rel="noreferrer"
								href="https://drive.google.com/file/d/1c6LgapP6Zcp1UBV8EuF6e69i16JZXo2N/view"
								target="_blank">
								View Guidebook
							</StyledA>
						</PrimaryButton>
					</span>
				</FlexBetween>
			</Nav>
		);
	}
};

export default NavBar;
