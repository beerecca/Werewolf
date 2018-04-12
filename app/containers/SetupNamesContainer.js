import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPlayer, deletePlayer, chooseRoles } from '../actions';
import { getPlayers } from '../selectors';
import SetupNameForm from '../components/SetupNameForm';
import PlayerList from '../components/PlayerList';
import Player from '../components/Player';
import Button from '../components/Button';

export class SetupNamesContainer extends Component {

	render() {
		const { playerList, createPlayer, deletePlayer, chooseRoles } = this.props;

		return (
			<span>
				<h2>Add Players</h2>
				<div className="one-half offset-by-three column">
					<SetupNameForm createPlayer={player=>createPlayer(player)} />
				</div>
				<div className="w-playerlist">
					<PlayerList>
						{playerList.map(player => <Player 
							key={player.id} 
							name={player.name} 
							alive={true}
							deletePlayer={()=>deletePlayer(player.id)} />)}
					</PlayerList>
				</div>
				<Button label="Next" buttonClick={()=>chooseRoles()} />
			</span>
		);
	}
}

export default connect((state) => ({
	playerList: getPlayers(state)
}), { createPlayer, deletePlayer, chooseRoles })(SetupNamesContainer);