import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CardHeading, H1, HeadingImg, P } from '../shared/global';
import stockMarketData from './../stockMarketData';
import Stocks from './../assets/Icon/Stocks.png';

const Container = styled.div`
	width: 100%;
	overflow: auto;
`;

const StockCardContainer = styled.div`
	width: 100%;
	border: #eee 1px solid;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border-radius: 5px;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 2rem;
`;

const Ticker = styled.div`
	grid-column: span 2;
	font-weight: 700;
`;

const StockName = styled.div`
	grid-column: span 6;
`;

const StockPrice = styled.div`
	grid-column: span 3;
	font-weight: 700;
	&::before {
		content: '$';
	}
`;

const ArrowContainer = styled.div`
	grid-column: span 1;
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
			<Ticker>{props.stockTicker}</Ticker>
			<StockName>{props.stockName}</StockName>
			<StockPrice>{stockPrice}</StockPrice>
			<ArrowContainer>{arrow}</ArrowContainer>
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
			<CardHeading>
				<HeadingImg src={Stocks}></HeadingImg>
				<H1>Stock Market</H1>
			</CardHeading>
			{stocks}
		</Container>
	);
};

export default StockMarket;
