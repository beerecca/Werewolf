import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

export default class Button extends Component {

	static propTypes = {
		label: PropTypes.string.isRequired,
		buttonClick: PropTypes.func.isRequired,
		secondary: PropTypes.bool,
		fullWidth: PropTypes.bool,
        disabled: PropTypes.bool
	};

	render() {
		const { label, buttonClick, secondary, fullWidth, disabled } = this.props;
		const buttonClass = cn('button', {'u-full-width': fullWidth}, {'button-secondary': secondary});

		return (
			<button onClick={buttonClick} type="submit" className={buttonClass} disabled={disabled}>{label}</button>
		);
	}
}
