import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import './Player.scss';

export default class Player extends Component {

	static propTypes = {
		order: PropTypes.number,
		id: PropTypes.string,
		image: PropTypes.string,
		name: PropTypes.string.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
        selectionType: PropTypes.string,
		selectPlayer: PropTypes.func
	};

	render() {
		const { name, id, image, x, y, selectPlayer, selectionType } = this.props;
        const style = {
            top : y + 'px',
            left: x + 'px'
        };

        const classNames = cn('w-player', { [`w-player-selection--${selectionType}`] : selectionType });

        return (
			<div className={classNames} style={style} onClick={()=>{selectPlayer(id)}}>
				<img className="w-player--image" src={image} />
				<p>{name}</p>
			</div>
		);
	}
}
