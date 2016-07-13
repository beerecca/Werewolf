import React, { Component, PropTypes } from 'react';
import Button from './Button';

export default class Name extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		deletePlayer: PropTypes.func.isRequired
	};

	render() {
		const { name, deletePlayer } = this.props;

		return (
			<div>
				<div className="w-playerlist__item"><span>{name}</span></div>
				<Button label="Delete" buttonClick={deletePlayer} secondary={true} />
			</div>
		);
	}
}
