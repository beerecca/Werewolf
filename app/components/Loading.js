import React, { Component } from 'react';
import './Loading.scss';

/**
 * Creates the loader component that displays while waiting for the api to return
 */
export default class Loading extends Component {

	render() {
		return (
			<div className="xui-panel xui-container-small">
				<div className="xui-loader pc-loading" data-automationid="loading">
					<div className="xui-loader--dot"></div>
					<div className="xui-loader--dot"></div>
					<div className="xui-loader--dot"></div>
				</div>
			</div>
		);
	}
}