/**
 * @public
 * A promise that resolves when the DOM's content has been loaded
 * @type {Promise}
 */
export const domReady = new Promise(function(resolve) {
	const onDomContentLoaded = function() {
		document.removeEventListener('DOMContentLoaded', onDomContentLoaded);
		resolve();
	};

	if(document.readyState !== 'loading') {
		resolve();
	} else {
		document.addEventListener('DOMContentLoaded', onDomContentLoaded);
	}
});