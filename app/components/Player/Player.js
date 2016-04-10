import React, { Component, PropTypes } from 'react';
import './Player.scss';

export default class Player extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired
	};

	render() {
		const { name, image, x, y } = this.props;
        
        const style = {
            top : y + 'px',
            left: x + 'px'
        };
		
        return (
			<div className="w-player" style={style}>
				<img className="w-player--image" src={image} />
				<p>{name}</p>
			</div>
		);
	}
}
