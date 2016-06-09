import React, { Component } from 'react';

export default class PlayerList extends Component {

	render() {
		return (
		    <ul className="w-player__list">
                {this.props.children.map(player => {
                    return <li className="w-player__item" key={player.key}>{player}</li>;
                })}
            </ul>
        );
	}
}
