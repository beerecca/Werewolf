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
			<div className="w-setup col-sm-6 col-sm-offset-3 panel panel-default">
				<h1>Werewolf</h1>
				<p>This is an awesome game blah blah</p>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<label htmlFor="gameName">Game Name</label>
						<input type="text" ref="gameName" className="form-control" ref="gameName" />
					</div>
					<button type="submit" className="btn btn-default">Submit</button>
				</form>	
			</div>
		);
	}
}
