import React, { Component, PropTypes } from 'react';
import './Player.scss';

export default class Player extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired
	};

	render() {
		const { name, image } = this.props;

		return (
			<div className="w-player col-sm-3 panel panel-default">
				<img className="w-player--image" src={image} />
				<h3>{name}</h3>
			</div>
		);
	}
}
