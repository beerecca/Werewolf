import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetupGameContainer from './SetupGameContainer';
import SetupNamesContainer from './SetupNamesContainer';
import SetupRolesContainer from './SetupRolesContainer';
import NightContainer from './NightContainer';
import ReviewContainer from './ReviewContainer';
import AccusationContainer from './AccusationContainer';
import EndGameContainer from './EndGameContainer';

export class AppContainer extends Component {

    render() {
        let content;
        const { game } = this.props.app;

		//TODO: stage names should be consts
        switch (game.stage) {
			case 'setup-game':
				content = <SetupGameContainer />
				break;
			case 'setup-player':
				content = <SetupNamesContainer />
				break;
			case 'setup-roles':
				content = <SetupRolesContainer />
				break;
			case 'night':
				content = <NightContainer />
				break;
			case 'day-review':
                content = <ReviewContainer />
                break;
			case 'day-accuse':
				content = <AccusationContainer />
				break;
			case 'end-game':
				content = <EndGameContainer />
				break;
			default:
				break;
		}

		document.body.className = '';
		document.body.classList.add(`w-${game.stage}`);

        return (
            <div className="container">
				<div className="w-panel">
					{content}
				</div>
			</div>
		);
	}
}

export default connect((state) => {
	return {
		app: {
			error: state.app.error,
            game: state.app.game
		}
	}
})(AppContainer);
