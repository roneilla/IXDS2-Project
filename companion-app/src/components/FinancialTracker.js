import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinancialTracker = (props) => {
	const username = props.username;
	const roundCount = props.roundCount;
	const [ready, setReady] = useState();

	const [salary, setSalary] = useState(5000);
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalLeft, setTotalLeft] = useState(0);

	const [incomeSource, setIncomeSource] = useState();
	const [incomeAmount, setIncomeAmount] = useState(0);

	let total;

	const [incomeEntries, setIncomeEntries] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const currentExpenses = [];

	// use effect, watch if round count changes
	useEffect(() => {
		console.log('hey its a new round');
	}, [roundCount]);

	const expenses = (
		<div>
			<h2>Enter all your expenses this month</h2>
			<div>
				<h2>expenses</h2>
				<input type="number" placeholder="Expense Here"></input>
			</div>
		</div>
	);

	const addIncome = () => {
		if (incomeAmount != null && incomeSource != null) {
			if (incomeAmount != '' && incomeSource != 'null') {
				setIncomeEntries([
					...incomeEntries,
					{
						source: incomeSource,
						amount: Number(incomeAmount),
					},
				]);

				total = incomeEntries.reduce((a, v) => (a = a + v.amount), 0);
				setTotalIncome(total);

				document.getElementById('incomeSource').value = '';
				document.getElementById('incomeAmount').value = '';

				setIncomeSource('');
				setIncomeAmount('');
			} else {
				alert('enter an amount');
			}
		} else {
			alert('enter an amount');
		}
	};

	const income = (
		<div>
			<h2>Enter all your income this month</h2>
			<span>
				<p>Salary</p>
				<p>{salary}</p>
			</span>
			<span>
				<p>
					additional expenses. type the source and amount and click the button
					to add it.
				</p>
				<span>
					<input
						id="incomeSource"
						type="text"
						placeholder="Income Source"
						onChange={(e) => setIncomeSource(e.target.value)}></input>
					<input
						id="incomeAmount"
						type="number"
						placeholder="Income Amount"
						onChange={(e) => setIncomeAmount(e.target.value)}></input>
					<button onClick={addIncome}>Add income</button>
				</span>
			</span>

			<div>
				All income:
				{incomeEntries.map((data, index) => (
					<div key={index}>
						<h3> {data.source}</h3>
						<p>{data.amount}</p>
					</div>
				))}
				<div>Total income: {totalIncome}</div>
			</div>

			<button>next</button>
		</div>
	);

	return (
		<div>
			<h1>new payday!</h1>
			{income}
		</div>
	);
};

export default FinancialTracker;
