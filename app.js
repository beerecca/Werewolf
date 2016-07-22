import './app/util/polyfills';
//React, Redux, Router, Sagas
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
//App Setup
import { rootReducer } from './app/reducers';
import { domReady } from './app/util/dom';
import rootSaga from './app/sagas/sagas';
import './app/style/style.scss';
import AppContainer from './app/containers/AppContainer';

//Create saga middleware (keeps API logic in one place)
const sagaMiddleware = createSagaMiddleware(rootSaga);

//Combine saga middleware and redux devtools
const createStoreWithMiddleware = compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

//Create redux store (holds the state tree of the app)
const store = createStoreWithMiddleware(rootReducer);

// When the DOM is ready, set up the page skeleton
domReady.then(function() {
	createContainers();

	ReactDOM.render(
		<Provider store={store}>
			<AppContainer />
		</Provider>,
		document.getElementById('app')
	);
});

//Create empty app element
function createContainers() {
	var app = document.createElement('div');
	app.setAttribute('id', 'app');
	document.body.appendChild(app);
}