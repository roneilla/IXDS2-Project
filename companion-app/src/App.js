import {
	BrowserRouter as Router,
	Route,
	BrowserRouter,
} from 'react-router-dom';

import './App.css';

import ScrollToTop from './ScrollToTop';

import NavBar from './shared/NavBar';
import Footer from './shared/Footer';

import Play from './pages/Play';
import Game from './pages/Game';
import GlossaryPage from './pages/GlossaryPage';
import Guidebook from './pages/Guidebook';
import About from './pages/About';
import Help from './pages/Help';
import PlayAgain from './pages/PlayAgain';

const App = () => {
	return (
		<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
			<ScrollToTop />
			<NavBar />
			<Route exact path="/" component={Play} />
			<Route exact path="/game" component={Game} />
			<Route exact path="/glossary" component={GlossaryPage} />
			<Route exact path="/guidebook" component={Guidebook} />
			<Route exact path="/about" component={About} />
			<Route exact path="/help" component={Help} />
			<Route exact path="/play-again" component={PlayAgain} />

			<Footer />
		</BrowserRouter>
	);
};

export default App;
