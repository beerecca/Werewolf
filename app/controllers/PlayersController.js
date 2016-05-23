import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import Player from '../components/Player/Player';

export class PlayersController extends Component {

    selectPlayer(id) {
        this.props.dispatch(action.selectPlayer(id, this.props.app.game.state, this.props.app.game.phase)); 
    }

    generatePlayerPanels() {
        const { roles, players, selections } = this.props.app;
        
        let playerPanels = players.playerList.map(player => {
            const playerRole = roles.find(role => role.id === player.role);
            const playerSelection = selections.activeSelections.find(selection => player.id == selection.player);
            const selectionType = playerSelection ? playerSelection.type : null; 

            return <Player 
                key={player.order}
                order={player.order} 
                alive={player.alive}
                id={player.id}
                name={player.name} 
                image={playerRole ? playerRole.image : null} 
                selectionType={selectionType}
                selectPlayer={(id)=>{this.selectPlayer(id)}} />
        });

        return playerPanels;
    }

	render() {
        let playerPanels = this.generatePlayerPanels();

        return (
			<ul>
                {playerPanels}
            </ul>
		);
	}
}

export default connect((state) => {
	return {
		app: {
			players: state.app.players,
            roles: state.app.roles,
            selections: state.app.selections
		} 
	}
})(PlayersController);
