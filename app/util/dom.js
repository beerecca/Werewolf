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

export function ellipsePosition(element, elements, w, h) {
    console.log(w);
    console.log(h);
    let offset=Math.PI/2;       //start at the bottom
    let da=2*Math.PI/elements;  //evenly space around perimeter
    let x0=w/2;
    let rx=w/2;
    let y0=h/2;
    let ry=h/2;
    
    let a = element * da + offset;

    return {
        x: x0 + (rx * Math.cos(a)),
        y: y0 + (ry * Math.sin(a))
    }
}
