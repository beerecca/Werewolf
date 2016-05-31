import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import Player from '../components/Player';
import PlayerPanels from '../components/PlayerPanels';

export class PlayersController extends Component {

    selectPlayer(id) {
        this.props.dispatch(action.selectPlayer(id, this.props.app.game.state, this.props.app.game.phase)); 
    }

    generatePlayer(player) {
        const { roles, selections } = this.props.app;
        
        const playerRole = roles.allRoles.find(role => role.id === player.role);
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
    }

	render() {
        const { players } = this.props.app;

        return (
            <PlayerPanels>    
                {players.playerList.map(player => this.generatePlayer(player))}
            </PlayerPanels>
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
