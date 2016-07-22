import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import Player from '../components/Player';
import PlayerList from '../components/PlayerList';

export class PlayersContainer extends Component {

    selectPlayer(id) {
        this.props.dispatch(action.selectPlayer(id, this.props.app.game.stage, this.props.app.game.phase, this.props.app.night.activeAction.id));
    }

    generatePlayer(player) {
        const { roles, selections } = this.props.app;

        //const playerRole = roles.allRoles.find(role => role.id === player.role);
		const playerRole = roles.allRoles[player.role];
        const playerSelection = selections.activeSelections.find(selection => player.id === selection.player);
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
            <PlayerList>
                {players.playerList.map(player => this.generatePlayer(player))}
            </PlayerList>
		);
	}
}

export default connect((state) => {
	return {
		app: {
            game: state.app.game,
			players: state.app.players,
            roles: state.app.roles,
            selections: state.app.selections,
            night: state.app.night
		}
	}
})(PlayersContainer);
