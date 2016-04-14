import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import './Action.scss';

export default class Action extends Component {

	static propTypes = {
		changeRole : PropTypes.func.isRequired,
		saveActions : PropTypes.func.isRequired,
        nightRoles : PropTypes.array.isRequired,
        activeRole : PropTypes.object.isRequired
	};

    changeRole(direction, e) {
        this.props.changeRole(direction);
    }

	render() {
        const { activeRole, nightRoles, saveActions } = this.props;

        const rolePosition = nightRoles.findIndex(r => r.id == activeRole.id);
        const actionsDone = false;
        const previousClass = cn('btn', { 'disabled' : rolePosition == 0 });
        const nextClass = cn('btn', { 'disabled' : rolePosition == nightRoles.length - 1});
        const saveClass = cn('btn', 'btn-primary', { 'disabled' : !actionsDone });
        
        const { name, instruction } = activeRole;

		return (
			<span>
				<h1>{name}</h1>
				<p>{instruction}</p>
                <button className={previousClass} onClick={this.changeRole.bind(this, 'previous')}>Previous Role</button>
                <button className={nextClass} onClick={this.changeRole.bind(this, 'next')}>Next Role</button>
                <button className={saveClass} onClick={saveActions}>Save Actions</button>
			</span>
		);
	}
}
