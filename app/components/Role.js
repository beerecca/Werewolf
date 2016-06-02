import React, { Component, PropTypes } from 'react';

export default class Role extends Component {

	static propTypes = {
		image: PropTypes.string.isRequired,
		roleClick: PropTypes.func.isRequired
	};

	render() {
		const { image, roleClick } = this.props;

		return (
            <label className="w-role__label">
                <input className="w-role__checkbox" type="checkbox" name="role" onChange={roleClick} />
                <img className="w-role__image" src={image} />
            </label>
        );
	}
}
