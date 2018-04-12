import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementPhase, setNight, updatePage, setSelection, saveAccusations } from '../actions';
import * as selector from '../selectors';
import Button from '../components/Button';
import Countdown from '../components/Countdown';
import PlayersContainer from './PlayersContainer';

export class AccusationContainer extends Component {

    setNextNight() {
        this.props.incrementPhase();
        this.props.setNight();
    }

    updatePage(page) {
        this.props.updatePage(page);
        this.props.setSelection(page, false);
    }

    render() {
        const { 
            page, 
            skipDisabled, 
            nextAccusersDisabled, 
            cancelDisabled, 
            nextVoteDisabled,
            saveAccusations 
        } = this.props;

        const pageOptions = {
            accuse: {
                title: 'Select Accused',
                footer: (
                    <footer>
                        <Button label="Skip to next night" disabled={skipDisabled} buttonClick={()=>this.setNextNight()} />
                        <Button label="Next" disabled={nextAccusersDisabled} buttonClick={()=>this.updatePage('accusers')} />
                    </footer>
                )
            },
            accusers: {
                title: 'Select Accusers',
                footer: (
                    <footer>
                        <Button label="Cancel" disabled={cancelDisabled} buttonClick={()=>saveAccusations()} />
                        <Button label="Next" disabled={nextVoteDisabled} buttonClick={()=>this.updatePage('vote')} />
                    </footer>
                )
            },
            vote: {
                title: 'Vote',
                footer: (
                    <footer>
                        <Button label="Next" buttonClick={()=>saveAccusations()} />
                    </footer>
                )
            }
        }

        return (
            <span>
                <Countdown length={300} />
                <h2>{pageOptions[page].title}</h2>
                <PlayersContainer />
                <footer>
                    {pageOptions[page].footer}
                </footer>
            </span>
        );
    }
}

const mapStateToProps = (state) => ({
    page: selector.getDayPage(state),
    skipDisabled: selector.getSkipDisabled(state),
    nextAccusersDisabled: selector.getNextAccusersDisabled(state),
    cancelDisabled: selector.getCancelDisabled(state),
    nextVoteDisabled: selector.getNextVoteDisabled(state)
});

export default connect(
    mapStateToProps, 
    { incrementPhase, setNight, updatePage, setSelection, saveAccusations }
)(AccusationContainer);
