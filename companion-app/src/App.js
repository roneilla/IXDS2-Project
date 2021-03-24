import {
	BrowserRouter as Router,
	Route,
	BrowserRouter,
} from 'react-router-dom';
import styled from 'styled-components';

import './App.css';

import ScrollToTop from './ScrollToTop';

import NavBar from './shared/NavBar';
import Footer from './shared/Footer';

import Home from './pages/Home';
import Gamemaster from './pages/Gamemaster';
import GlossaryPage from './pages/GlossaryPage';
import Guidebook from './pages/Guidebook';
import About from './pages/About';
import Help from './pages/Help';
import PlayAgain from './pages/PlayAgain';
import Player from './pages/Player';
import Game from './pages/Game';

const AppContainer = styled.div`
	display: grid;
	grid-template-rows: 75px 1fr 50px;
	height: 100vh;
	overflow: hidden;
`;

const DynamicContainer = styled.div`
	overflow: auto;
`;

const App = () => {
	return (
		<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
			<ScrollToTop />
			<AppContainer>
				<NavBar />
				<DynamicContainer>
					<Route exact path="/" component={Home} />
					<Route exact path="/game" component={Game} />
					<Route exact path="/gamemaster" component={Gamemaster} />
					<Route exact path="/player" component={Player} />
					<Route exact path="/glossary" component={GlossaryPage} />
					<Route exact path="/guidebook" component={Guidebook} />
					<Route exact path="/about" component={About} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/play-again" component={PlayAgain} />
				</DynamicContainer>
				<Footer />
			</AppContainer>
		</BrowserRouter>
	);
};

export default App;
