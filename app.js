import './app/util/polyfills';
//React, Redux, Router, Sagas
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
//App Setup
import { rootReducer } from './app/reducers';
import { domReady } from './app/util/dom';
import rootSaga from './app/sagas';
//App Controllers
import AppController from './app/controllers/AppController';

//Create saga middleware (keeps API logic in one place)
const sagaMiddleware = createSagaMiddleware(rootSaga);

//Combine saga middleware and redux devtools
const createStoreWithMiddleware = compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

//Create redux store (holds the state tree of the app)
const store = createStoreWithMiddleware(rootReducer);

//Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// When the DOM is ready, set up the page skeleton
domReady.then(function() {
	createContainers();

	ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>
				<Route path="/index.html" component={AppController} />
			</Router>
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