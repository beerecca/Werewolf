import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlayer } from '../actions';
import Player from '../components/Player';
import PlayerList from '../components/PlayerList';
import { getGameStage, getGamePhase, getActiveAction, getAllRoles, getSelections, getPlayers } from '../selectors';

export class PlayersContainer extends Component {

    selectPlayer(id) {
        this.props.selectPlayer(id, this.props.stage, this.props.phase, this.props.activeAction.id);
    }

    generatePlayer(player) {
        const { allRoles, selections } = this.props;
		const playerRole = allRoles[player.role];
        const playerSelection = selections.activeSelections.find(selection => player.id === selection.player);

        return <Player
            key={player.order}
            order={player.order}
            alive={player.alive}
            id={player.id}
            name={player.name}
            image={playerRole ? playerRole.image : null}
            selectionType={playerSelection ? playerSelection.type : null}
            activeSelectionType={selections.selectionType}
            selectPlayer={(id)=>{this.selectPlayer(id)}} />
    }

	render() {
        return (
            <PlayerList>
                {this.props.players.map(player => this.generatePlayer(player))}
            </PlayerList>
		);
	}
}

export default connect((state) => ({
    stage: getGameStage(state),
    phase: getGamePhase(state),
    activeAction: getActiveAction(state),
    allRoles: getAllRoles(state),
    selections: getSelections(state),
    players: getPlayers(state)
}), { selectPlayer })(PlayersContainer);
