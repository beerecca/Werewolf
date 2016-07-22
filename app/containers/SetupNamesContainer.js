import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import SetupNameForm from '../components/SetupNameForm';
import Name from '../components/Name';
import Button from '../components/Button';

export class SetupNamesContainer extends Component {

	render() {
		const { playerList } = this.props.app.players;
		const { dispatch } = this.props;

		return (
			<div className="one-half offset-by-three column">
				<h2>Add Players</h2>
				<SetupNameForm createPlayer={player=>{dispatch(action.createPlayer(player))}} />
				<div className="w-playerlist">
					{playerList && playerList.map(player=>{
						return <Name 
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
})(SetupNamesContainer);
