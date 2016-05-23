import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import PlayersController from './PlayersController';
import PlayerAdd from '../components/PlayerAdd';
import Setup from '../components/Setup';
import Action from '../components/Action';
import Accusation from '../components/Accusation';
import Countdown from '../components/Countdown';
import Review from '../components/Review';
import cn from 'classnames';
//import Loading from '../components/Loading/Loading';

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
				content = <Accusation cancelAccusation={()=>console.log('cancelAccusation')} saveVote={()=>console.log('saveVote')}/>
				break;
			case 'end-game':
			default:
				break; 
		}

		const countdown = (game.state === 'day-accuse') ? <Countdown length={300} /> : null;
        const style = cn('container', {'body-night': game.state === 'night', 'body-day': game.state === 'day-review' || game.state === 'day-accuse'});

//TODO: state names should be consts
        return (
            <div className={style}>
				{countdown}
				<div className="w-panel">
					{content}
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
