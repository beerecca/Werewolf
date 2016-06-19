import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

export default class Player extends Component {

	static propTypes = {
		order: PropTypes.number,
		id: PropTypes.string,
		image: PropTypes.string,
		name: PropTypes.string.isRequired,
        selectionType: PropTypes.array,
		selectPlayer: PropTypes.func,
        alive: PropTypes.bool
	};

	render() {
		const { name, id, image, selectPlayer, selectionType, alive } = this.props;
        const selectionClassNames = !selectionType ? [] : selectionType.map(selection => {
            return 'w-player__' + selection;
        })
        const classNames = cn('w-player', { 'w-player__alive': alive }, selectionClassNames );

        return (
			<div className={classNames} onClick={()=>{selectPlayer(id)}}>
				<img className="w-player__image" src={image} />
				<p>{name}</p>
			</div>
		);
	}
}
