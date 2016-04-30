import React, { Component, PropTypes } from 'react';
import './Player.scss';

export default class Player extends Component {

	static propTypes = {
		order: PropTypes.number,
		id: PropTypes.string,
		image: PropTypes.string,
        game: PropTypes.object,
		name: PropTypes.string.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		selectPlayer: PropTypes.func
	};

	render() {
		const { name, id, game, image, x, y, selectPlayer } = this.props;
        const style = {
            top : y + 'px',
            left: x + 'px'
        };
		
        return (
			<div className="w-player" style={style} onClick={()=>{selectPlayer(id, game)}}>
				<img className="w-player--image" src={image} />
				<p>{name}</p>
			</div>
		);
	}
}
