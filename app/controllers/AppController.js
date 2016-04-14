import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoles, createPlayer, createGame, windowResize, saveGame, changeRole, saveActions } from '../actions';
import PlayerEdit from '../components/PlayerEdit/PlayerEdit';
import Player from '../components/Player/Player';
import Setup from '../components/Setup/Setup';
import Action from '../components/Action/Action';
import { ellipsePosition } from '../util/dom';
//import Loading from '../components/Loading/Loading';
//import Error from '../components/Error/Error';

export class AppController extends Component {

	componentDidMount() {
		this.props.dispatch(getRoles());
        this.props.dispatch(windowResize({ w: window.innerWidth, h: window.innerHeight}));
        window.addEventListener('resize', () => this.props.dispatch(windowResize({ w: window.innerWidth, h: window.innerHeight})));
	}
    
	render() {
		const { activeRole, nightRoles, roles, moderator, players, windowSize, gameState } = this.props.app;
		const { dispatch } = this.props;
		const playerPanels = players.map((player) => {
			const pos = ellipsePosition(player.order, players.length + 1, windowSize.w/2, windowSize.h/2, windowSize.w*0.8, windowSize.h*0.8);
			const playerRole = roles.filter(role => {
				return role.id === player.role;
			});
			return <Player key={player.order} order={player.order} name={player.name} image={(playerRole[0]) ? playerRole[0].image : null} x={pos.x} y={pos.y} />
		});
		
        const moderatorPos = ellipsePosition(0, 1, windowSize.w/2, windowSize.h/2, windowSize.w*0.8, windowSize.h*0.8);
		const moderatorPanel = (moderator) ? <Player name={moderator} image={'https://s3-us-west-2.amazonaws.com/werewolfbucket/moderator.png'} x={moderatorPos.x} y={moderatorPos.y} /> : null;
        
        let content;
        switch (gameState) {
            case 'setup-game':
                content = <Setup createGame={(name, moderator)=>{dispatch(createGame(name, moderator))}} />
                break;
            case 'setup-player':
                content = <PlayerEdit roles={roles} createPlayer={(player)=>{dispatch(createPlayer(player))}} startGame={()=>{dispatch(saveGame())}} /> 
                break;
            case 'night':
                content = <Action activeRole={activeRole} nightRoles={nightRoles} changeRole={direction=>{dispatch(changeRole(direction))}} saveActions={()=>{dispatch(saveActions())}} />
                break;
            default:
                break; 
        }
        
        return (
            <div className="container">
				{playerPanels}
				<div className="w-controller">
					<div className="w-setup col-sm-6 panel panel-default">
						<div className="w-setup--content col-sm-10 col-sm-offset-1">
							{content}
						</div>
					</div>
				</div>
				{moderatorPanel}
			</div>
		);
	}
}

export default connect((state) => {return {...state}})(AppController);
