import React from 'react';
import styled, { keyframes } from 'styled-components';
import { P } from './global';

const ToastAnimation = keyframes`
  0% {
      opacity: 0;
      top: 0;
      visibility: visible;
  }
  20% {
      opacity: 1;
      top: 1rem;
  }
  90% {
      opacity: 1;
      top: 1rem;
  } 100% {
      opacity: 0;
      top: 0;
      visibility: hidden;
  }
`;

const ToastContainer = styled.div`
	padding: 1rem;
	font-size: 1rem;
	animation-duration: 5s;
	animation-iteration-count: 1;
	position: fixed;
	text-align: center;
	top: 1rem;
	left: 50%;
	transform: translate(-50%, 0);
	border-radius: 5px;
	font-weight: 600;
	animation-name: ${(props) => (props.show === 1 ? ToastAnimation : null)};
	animation-fill-mode: forwards;
	visibility: hidden;
`;

const Toast = (props) => {
	return (
		<ToastContainer
			show={props.show}
			style={{ backgroundColor: props.bgColor, color: props.color }}>
			<P>{props.text}</P>
		</ToastContainer>
	);
};

export default Toast;
