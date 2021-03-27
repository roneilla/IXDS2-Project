import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinancialTracker = (props) => {
	const username = props.username;
	const roundCount = props.roundCount;
	const [ready, setReady] = useState();

	// use effect, watch if round count changes
	useEffect(() => {
		console.log('hey its a new round');
	}, [roundCount]);

	const newPayday = (
		<div>
			<h1>new pay</h1>
			<div>
				<h2>expenses</h2>
				<input type="number" placeholder="Expense Here"></input>
			</div>
		</div>
	);

	return (
		<div>
			<h1>financial tracker</h1>
			{newPayday}
		</div>
	);
};

export default FinancialTracker;
