import React from 'react';
import styled from 'styled-components';
import { Container, H1, P } from './../shared/global';
import Collapsible from 'react-collapsible';

const Guidebook = () => {
	return (
		<Container style={{ textAlign: 'center' }}>
			<H1>Guidebook</H1>

			<Collapsible trigger="Set Up">
				<P>
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!! Sample toggle stuff here!!! Sample toggle stuff here!!!
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!!
				</P>
			</Collapsible>
		</Container>
	);
};

export default Guidebook;
