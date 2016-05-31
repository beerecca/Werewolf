import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import SetupPlayerForm from '../components/SetupPlayerForm';
import PlayerListItem from '../components/PlayerListItem';
import Button from '../components/Button';

export class SetupPlayersController extends Component {

	render() {
		const { playerList } = this.props.app.players;
		const { dispatch } = this.props;

		return (
			<div className="one-half offset-by-three column">
				<h2>Add Players</h2>
				<SetupPlayerForm createPlayer={player=>{dispatch(action.createPlayer(player))}} />
				<div className="w-playerlist">
					{playerList && playerList.map(player=>{
						return <PlayerListItem 
							key={player.id} 
							name={player.name} 
							deletePlayer={()=>{dispatch(action.deletePlayer(player.id))}} />
					})}
				</div>
				<Button label="Next" buttonClick={()=>dispatch(action.chooseRoles())} />
			</div>
		);
	}
}

export default connect((state) => {
	return {
		app: {
			roles: state.app.roles,
			error: state.app.error,
			players: state.app.players
		} 
	}
})(SetupPlayersController);
