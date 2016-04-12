import React, { Component, PropTypes } from 'react';
import './Setup.scss';

export default class Setup extends Component {

	static propTypes = {
		createGame: PropTypes.func.isRequired
	};

	handleSubmit(e) {
		e.preventDefault();
		this.props.createGame(this.refs.gameName.value);
	}

	render() {
		return (
			<span>
				<h1>Werewolf</h1>
				<p>The Village is your mission: You will attempt to save it or destroy it.</p>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group form-inline">
						<label className="w-setup--name" htmlFor="gameName">Name Your Game:</label>
						<input type="text" ref="gameName" className="form-control" ref="gameName" />
					</div>
					<button type="submit" className="btn btn-default">Add Players</button>
				</form>
			</span>
		);
	}
}
