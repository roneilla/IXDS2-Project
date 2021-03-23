import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FlexBetween } from './global';
import GlossarySearch from './../components/GlossarySearch';
import GuidebookModal from './../components/GuidebookModal';
import Glyph from './../assets/glyph.svg';

const Nav = styled.nav`
	width: 100%;
	padding: 1rem 2rem;
	background-color: #f9f1ea;
	display: flex;
	justify-content: space-between;
`;

const NavMenu = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 50%;
`;

const NavItem = styled.li`
	list-style-type: none;
`;

const StyledLink = styled(Link)`
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
			<Nav>
				<StyledLink to="/">
					<StyledImg src={Glyph} alt="Logo"></StyledImg>
				</StyledLink>

				<NavMenu>
					<NavItem>
						<StyledLink to="/">Play</StyledLink>
					</NavItem>
					<NavItem>
						<StyledLink to="/guidebook">Guidebook</StyledLink>
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
						<GuidebookModal></GuidebookModal>
					</span>
				</FlexBetween>
			</Nav>
		);
	}
};

export default NavBar;
