import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

export default class Button extends Component {

	static propTypes = {
		label: PropTypes.string.isRequired,
		buttonClick: PropTypes.func.isRequired,
		secondary: PropTypes.bool,
        disabled: PropTypes.bool
	};

	render() {
		const { label, buttonClick, secondary, disabled } = this.props;
		const buttonClass = cn({'u-full-width': !secondary}, {'button-secondary': secondary});

		return (
			<button onClick={buttonClick} type="submit" className={buttonClass} disabled={disabled}>{label}</button>
		);
	}
}
