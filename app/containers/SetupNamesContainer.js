import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import SetupNameForm from '../components/SetupNameForm';
import PlayerList from '../components/PlayerList';
import Player from '../components/Player';
import Button from '../components/Button';

export class SetupNamesContainer extends Component {

	render() {
		const { playerList } = this.props.app.players;
		const { dispatch } = this.props;

		return (
			<span>
				<h2>Add Players</h2>
				<div className="one-half offset-by-three column">
					<SetupNameForm createPlayer={player=>{dispatch(action.createPlayer(player))}} />
				</div>
				<div className="w-playerlist">
					<PlayerList>
						{playerList.map(player => <Player 
							key={player.id} 
							name={player.name} 
							alive={true}
							deletePlayer={()=>{dispatch(action.deletePlayer(player.id))}} />)}
					</PlayerList>
				</div>
				<Button label="Next" buttonClick={()=>dispatch(action.chooseRoles())} />
			</span>
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
})(SetupNamesContainer);