import React from 'react';
import styled from 'styled-components';
import { Container } from '../shared/global';
import Collapsible from 'react-collapsible';

const Help = () => {
	return (
		<Container style={{ textAlign: 'center' }}>
			<h1>Help Center</h1>

			<Collapsible trigger="Question 1">
				<p>
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!! Sample toggle stuff here!!! Sample toggle stuff here!!!
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!!
				</p>
			</Collapsible>
			<Collapsible trigger="Question 2">
				<p>
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!! Sample toggle stuff here!!! Sample toggle stuff here!!!
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!!
				</p>
			</Collapsible>
		</Container>
	);
};

export default Help;
