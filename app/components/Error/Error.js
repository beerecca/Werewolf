import React, { Component } from 'react';
import './Error.scss';
import ErrorPageSVG from './error-page-svg';

/**
 * Creates an error component that displays if the api returns an error
 */
export default class Error extends Component {

	render() {
		return (
			<ErrorPageSVG />
		);
	}
}