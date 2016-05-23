import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import PlayersController from './PlayersController';
import PlayerAdd from '../components/PlayerAdd/PlayerAdd';
import Setup from '../components/Setup/Setup';
import Action from '../components/Action/Action';
import Countdown from '../components/Countdown/Countdown';
import Review from '../components/Review/Review';
//import Loading from '../components/Loading/Loading';
//import Error from '../components/Error/Error';

export class AppController extends Component {

	componentDidMount() {
        //TODO: this should only be called once we get to role selection
		this.props.dispatch(action.getRoles());
	}

    render() {
        let content;
        const { roles, game, players, night, day } = this.props.app;
        const { dispatch } = this.props;
        
        switch (game.state) {
			case 'setup-game':
				content = <Setup createGame={(name, moderator)=>{dispatch(action.createGame(name, moderator))}} />
				break;
			case 'setup-player':
				content = <PlayerAdd createPlayer={player=>{dispatch(action.createPlayer(player))}} startGame={()=>{dispatch(action.startGame())}} /> 
				break;
			case 'night':
				content = <Action activeAction={night.activeAction} nightActions={night.nightActions} changeAction={direction=>{dispatch(action.changeAction(direction))}} saveActions={()=>{dispatch(action.saveActions())}} />
				break;
			case 'day-review':
                content = <Review roles={roles} players={players.playerList} reviewActions={day.reviewActions} startAccusations={()=>{dispatch(action.startAccusations())}} />
                break;
			case 'day-accuse':
			case 'end-game':
			default:
				break; 
		}

        return (
            <div className="container-fluid">
				<Countdown length={300} />
				<div className="w-controller">
					<div className="w-setup col-xs-6 panel panel-default">
						<div className="w-setup--content col-xs-10 col-xs-offset-1">
							{content}
						</div>
					</div>
				</div>
                <PlayersController />
			</div>
		);
	}
}

export default connect((state) => {
	return {
		app: {
			players: state.app.players,
			windowSize: state.app.windowSize,
			roles: state.app.roles,
			error: state.app.error,
            game: state.app.game,
            night: state.app.night,
            day: state.app.day,
            selections: state.app.selections
		} 
	}
})(AppController);
