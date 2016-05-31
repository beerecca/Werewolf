import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import SetupGameController from './SetupGameController';
import SetupPlayersController from './SetupPlayersController';
import SetupRolesController from './SetupRolesController';
import NightController from './NightController';
import ReviewController from './ReviewController';
import AccusationController from './AccusationController';
import EndGameController from './EndGameController';

export class AppController extends Component {

	componentDidMount() {
		this.props.dispatch(action.getRoles());
	}

    render() {
        let content;
        const { game } = this.props.app;

		//TODO: state names should be consts
        switch (game.state) {
			case 'setup-game':
				content = <SetupGameController />
				break;
			case 'setup-player':
				content = <SetupPlayersController /> 
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
