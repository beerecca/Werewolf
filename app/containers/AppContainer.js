import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetupGameContainer from './SetupGameContainer';
import SetupNamesContainer from './SetupNamesContainer';
import SetupRolesContainer from './SetupRolesContainer';
import NightContainer from './NightContainer';
import ReviewContainer from './ReviewContainer';
import AccusationContainer from './AccusationContainer';
import EndGameContainer from './EndGameContainer';
import { getGameStage } from '../selectors';

export class AppContainer extends Component {

    render() {
        const { stage } = this.props;

		const stageContent = {
			'setup-game': <div className="w-panel__center"><SetupGameContainer /></div>,
			'setup-player': <div className="w-panel"><SetupNamesContainer /></div>,
			'setup-roles': <div className="w-panel"><SetupRolesContainer /></div>,
			'night': <div className="w-panel"><NightContainer /></div>,
			'day-review': <div className="w-panel"><ReviewContainer /></div>,
			'day-accuse': <div className="w-panel"><AccusationContainer /></div>,
			'end-game': <div className="w-panel__center"><EndGameContainer /></div>
		}

		document.body.className = '';
		document.body.classList.add(`w-${stage}`);

        return (
            <div className="container">
				<div className="w-panel">
					{stageContent[stage]}
				</div>
			</div>
		);
	}
}

export default connect((state) => ({
    stage: getGameStage(state)
}))(AppContainer);
