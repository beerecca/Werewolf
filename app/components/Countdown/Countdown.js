import React, { Component, PropTypes } from 'react';
import moment from 'moment'; //TODO: only import moment.js not the locale files
import 'moment-duration-format';

export default class Countdown extends Component {

	static propTypes = {
		length: PropTypes.number.isRequired
	};

	constructor() {
		super();
		this.state = { secondsRemaining: 0 };
	}

	componentDidMount() {
		this.setState({ secondsRemaining: this.props.length });
		this.interval = setInterval(this.tick.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	tick() {
		this.setState({secondsRemaining: this.state.secondsRemaining - 1});
		if (this.state.secondsRemaining <= 0) {
			clearInterval(this.interval);
		}
	}

	render() {
		const time = moment.duration(this.state.secondsRemaining, 'seconds').format('m:ss');
		return (
			<span className="w-countdown">{time}</span>
		);
	}
}