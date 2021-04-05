import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import {
	FlexBetween,
	H3,
	P,
	PrimaryButton,
	SmallOutlineButton,
	TextInput,
} from './../shared/global';

const InputRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px #eee solid;
	border-radius: 5px;
	padding: 0.5rem;
	margin: 0.5rem 0;
`;

const CenteredRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const StyledTextInput = styled(TextInput)`
	width: 150px;
	font-size: 1rem;
	padding: 0.25rem;
	margin: 0 0.25rem;
`;

const FinancialTracker = (props) => {
	const username = props.username;
	const roundCount = props.roundCount;

	const [ready, setReady] = useState(false);

	const salary = props.salary;
	const [incomeDone, setIncomeDone] = useState(false);
	const [expenseDone, setExpenseDone] = useState(false);
	const [transferDone, setTransferDone] = useState(false);

	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);

	const [incomeSource, setIncomeSource] = useState();
	const [incomeAmount, setIncomeAmount] = useState(0);
	const [expenseSource, setExpenseSource] = useState();
	const [expenseAmount, setExpenseAmount] = useState(0);

	const [incomeEntries, setIncomeEntries] = useState([{}]);
	const [expenseEntries, setExpenseEntries] = useState([{}]);

	const [chequingDeposit, setChequingDeposit] = useState(0);
	const [savingsDeposit, setSavingsDeposit] = useState(0);

	// use effect, watch if round count changes
	useEffect(() => {
		console.log('hey its a new round! ' + roundCount);
		setReady(true);

		setTotalIncome(salary);
	}, [roundCount, salary]);

	useEffect(() => {
		setIncomeEntries([
			{
				source: 'Salary 1',
				amount: Number(salary),
			},
		]);

		setTotalIncome(salary);
	}, [salary]);

	const addIncome = () => {
		if (incomeAmount !== null && incomeSource !== null) {
			if (incomeAmount !== '' && incomeSource !== 'null') {
				setIncomeEntries([
					...incomeEntries,
					{
						source: incomeSource,
						amount: Number(incomeAmount),
					},
				]);

				setTotalIncome(+totalIncome + +incomeAmount);
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

	const addExpense = () => {
		if (expenseAmount !== null && expenseSource !== null) {
			if (expenseAmount !== '' && expenseSource !== 'null') {
				setExpenseEntries([
					...expenseEntries,
					{
						source: expenseSource,
						amount: Number(expenseAmount),
					},
				]);

				setTotalExpenses(+totalExpenses + +expenseAmount);
				document.getElementById('expenseSource').value = '';
				document.getElementById('expenseAmount').value = '';

				setExpenseSource('');
				setExpenseAmount('');
			} else {
				alert('enter an amount');
			}
		} else {
			alert('enter an amount');
		}
	};

	const income = (
		<div>
			<FlexBetween>
				<H3>Enter all your income this month</H3>
			</FlexBetween>

			<span>
				<InputRow>
					<StyledTextInput
						id="incomeSource"
						type="text"
						placeholder="Income Source"
						onChange={(e) => setIncomeSource(e.target.value)}></StyledTextInput>
					<StyledTextInput
						id="incomeAmount"
						type="number"
						placeholder="Income Amount"
						onChange={(e) => setIncomeAmount(e.target.value)}></StyledTextInput>
				</InputRow>
				<CenteredRow>
					<SmallOutlineButton onClick={addIncome}>
						Add income
					</SmallOutlineButton>
				</CenteredRow>
			</span>

			<div>
				<H3>Income Entries</H3>
				{incomeEntries.map((data, index) =>
					index >= 0 ? (
						<InputRow key={index}>
							<H3> {data.source}</H3>
							<P className="dollar">{data.amount}</P>
						</InputRow>
					) : null
				)}
				<H3 style={{ textAlign: 'right' }}>Total income: ${totalIncome}</H3>
			</div>

			<CenteredRow>
				<PrimaryButton onClick={(e) => setIncomeDone(true)}>Next</PrimaryButton>
			</CenteredRow>
		</div>
	);

	const expense = (
		<div>
			<FlexBetween>
				<H3>Enter all your expenses this month</H3>
			</FlexBetween>

			<span>
				<InputRow>
					<StyledTextInput
						id="expenseSource"
						type="text"
						placeholder="Expense Source"
						onChange={(e) =>
							setExpenseSource(e.target.value)
						}></StyledTextInput>
					<StyledTextInput
						id="expenseAmount"
						type="number"
						placeholder="Expense Amount"
						onChange={(e) =>
							setExpenseAmount(e.target.value)
						}></StyledTextInput>
				</InputRow>
				<CenteredRow>
					<SmallOutlineButton onClick={addExpense}>
						Add expense
					</SmallOutlineButton>
				</CenteredRow>
			</span>

			<div>
				<H3>Expense Entries</H3>
				{expenseEntries.map((data, index) =>
					index > 0 ? (
						<InputRow key={index}>
							<H3> {data.source}</H3>
							<P className="dollar">{data.amount}</P>
						</InputRow>
					) : null
				)}
				<H3 style={{ textAlign: 'right' }}>Total expenses: ${totalExpenses}</H3>
			</div>

			<CenteredRow>
				<PrimaryButton onClick={(e) => setExpenseDone(true)}>
					Next
				</PrimaryButton>
			</CenteredRow>
		</div>
	);

	const finishTransfer = (e) => {
		setTransferDone(true);

		e.preventDefault();
		const total =
			totalIncome - totalExpenses - chequingDeposit - savingsDeposit;

		const bankDeposit = {
			chequingDeposit: chequingDeposit,
			savingsDeposit: savingsDeposit,
		};

		axios
			.post(
				'https://the-price-of-life.herokuapp.com/users/bankAccount/' + username,
				bankDeposit
			)
			.then((res) => {
				console.log(res.data);
				alert('deposits added');
			});

		if (total === 0) {
			setIncomeDone(false);
			setExpenseDone(false);
			setTransferDone(false);
			setTotalIncome(salary);
			setTotalExpenses(0);
			setChequingDeposit(0);
			setSavingsDeposit(0);
			setReady(false);
			return;
		} else {
			alert('please make sure that total left to transfer is 0');
		}
	};

	const transfer = (
		<div>
			<div>
				<H3>Monthly Summary</H3>
				<InputRow>
					<H3>Total Income</H3>
					<P className="dollar">{totalIncome}</P>
				</InputRow>
				<InputRow>
					<H3>Total Expenses</H3>
					<P className="dollar">{totalExpenses}</P>
				</InputRow>

				<H3>Total amount to transfer: ${totalIncome - totalExpenses}</H3>
			</div>
			<div>
				<P>Enter amount desired to transfer into each account</P>
				<InputRow>
					<H3>Chequing</H3>
					<StyledTextInput
						id="chequingDeposit"
						type="number"
						placeholder="Chequing"
						value={chequingDeposit}
						onChange={(e) =>
							setChequingDeposit(e.target.value)
						}></StyledTextInput>
				</InputRow>
				<InputRow>
					<H3>Savings</H3>
					<StyledTextInput
						id="savingsDeposit"
						type="number"
						placeholder="Savings"
						value={savingsDeposit}
						onChange={(e) =>
							setSavingsDeposit(e.target.value)
						}></StyledTextInput>
				</InputRow>
				<span style={{ textAlign: 'right' }}>
					{totalIncome - totalExpenses - chequingDeposit - savingsDeposit ===
					0 ? (
						<P>You've transferred it all!</P>
					) : (
						<P style={{ color: 'red' }}>
							Amount left: $
							{totalIncome - totalExpenses - chequingDeposit - savingsDeposit}
						</P>
					)}

					<H3>Total Transferred: ${+chequingDeposit + +savingsDeposit}</H3>

					<PrimaryButton onClick={finishTransfer}>Next</PrimaryButton>
				</span>
			</div>
		</div>
	);

	return (
		<div>
			{ready === true ? (
				incomeDone === false ? (
					income
				) : expenseDone === false ? (
					expense
				) : transferDone === false ? (
					transfer
				) : null
			) : (
				<div>Waiting for next round</div>
			)}
		</div>
	);
};

export default FinancialTracker;
