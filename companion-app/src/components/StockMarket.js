import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import stockMarketData from './../stockMarketData';

const Container = styled.div`
	width: 100%;
	overflow: auto;
`;

const StockCardContainer = styled.div`
	width: 100%;
	border: #ccc 1px solid;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const MaterialIcons = styled.div`
	font-family: 'Material Icons';
`;

const StockCard = (props) => {
	const [stockPrice, setStockPrice] = useState(0);
	const previousPriceRef = useRef();

	const MINUTE_MS = 1000; // 5 minutes is 300000

	let growth = Math.floor(props.monthlyGrowth * props.roundCounter);

	useEffect(() => {
		const interval = setInterval(() => {
			setStockPrice(
				props.startingPrice + Math.floor(Math.random(0, growth) * 100)
			);
			console.log('Logs every second');
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		previousPriceRef.current = stockPrice;
	});

	const previousPrice = previousPriceRef.current;

	let arrow;

	if (stockPrice > previousPrice) {
		arrow = (
			<MaterialIcons style={{ color: '#33B466' }}>arrow_upward</MaterialIcons>
		);
	} else if (stockPrice < previousPrice) {
		arrow = (
			<MaterialIcons style={{ color: '#C64949' }}>arrow_downward</MaterialIcons>
		);
	} else {
		arrow = <MaterialIcons>=</MaterialIcons>;
	}

	return (
		<StockCardContainer>
			<h3>{props.stockTicker}</h3>
			<h3>{props.stockName}</h3>
			<p>{stockPrice}</p>
			<span>{arrow}</span>
		</StockCardContainer>
	);
};

const StockMarket = (props) => {
	const stocks = stockMarketData.map((stock) => (
		<StockCard
			roundCounter={props.roundCounter}
			stockTicker={stock.ticker}
			stockName={stock.stockName}
			startingPrice={stock.startingPrice}
			monthlyGrowth={stock.monthlyGrowth}
			key={stock.ticker}></StockCard>
	));

	return (
		<Container>
			<h1>Stock Market</h1>
			{stocks}
		</Container>
	);
};

export default StockMarket;
