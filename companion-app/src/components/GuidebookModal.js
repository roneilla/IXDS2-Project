import React, { useState } from 'react';
import { PrimaryButton } from './../shared/global';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { GrFormClose } from 'react-icons/gr';

const Modal = styled.div`
	background-color: #fff;
	position: absolute;
	top: 10vh;
	left: 0;
	right: 0;
	border: #ccc solid 1px;
	margin: 1rem auto;
	width: 100%;
	max-width: 1000px;
	padding: 1rem;
	border-radius: 5px;
	height: 80vh;
	overflow-x: scroll;
	text-align: left;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledButton = styled(PrimaryButton)`
	position: relative;
`;

const CloseButton = styled.button`
	background-color: transparent;
	appearance: none;
	border: 0;
	font-size: 2rem;
	line-height: 2rem;
`;

const GuidebookModal = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<div style={{ padding: '0' }}>
			<StyledButton onClick={() => setToggle(true)}>
				View Guidebook
			</StyledButton>

			{toggle === true ? (
				<Modal>
					<Header>
						<h1>Guidebook</h1>
						<CloseButton>
							<GrFormClose onClick={() => setToggle(false)} />
						</CloseButton>
					</Header>

					<Collapsible trigger="Set Up">
						<p>
							Sample toggle stuff here!!! Sample toggle stuff here!!! Sample
							toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
							stuff here!!! Sample toggle stuff here!!! Sample toggle stuff
							here!!! Sample toggle stuff here!!!
						</p>
					</Collapsible>
					<Collapsible trigger="How to Play">
						<p>
							Sample toggle stuff here!!! Sample toggle stuff here!!! Sample
							toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
							stuff here!!! Sample toggle stuff here!!! Sample toggle stuff
							here!!! Sample toggle stuff here!!!
						</p>
					</Collapsible>
					<Collapsible trigger="Learning Guide">
						<p>
							Sample toggle stuff here!!! Sample toggle stuff here!!! Sample
							toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
							stuff here!!! Sample toggle stuff here!!! Sample toggle stuff
							here!!! Sample toggle stuff here!!!
						</p>
					</Collapsible>
					<Collapsible trigger="Facilitator Guide">
						<p>
							Sample toggle stuff here!!! Sample toggle stuff here!!! Sample
							toggle stuff here!!! Sample toggle stuff here!!! Sample toggle
							stuff here!!! Sample toggle stuff here!!! Sample toggle stuff
							here!!! Sample toggle stuff here!!!
						</p>
					</Collapsible>
				</Modal>
			) : null}
		</div>
	);
};

export default GuidebookModal;
