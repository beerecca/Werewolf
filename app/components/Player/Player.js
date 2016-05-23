import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import './Player.scss';

export default class Player extends Component {

	static propTypes = {
		order: PropTypes.number,
		id: PropTypes.string,
		image: PropTypes.string,
		name: PropTypes.string.isRequired,
        selectionType: PropTypes.string,
		selectPlayer: PropTypes.func,
        alive: PropTypes.bool
	};

	render() {
		const { name, id, image, selectPlayer, selectionType, alive } = this.props;

        const classNames = cn('w-player', { 'w-player--alive': alive }, { [`w-player-selection--${selectionType}`] : selectionType });

        return (
			<div className={classNames} onClick={()=>{selectPlayer(id)}}>
				<img className="w-player--image" src={image} />
				<p>{name}</p>
			</div>
		);
	}
}
