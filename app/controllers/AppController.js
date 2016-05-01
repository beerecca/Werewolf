import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import PlayerAdd from '../components/PlayerAdd/PlayerAdd';
import PlayerEdit from '../components/PlayerEdit/PlayerEdit';
import Player from '../components/Player/Player';
import Setup from '../components/Setup/Setup';
import Action from '../components/Action/Action';
import Countdown from '../components/Countdown/Countdown';
import { ellipsePosition } from '../util/dom';
//import Loading from '../components/Loading/Loading';
//import Error from '../components/Error/Error';

let resizeTimer;

export class AppController extends Component {

	componentDidMount() {
		this.props.dispatch(action.getRoles());
        this.props.dispatch(action.windowResize({ w: window.innerWidth, h: window.innerHeight}));
        window.addEventListener('resize', () => { this.resizeWindow() }); 
	}

    resizeWindow() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => { this.props.dispatch(action.windowResize({ w: window.innerWidth, h: window.innerHeight }))}, 250);
    }

    selectPlayer(id) {
        this.props.dispatch(action.selectPlayer(id, this.props.app.game.state, this.props.app.game.phase)); 
    }

    render() {
		let content;
		const { roles, game, players, windowSize, night } = this.props.app;
		const { dispatch } = this.props;

		const playerPanels = players.playerList.map(player => {
			const pos = ellipsePosition(player.order, players.playerList.length + 1, windowSize.w/2, windowSize.h/2, windowSize.w*0.8, windowSize.h*0.8);
			const playerRole = roles.find(role => role.id === player.role);
            const playerSelection = players.selections.find(selection => player.id == selection.player);
            const selectionType = playerSelection ? playerSelection.type : null; 

			return <Player 
				key={player.order} 
				order={player.order} 
				id={player.id}
                game={game} 
				name={player.name} 
				image={(playerRole) ? playerRole.image : null} 
                selectionType={selectionType}
				x={pos.x} 
				y={pos.y} 
				selectPlayer={(id)=>{this.selectPlayer(id)}} />
		});
        const moderatorPos = ellipsePosition(0, 1, windowSize.w/2, windowSize.h/2, windowSize.w*0.8, windowSize.h*0.8);
		const moderatorPanel = game.moderator ? <Player name={game.moderator} image={'https://s3-us-west-2.amazonaws.com/werewolfbucket/moderator.png'} x={moderatorPos.x} y={moderatorPos.y} /> : null;
		
        switch (game.state) {
			case 'setup-game':
				content = <Setup createGame={(name, moderator)=>{dispatch(action.createGame(name, moderator))}} />
				break;
			case 'setup-player':
				content = <PlayerAdd roles={roles} createPlayer={(player)=>{dispatch(action.createPlayer(player))}} startGame={()=>{dispatch(action.startGame())}} /> 
				break;
			case 'night':
				content = <Action activeAction={night.activeAction} nightActions={night.nightActions} changeAction={direction=>{dispatch(action.changeAction(direction))}} saveActions={()=>{dispatch(action.saveActions())}} />
				break;
			case 'day-review':
			case 'day-accuse':
			case 'end-game':
			default:
				break; 
		}

		const playerToEdit = players.playerList.find((player)=>{
			return player.id === players.editingPlayer;
		});
		if (players.editingPlayer) {
			content = <PlayerEdit player={playerToEdit} roles={roles} updatePlayer={(id, name, role)=>{dispatch(action.updatePlayer(id, name, role))}} />
		}
        
        return (
            <div className="container-fluid">
				<Countdown length={300} />
				{playerPanels}
				<div className="w-controller">
					<div className="w-setup col-xs-6 panel panel-default">
						<div className="w-setup--content col-xs-10 col-xs-offset-1">
							{content}
						</div>
					</div>
				</div>
				{moderatorPanel}
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
            night: state.app.night
		} 
	}
})(AppController);
