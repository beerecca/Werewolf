import promisePolyfill from 'es6-promise-polyfill';
import 'fetch';
import 'babel-polyfill';

// IE 11 needs the promise polyfill. Loading the polyfill via webpack supplies it as an export
// rather than setting it as a global. To mimic native Promises, we need it to be global.
window.Promise = window.Promise || promisePolyfill.Promise;

