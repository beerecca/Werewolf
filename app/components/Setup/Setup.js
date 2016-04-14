import React, { Component, PropTypes } from 'react';
import './Setup.scss';

export default class Setup extends Component {

	static propTypes = {
		createGame: PropTypes.func.isRequired
	};

	handleSubmit(e) {
		e.preventDefault();
		this.props.createGame(this.refs.name.value, this.refs.moderator.value);
	}

	render() {
		return (
			<span>
				<img className="w-setup--logo" src="https://s3-us-west-2.amazonaws.com/werewolfbucket/logo.png"/>
				<p>The Village is your mission: You will attempt to save it or destroy it.</p>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group form-inline">
						<label className="w-setup--label" htmlFor="name">Game Name:</label>
						<input type="text" ref="name" className="form-control" />
					</div>
					<div className="form-group form-inline">
						<label className="w-setup--label" htmlFor="moderator">Moderator Name:</label>
						<input type="text" ref="moderator" className="form-control" />
					</div>
					<button type="submit" className="btn btn-default">Add Players</button>
				</form>
			</span>
		);
	}
}
