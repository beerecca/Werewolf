import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoles, createPlayer, createGame, windowResize } from '../actions';
import PlayerEdit from '../components/PlayerEdit/PlayerEdit';
import Player from '../components/Player/Player';
import Setup from '../components/Setup/Setup';
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
		const { roles, players, windowSize } = this.props.app;
		const { dispatch } = this.props;
		
		const playerPanels = players.map((player) => {
			const playerRole = roles.filter(role => {
				return role.name === player.role;
			});
            let pos = ellipsePosition(player.order + 1, players.length + 1, windowSize.w/2, windowSize.h/2, windowSize.w*0.8, windowSize.h*0.8);
			return <Player key={player.order} name={player.name} image={playerRole[0].image} x={pos.x} y={pos.y} />
		});
		const order = (players.length > 0) ? Math.max.apply(null, players.map(player => player.order)) + 1 : 0;
		const content = (true) 
		? <PlayerEdit roles={roles} createPlayer={(player)=>{dispatch(createPlayer(player))}} order={order} /> 
		: <Setup createGame={(name)=>{dispatch(createGame(name))}} />

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
			</div>
		);
	}
}

export default connect((state) => {return {...state}})(AppController);
