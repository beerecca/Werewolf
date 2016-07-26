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
		activeSelectionType: PropTypes.string,
		alive: PropTypes.bool
	};

	render() {
		const { name, id, image, selectPlayer, selectionType, activeSelectionType, alive } = this.props;
		const classNames = cn('w-player', { 'w-player__dead': !alive });

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
			<span onClick={()=>{selectPlayer(id)}}>
				{playerBlock}
				<p className="w-player__name">{name}</p>
			</span>
		);
	}
}
