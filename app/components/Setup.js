import React, { Component, PropTypes } from 'react';

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
				<h1>Werewolf</h1>
				<form className="one-half offset-by-three column" onSubmit={this.handleSubmit.bind(this)}>
					<div className="w-input__container">
						<label className="w-label" htmlFor="name">Game Name</label>
						<input type="text" ref="name" className="w-input" />
					</div>
					<div className="w-input__container">
						<label className="w-label" htmlFor="moderator">Moderator Name</label>
						<input type="text" ref="moderator" className="w-input" />
					</div>
					<button type="submit" className="w-btn__page-action button-primary">Create Game</button>
				</form>
			</span>
		);
	}
}
