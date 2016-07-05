import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetupGameController from './SetupGameController';
import SetupNamesController from './SetupNamesController';
import SetupRolesController from './SetupRolesController';
import NightController from './NightController';
import ReviewController from './ReviewController';
import AccusationController from './AccusationController';
import EndGameController from './EndGameController';

export class AppController extends Component {
    
    render() {
        let content;
        const { game } = this.props.app;

		//TODO: state names should be consts
        switch (game.state) {
			case 'setup-game':
				content = <SetupGameController />
				break;
			case 'setup-player':
				content = <SetupNamesController /> 
				break;
			case 'setup-roles':
				content = <SetupRolesController /> 
				break;
			case 'night':
				content = <NightController />
				break;
			case 'day-review':
                content = <ReviewController />
                break;
			case 'day-accuse':
				content = <AccusationController />
				break;
			case 'end-game':
				content = <EndGameController />
				break;
			default:
				break; 
		}

		document.body.className = '';
		document.body.classList.add(`w-${game.state}`); 

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
})(AppController);
