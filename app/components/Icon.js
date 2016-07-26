import React, { Component, PropTypes } from 'react';

const icons = {
	'question': className => (
		<svg className={className} x="0px" y="0px" viewBox="10 0 70 90">
			<path d="M41.817,65.286c-3.046,0-5.295-2.251-5.692-5.294l-0.991-11.412c-0.528-3.573,1.59-6.221,5.164-6.619     c12.442-1.191,19.327-5.956,19.327-14.295v-0.267c0-7.411-5.694-12.575-15.221-12.575c-7.018,0-12.71,2.514-18.004,7.281     c-1.325,1.059-3.048,1.853-4.901,1.853c-4.098,0-7.409-3.31-7.409-7.281c0-1.985,0.793-4.104,2.646-5.692     C23.754,4.37,32.625,0,44.8,0c18.53,0,31.109,10.326,31.109,26.872v0.266c0,16.677-12.047,24.223-26.74,26.739l-0.865,6.116     c-0.53,2.911-2.646,5.294-5.694,5.294H41.817z"/>
			<path d="M49.315,82.471c0,4.157-3.37,7.529-7.524,7.529c-4.161,0-7.529-3.371-7.529-7.529c0-4.158,3.368-7.526,7.529-7.526    C45.945,74.946,49.315,78.314,49.315,82.471z"/>
		</svg>
	),
	'tick': className => (
		<svg className={className} x="0px" y="0px" viewBox="0 0 100 100">
			<path d="M37.4,91.5c-1.6,0-3.1-0.6-4.2-1.7l-26.2-27c-2.5-2.3-2.6-6.2-0.2-8.7c2.3-2.5,6.2-2.6,8.7-0.2l19.2,13.7  c1.1,1,2.8,0.8,3.7-0.4L83.9,11c2-2.7,5.9-3.3,8.6-1.2c2.7,2,3.3,5.9,1.2,8.6L42.3,89c-1.1,1.4-2.7,2.3-4.4,2.4  C37.7,91.5,37.6,91.5,37.4,91.5z"/>
		</svg>
	),
	'accused': className => (
		<svg className={className} x="0px" y="0px" viewBox="20 15 60 70">
			<path d="M74.805,67.858c-2.531-1.254-5.6-0.219-6.854,2.314l-9.195-4.553l9.195-4.553  c1.252,2.533,4.322,3.57,6.854,2.316c2.53-1.254,3.568-4.323,2.315-6.856c-0.691-1.395-1.934-2.33-3.331-2.686  c0.565-1.328,0.573-2.883-0.116-4.277c-1.255-2.532-4.324-3.568-6.855-2.314c-2.532,1.253-3.57,4.322-2.316,6.855L50,61.285  l-14.503-7.18c1.254-2.533,0.216-5.602-2.316-6.855c-2.532-1.254-5.601-0.218-6.855,2.314c-0.69,1.394-0.682,2.949-0.117,4.277  c-1.398,0.355-2.64,1.291-3.331,2.686c-1.253,2.533-0.216,5.603,2.315,6.856c2.532,1.254,5.602,0.217,6.855-2.316l9.196,4.553  l-9.195,4.553c-1.254-2.533-4.322-3.568-6.854-2.314c-2.533,1.254-3.57,4.322-2.316,6.854c0.691,1.395,1.932,2.332,3.331,2.688  c-0.566,1.328-0.572,2.883,0.118,4.275c1.252,2.533,4.322,3.57,6.854,2.316c2.532-1.254,3.568-4.322,2.314-6.855L50,69.955  l14.504,7.181c-1.254,2.533-0.218,5.602,2.314,6.855c2.531,1.254,5.602,0.217,6.854-2.316c0.69-1.393,0.685-2.947,0.118-4.275  c1.399-0.355,2.64-1.293,3.331-2.688C78.375,72.181,77.338,69.112,74.805,67.858z"/>
			<path d="M50,15.477c-9.734,0-17.625,7.891-17.625,17.625c0,6.52,3.55,12.199,8.812,15.248v4.377  c0,1.213,0.982,2.195,2.195,2.195c1.212,0,2.195-0.982,2.195-2.195h0.063c0,1.213,0.983,2.195,2.195,2.195  c1.212,0,2.195-0.982,2.195-2.195h0c0,1.213,0.982,2.195,2.195,2.195s2.195-0.982,2.195-2.195c0,1.213,0.983,2.195,2.195,2.195  s2.195-0.982,2.195-2.195V48.35c5.263-3.049,8.812-8.728,8.812-15.248C67.625,23.368,59.734,15.477,50,15.477z M44.598,38.484  c-2.464,0-4.462-1.998-4.462-4.462s1.998-4.462,4.462-4.462s4.462,1.998,4.462,4.462S47.062,38.484,44.598,38.484z M55.402,38.484  c-2.464,0-4.462-1.998-4.462-4.462s1.998-4.462,4.462-4.462s4.462,1.998,4.462,4.462S57.866,38.484,55.402,38.484z"/>
		</svg>
	),
	'accusers': className => (
		<svg className={className} x="0px" y="0px" viewBox="30 10 40 80">
			<path d="M65.1,11.3c0.7,0,1.4,0,2.2,0c2.1,0,2.9,2.1,2.2,3.8c-0.3,0.6-0.6,1.2-0.8,1.8c-4.1,9.2-8.2,18.5-12.3,27.8     c1.2,0,2.4,0,3.7,0c0.7,0,1.4,0,2.2,0c1.7,0,3.3,2.2,2.1,3.8c-0.5,0.6-0.9,1.2-1.4,1.8c-9.3,12.5-18.6,25-27.9,37.4     c-1.6,2.1-5.6,1-4.6-1.9c3.3-9.4,6.7-18.9,10-28.3c-2.2,0-4.5,0-6.7,0c-0.3,0-0.6,0-0.9,0c-0.1,0-0.2,0-0.2,0     c-1.2-0.3-2.3-1.5-2.1-2.9c0,0,0-0.1,0-0.1c0-0.2,0.1-0.5,0.2-0.7c5.9-13.7,11.8-27.4,17.8-41.1c0.3-0.8,1.4-1.2,2.2-1.2     C55.5,11.3,60.3,11.3,65.1,11.3z"/>
			<path d="M32.9,57.4c0.3,0,0.6,0,0.9,0c-0.4,0.1-0.7,0.1-1.1,0C32.7,57.4,32.8,57.4,32.9,57.4z"/>
			<path d="M32.6,57.4c-1.6-0.1-2.3-1.6-2.1-2.9C30.3,55.9,31.4,57.1,32.6,57.4z"/>
		</svg>
	),
	'voteSave': className => (
		<svg className={className} x="0px" y="0px" viewBox="20 10 60 80">
			<path d="M72,50.9h-3.1c2.5,0,4.5-2,4.5-4.5v-0.5c0-2.5-2-4.5-4.5-4.5h-8.2c13.2-16.2,1.5-24.1-1.2-19.7c-3.7,6.1-9.6,9.9-14.2,13.6  c-6.1,4.9-10.4,8.7-10.4,8.7h-7.3c-2.3,0-4.1,1.8-4.1,4.1v17.9c0,2.3,1.8,4.1,4.1,4.1h6.6c2,5.5,7.6,9.5,14.3,9.5h0h16.2  c2.5,0,4.5-2,4.5-4.5v-0.5c0-2.5-2-4.5-4.5-4.5h4.2c2.5,0,4.5-2,4.5-4.5V65c0-2.5-2-4.5-4.5-4.5H72c2.5,0,4.5-2,4.5-4.5v-0.5  C76.5,52.9,74.5,50.9,72,50.9z"/>
		</svg>
	),
	'voteKill': className => (
		<svg className={className} x="0px" y="0px" viewBox="20 10 60 80">
			<path transform="scale(1,-1) translate(0,-100)" d="M72,50.9h-3.1c2.5,0,4.5-2,4.5-4.5v-0.5c0-2.5-2-4.5-4.5-4.5h-8.2c13.2-16.2,1.5-24.1-1.2-19.7c-3.7,6.1-9.6,9.9-14.2,13.6  c-6.1,4.9-10.4,8.7-10.4,8.7h-7.3c-2.3,0-4.1,1.8-4.1,4.1v17.9c0,2.3,1.8,4.1,4.1,4.1h6.6c2,5.5,7.6,9.5,14.3,9.5h0h16.2  c2.5,0,4.5-2,4.5-4.5v-0.5c0-2.5-2-4.5-4.5-4.5h4.2c2.5,0,4.5-2,4.5-4.5V65c0-2.5-2-4.5-4.5-4.5H72c2.5,0,4.5-2,4.5-4.5v-0.5  C76.5,52.9,74.5,50.9,72,50.9z"/>
		</svg>
	)
}

/**
 * Displays an SVG icon
 */
export default class Icon extends Component {

	static propTypes = {
		className: PropTypes.string,
		icon: PropTypes.oneOf(Object.keys(icons)).isRequired
	}

	render() {
		return icons[this.props.icon](this.props.className);
	}
}