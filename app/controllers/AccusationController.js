import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions';
import Button from '../components/Button';
import Countdown from '../components/Countdown';
import PlayersController from './PlayersController';
//import cn from 'classnames';

export class AccusationController extends Component {

    setNextNight() {
        this.props.dispatch(action.incrementPhase());
        this.props.dispatch(action.setNight());
    }

    updatePage(page) {
		console.log('accusation page', page);
        const playerIds = this.props.app.players.playerList.map(player=>player.id);
        this.props.dispatch(action.updatePage(page));
        this.props.dispatch(action.setSelection(page, false, playerIds));
    }

    sendVote() {
        this.props.dispatch(action.saveAccusations());
    }

    render() {
        const { page, accusation } = this.props.app.day;
        const { dispatch } = this.props;
        const skipDisabled = accusation.accused !== null;
        const nextAccusersDisabled = accusation.accused === null;
        const cancelDisabled = accusation.accusedBy.length === 0;
        const nextVoteDisabled = accusation.accusedBy.length < 2;

        let title;
        let footer;

        switch (page) {

            case 'accuse':
            title = 'Select Accused';
            footer = (
                <footer>
                    <Button label="Skip to next night" disabled={skipDisabled} buttonClick={()=>this.setNextNight()} />
                    <Button label="Next" disabled={nextAccusersDisabled} buttonClick={()=>this.updatePage('accusers')} />
                </footer>
                );
            break;
            case 'accusers':
            title = 'Select Accusers';
            footer = (
                <footer>
                    <Button label="Cancel" disabled={cancelDisabled} buttonClick={()=>dispatch(action.saveAccusations())} />
                    <Button label="Next" disabled={nextVoteDisabled} buttonClick={()=>this.updatePage('vote')} />
                </footer>
                );
            break;
            case 'vote':
            title = 'Vote';
            footer = (
                <footer>
                    <Button label="Next" buttonClick={()=>this.sendVote()} />
                </footer>
                );
            break;
            default:
            break;
        }

        return (
            <span>
            <Countdown length={300} />
            <h2>{title}</h2>
            <PlayersController />
            {footer}
            </span>
            );
    }
}

export default connect((state) => {
    return {
        app: {
            day: state.app.day,
            players: state.app.players
        }
    }
})(AccusationController);
