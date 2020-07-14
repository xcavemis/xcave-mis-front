const bowser = require('bowser');
// Detect desktop or mobile mode.
if (window.matchMedia) {
    const setMode = function() {
        if (mql.matches) {
            document.body.classList.remove('desktop');
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
            document.body.classList.add('desktop');
        }
    };

    const mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
} else {
    document.body.classList.add('desktop');
}

// Detect whether we are on a touch device.
document.body.classList.add('no-touch');
window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
});

// Use tooltip fallback mode on IE < 11.
if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
}