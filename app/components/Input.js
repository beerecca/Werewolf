import React, { Component, PropTypes } from 'react';

export default class Input extends Component {

	static propTypes = {
		label: PropTypes.string.isRequired,
		inputChange: PropTypes.func.isRequired,
		value: PropTypes.string
	};

	onChange(e) {
		this.props.inputChange(e.target.value);
	}

	render() {
		const { label, value } = this.props;

		return (
			<div className="input__container">
				<label className="label" htmlFor={label}>{label}</label>
				<input onChange={this.onChange.bind(this)} type="text" ref={label} className="input" value={value} />
			</div>
		);
	}
}

//TODO: name and label accessible?
