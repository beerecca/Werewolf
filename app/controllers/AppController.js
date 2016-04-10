import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoles, createPlayer, createGame } from '../actions';
import PlayerEdit from '../components/PlayerEdit/PlayerEdit';
import Player from '../components/Player/Player';
import Setup from '../components/Setup/Setup';
//import Loading from '../components/Loading/Loading';
//import Error from '../components/Error/Error';

export class AppController extends Component {

	componentDidMount() {
		this.props.dispatch(getRoles());
	}

	render() {
		const { roles, players } = this.props.app;
		const { dispatch } = this.props;
		
		const playerPanels = players.map((player) => {
			const playerRole = roles.filter(role => {
				return role.name === player.role;
			});
			return <Player key={player.order} name={player.name} image={playerRole[0].image} />
		});
		const order = (players.length > 0) ? Math.max.apply(null, players.map(player => player.order)) + 1 : 0;

		return (
			<div className="container">
				{playerPanels}
				<div className="row">
					<Setup createGame={(name)=>{dispatch(createGame(name))}} />
					<PlayerEdit roles={(roles) ? roles : null} createPlayer={(player)=>{dispatch(createPlayer(player))}} order={order} />
				</div>
			</div>
		);
	}
}

export default connect((state) => {return {...state}})(AppController);
