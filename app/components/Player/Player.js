import React, { Component, PropTypes } from 'react';
import './Player.scss';

export default class Player extends Component {

	static propTypes = {
		order: PropTypes.number,
		id: PropTypes.string,
		image: PropTypes.string,
		name: PropTypes.string.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		editPlayer: PropTypes.func
	};

	render() {
		const { name, id, image, x, y, editPlayer } = this.props;
        const style = {
            top : y + 'px',
            left: x + 'px'
        };
		
        return (
			<div className="w-player" style={style} onClick={()=>{editPlayer(id)}}>
				<img className="w-player--image" src={image} />
				<p>{name}</p>
			</div>
		);
	}
}
