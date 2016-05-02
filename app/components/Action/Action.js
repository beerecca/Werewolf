import React, { Component, PropTypes } from 'react';
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
        const prev = actionPosition > 0 ? <button className="btn w-btn" onClick={this.changeAction.bind(this, 'previous')}>Previous</button> : null;
        const next = !isLastAction ? <button className="btn w-btn" onClick={this.changeAction.bind(this, 'next')}>Next Role</button> : null;
        const save = isLastAction ? <button className="btn w-btn btn-primary" onClick={saveActions}>Save Actions</button> : null;
        
		return (
			<span>
				<h3>{name}</h3>
				<p>{instruction}</p>
                {prev}
                {next}
                {save}
			</span>
		);
	}
}
