import React, { Component, PropTypes } from 'react';

export default class Role extends Component {

	static propTypes = {
		image: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		roleClick: PropTypes.func.isRequired
	};

	render() {
		const { image, name, roleClick } = this.props;

		return (
			<label className="w-role__label">
				<input className="w-role__checkbox" type="checkbox" name="role" onChange={roleClick} />
				<span className="w-role__imagecontainer">
					<div className="w-role__image w-role__overlay"></div>
					<img className="w-role__image" src={image} />
				</span>
				<span className="w-role__name">{name}</span>
			</label>
		);
	}
}
