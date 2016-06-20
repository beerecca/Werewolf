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

	render() {
		const { page } = this.props.app.day;
		//const { dispatch } = this.props;
              
        let title;
        let footer;

        switch (page) {
            
            case 'accuse':
                title = 'Select Accused';
                footer = (
                    <footer>
                        <Button label="Skip to next night" buttonClick={()=>this.setNextNight()} />
                        <Button label="Next" buttonClick={()=>console.log('next')} />
                    </footer>
                );
                break;
            case 'accusers':
                title = 'Select Accusers';
                footer = (
                    <footer>
                        <Button label="Cancel" buttonClick={()=>console.log('next night')} />
                        <Button label="Next" buttonClick={()=>console.log('next')} />
                    </footer>
                );
                break;
            case 'vote':
                title = 'Vote';
                footer = (
                    <footer>
                        <Button label="Next" buttonClick={()=>console.log('next night')} />
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
			selections: state.app.selections
		} 
	}
})(AccusationController);
