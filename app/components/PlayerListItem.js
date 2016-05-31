import React, { Component, PropTypes } from 'react';
import Button from './Button';

export default class PlayerListItem extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		deletePlayer: PropTypes.func.isRequired
	};

	render() {
		const { name, deletePlayer } = this.props;

		return (
			<div>
				<p className="w-playerlist__item">{name}</p>
				<Button label="Delete" buttonClick={deletePlayer} secondary={true} />
			</div>
		);
	}
}
