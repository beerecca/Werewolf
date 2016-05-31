import React, { Component, PropTypes } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default class SetupPlayerForm extends Component {

	static propTypes = {
		createPlayer: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = { name: null };
	}

	handleSubmit(e) {
		e.preventDefault();
		const name = this.state.name;
		if (name !== null) this.props.createPlayer({ name: name });
		this.setState({ name: null });
	}

	nameInputChange(value) {
		this.setState({ name : value });
	}

	render() {
		return (
			<form className="row">
				<div className="nine columns">
					<Input label="Name" inputChange={(value)=>this.nameInputChange(value)} value={this.state.name} />
				</div>
				<div className="three columns">
					<Button label="Add" buttonClick={this.handleSubmit.bind(this)} secondary={true} />
				</div>
			</form>
		);
	}
}
