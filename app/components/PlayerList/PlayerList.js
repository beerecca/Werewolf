import React, { Component } from 'react';
import './PlayerList.scss';

export default class PlayerList extends Component {

	render() {
		return (
		    <ul>
                {this.props.children.map(player => {
                    return <li key={player.key}>{player}</li>;
                })}
            </ul>
        );
	}
}
