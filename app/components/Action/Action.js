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
        const actionsDone = false;
        const previousClass = cn('btn', 'w-btn', { 'disabled' : actionPosition == 0 });
        const nextClass = cn('btn', 'w-btn', { 'disabled' : actionPosition === nightActions.length - 1});
        const saveClass = cn('btn', 'w-btn', 'btn-primary', { 'disabled' : !actionsDone }); //TODO: this isn't complete yet, actionsDone is hardcoded
        
		return (
			<span>
				<h1>{name}</h1>
				<p>{instruction}</p>
                <button className={previousClass} onClick={this.changeAction.bind(this, 'previous')}>Previous Role</button>
                <button className={nextClass} onClick={this.changeAction.bind(this, 'next')}>Next Role</button>
                <button className={saveClass} onClick={saveActions}>Save Actions</button>
			</span>
		);
	}
}
