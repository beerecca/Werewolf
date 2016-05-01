import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import './Action.scss';

export default class Action extends Component {

	static propTypes = {
		changeAction : PropTypes.func.isRequired,
		saveActions : PropTypes.func.isRequired,
        nightActions : PropTypes.array.isRequired,
        activeAction : PropTypes.object.isRequired
	};

    changeAction(direction) {
        this.props.changeAction(direction);
    }

	render() {
        const { activeAction, nightActions, saveActions } = this.props;
        const { name, instruction } = activeAction;
        
        const actionPosition = nightActions.findIndex(r => r.id == activeAction.id);
        const isLastAction = actionPosition === nightActions.length - 1;
        const previousClass = cn('btn', 'w-btn', { 'disabled' : actionPosition == 0 });     //TODO: Only show if not the first action
        const nextClass = cn('btn', 'w-btn', { 'disabled' : isLastAction });                //TODO: don't show this on the last action
        const saveClass = cn('btn', 'w-btn', 'btn-primary' );                               //TODO: This button should only show up on last action
        
		return (
			<span>
				<h3>{name}</h3>
				<p>{instruction}</p>
                <button className={previousClass} onClick={this.changeAction.bind(this, 'previous')}>Previous Role</button>
                <button className={nextClass} onClick={this.changeAction.bind(this, 'next')}>Next Role</button>
                <button className={saveClass} onClick={saveActions}>Save Actions</button>
			</span>
		);
	}
}
