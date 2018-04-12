/**
 * Prevents sagas and components from having to know about the shape of the redux state
 */

export const getGameName = state => state.app.game.name;
export const getWerewolvesWin = state => state.app.game.werewolvesWin;
export const getGameModerator = state => state.app.game.moderator;
export const getGameId = state => state.app.game.id;
export const getGamePhase = state => state.app.game.phase;
export const getGameStage = state => state.app.game.stage;
export const getPlayers = state => state.app.players.playerList;
export const getActions = state => state.app.night.nightActions;
export const getActiveAction = state => state.app.night.activeAction;
export const getAllRoles = state => state.app.roles.allRoles;
export const getSelectedRoles = state => state.app.roles.selectedRoles;
export const getAccusation = state => state.app.day.accusation;
export const getAccused = state => state.app.day.accusation.accused;
export const getAccusedBy = state => state.app.day.accusation.accusedBy;
export const getDayPage = state => state.app.day.page;
export const getReviewActions = state => state.app.day.reviewActions;
export const getSelections = state => state.app.selections;

export const getSkipDisabled = state => getAccused(state) !== null;
export const getNextAccusersDisabled = state => getAccused(state) === null;
export const getCancelDisabled = state => getAccusedBy(state).length === 0;
export const getNextVoteDisabled = state => getAccusedBy(state).length < 2;

export const getActionPosition = state => {
    return getActions(state).findIndex(action => action.id === getActiveAction(state).id);
}
export const getInstructionTitleName = state => {
    const { id, name, namePlural } = getActiveAction(state);
    const playersWithActiveAction = getPlayers(state).filter(player => {
        return player.alive && player.role === id
    });
	return playersWithActiveAction.length === 1 ? name : namePlural;
}

export const getReviewSummary = state => {
    return getReviewActions(state).reduce((summaries, action) => {
        const player = getPlayers(state).find(player => player.id === action.player);
        const role = getAllRoles(state)[action.role];
        if (role.showOnSummary) {
            summaries.push({ id: player.id, name: player.name, verb: role.summaryVerb })
        }
        return summaries;
    }, []);
}

function roleSort(a,b) {
    return a.order - b.order;
}
export const getSortedFilteredRoles = state => Object.values(getAllRoles(state))
    .sort(roleSort)
    .filter(role => !role.isDefaultRole);