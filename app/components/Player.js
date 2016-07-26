import React, { Component, PropTypes } from 'react';
import Icon from './Icon';
import cn from 'classnames';

export default class Player extends Component {

	static propTypes = {
		order: PropTypes.number,
		id: PropTypes.string,
		image: PropTypes.string,
		name: PropTypes.string.isRequired,
		selectionType: PropTypes.array,
		selectPlayer: PropTypes.func,
		deletePlayer: PropTypes.func,
		activeSelectionType: PropTypes.string,
		alive: PropTypes.bool
	};

	handleClick() {
		const { selectPlayer, deletePlayer, id } = this.props;
		if (selectPlayer) selectPlayer(id);
		if (deletePlayer) deletePlayer(id);
	}

	render() {
		const { name, image, deletePlayer, selectionType, activeSelectionType, alive } = this.props;
		const classNames = cn('w-player', { 'w-player__dead': !alive, 'w-player__delete': deletePlayer });

		const img = (image) ? <img className="w-player__image" src={image} /> : null;
		const iconType = (!selectionType)
			? 'question'
			: (selectionType.includes('voteSave')) 
				? 'voteSave' 
				: (selectionType.includes('voteKill')) 
					? 'voteKill' 
					: (selectionType.includes('accused'))
						? 'accused'
						: (selectionType.includes('accusers'))
							? 'accusers'
							:  (selectionType.includes(activeSelectionType))
								? 'tick'
								: null;
		const icon = (iconType) 
			? <div className="w-player__image w-player__overlay"><Icon icon={iconType} className="w-player__icon" /></div>
			: null;

		const playerBlock = (!selectionType && image) 
			? <div className={classNames}>{img}</div> 
			: <div className={classNames}>{img}{icon}</div>

		return (
			<span onClick={this.handleClick.bind(this)}>
				{playerBlock}
				<p className="w-player__name">{name}</p>
			</span>
		);
	}
}
