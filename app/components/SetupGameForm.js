import React, { Component, PropTypes } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default class SetupGameForm extends Component {

	static propTypes = {
		createGame: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = { name: null, moderator: null };
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.createGame(this.state.name, this.state.moderator);
	}

	nameInputChange(value) {
		this.setState({ name : value });
	}

	moderatorInputChange(value) {
		this.setState({ moderator : value });
	}

	render() {
		return (
			<form className="one-half offset-by-three column">
				<Input label="Game Name" inputChange={(value)=>this.nameInputChange(value)} autoFocus={true} />
				<Input label="Moderator" inputChange={(value)=>this.moderatorInputChange(value)} />
				<Button label="Create Game" buttonClick={this.handleSubmit.bind(this)} />
			</form>
		);
	}
}
