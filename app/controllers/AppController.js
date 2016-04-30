import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import PlayerAdd from '../components/PlayerAdd/PlayerAdd';
import PlayerEdit from '../components/PlayerEdit/PlayerEdit';
import Player from '../components/Player/Player';
import Setup from '../components/Setup/Setup';
import Action from '../components/Action/Action';
import { ellipsePosition } from '../util/dom';
//import Loading from '../components/Loading/Loading';
//import Error from '../components/Error/Error';

export class AppController extends Component {

	componentDidMount() {
		this.props.dispatch(action.getRoles());
        this.props.dispatch(action.windowResize({ w: window.innerWidth, h: window.innerHeight}));
        window.addEventListener('resize', () => this.props.dispatch(action.windowResize({ w: window.innerWidth, h: window.innerHeight}))); //TODO: put a timeout here 
	}

	render() {
		let content;
		const { roles, gameState, playerList, windowSize, activeAction, nightActions, moderator, editingPlayer } = this.props.app;
		const { dispatch } = this.props;

		const playerPanels = playerList.map((player) => {
			const pos = ellipsePosition(player.order, playerList.length + 1, windowSize.w/2, windowSize.h/2, windowSize.w*0.8, windowSize.h*0.8);
			const playerRole = roles.filter(role => {
				return role.id === player.role;
			});

			//TODO: only run editPlayer if phase is 0
			return <Player 
				key={player.order} 
				order={player.order} 
				id={player.id} 
				name={player.name} 
				image={(playerRole[0]) ? playerRole[0].image : null} 
				x={pos.x} 
				y={pos.y} 
				editPlayer={(id)=>{ dispatch(action.editPlayer(id))}} />
		});
		
        const moderatorPos = ellipsePosition(0, 1, windowSize.w/2, windowSize.h/2, windowSize.w*0.8, windowSize.h*0.8);
		const moderatorPanel = (moderator) ? <Player name={moderator} image={'https://s3-us-west-2.amazonaws.com/werewolfbucket/moderator.png'} x={moderatorPos.x} y={moderatorPos.y} /> : null;
		const filteredRoles = createFilteredRoles(playerList, roles); //TODO: these aren't being saved/rendered in the correct order
		
		switch (gameState) {
			case 'setup-game':
				content = <Setup createGame={(name, moderator)=>{dispatch(action.createGame(name, moderator))}} />
				break;
			case 'setup-player':
				content = <PlayerAdd roles={roles} createPlayer={(player)=>{dispatch(action.createPlayer(player))}} startGame={()=>{dispatch(action.startGame(filteredRoles))}} /> 
				break;
			case 'night':
				content = <Action activeAction={activeAction} nightActions={nightActions} changeAction={direction=>{dispatch(action.changeAction(direction))}} saveActions={()=>{dispatch(action.saveActions())}} />
				break;
			case 'day-review':
			case 'day-accuse':
			case 'end-game':
			default:
				break; 
		}

		const playerToEdit = playerList.find((player)=>{
			return player.id === editingPlayer;
		});
		const editModal = (editingPlayer) 
			? <PlayerEdit player={playerToEdit} roles={roles} updatePlayer={(id, name, role)=>{dispatch(action.updatePlayer(id, name, role))}} />
			: null;
        
        return (
            <div className="container-fluid">
				{playerPanels}
				<div className="w-controller">
					<div className="w-setup col-xs-6 panel panel-default">
						<div className="w-setup--content col-xs-10 col-xs-offset-1">
							{content}
							{editModal}
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
			...state.app.players,
			windowSize: state.app.windowSize,
			roles: state.app.roles,
			gameState: state.app.gameState,
			phase: state.app.phase,
			error: state.app.error,
			...state.app.night,
			...state.app.gameSetup
		} 
	}
})(AppController);

function createFilteredRoles(playerList, roles) {
	const roleMap = roles.reduce((map, role) => {
		map[role.id] = role;
		return map;
	}, {});

	const playerRoles = playerList.reduce((roles, player) => {
		roles[player.role] = roleMap[player.role];
		return roles;
	}, {});

	return Object.values(playerRoles);
}
