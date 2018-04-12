import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startAccusations } from '../actions';
import Button from '../components/Button'
import { getReviewSummary } from '../selectors';

export class ReviewContainer extends Component {

	render() {
		const { reviewSummary, startAccusations } = this.props;
        const summaryEls = reviewSummary.map(({id, name, verb}) => <p key={id}>{name} {verb}</p>);

		return (
			<span>
				<h1>Day Review</h1>
				<p>This is what happened last night:</p>
                {summaryEls}
                <Button label="Start Accusations" buttonClick={()=>startAccusations()} />
			</span>
		);
	}
}

export default connect((state) => ({
    reviewSummary: getReviewSummary(state)
}), { startAccusations })(ReviewContainer);
