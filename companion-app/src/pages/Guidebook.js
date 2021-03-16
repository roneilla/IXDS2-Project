import React from 'react';
import styled from 'styled-components';
import { Container } from './../shared/global';
import Collapsible from 'react-collapsible';

const Guidebook = () => {
	return (
		<Container style={{ textAlign: 'center' }}>
			<h1>Guidebook</h1>

			<Collapsible trigger="Set Up">
				<p>
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!! Sample toggle stuff here!!! Sample toggle stuff here!!!
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!!
				</p>
			</Collapsible>
			<Collapsible trigger="How to Play">
				<p>
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!! Sample toggle stuff here!!! Sample toggle stuff here!!!
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!!
				</p>
			</Collapsible>
			<Collapsible trigger="Learning Guide">
				<p>
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!! Sample toggle stuff here!!! Sample toggle stuff here!!!
					Sample toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
					stuff here!!!
				</p>
			</Collapsible>
			<Collapsible trigger="Facilitator Guide">
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

export default Guidebook;
