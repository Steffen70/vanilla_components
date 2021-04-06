const root = document.documentElement;

function setOffset(current) {
    if (!current) return;

    const rect = current.getBoundingClientRect();

    var offset = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
    };

    if (current.classList.contains('navigation'))
        root.style.setProperty('--scroll-offset', `${offset.left * -1}px`);
    else {
        current.style.setProperty('--offset-left', `${offset.left * -1}px`);
        current.style.setProperty('--offset-top', `${offset.top * -1}px`);
    }
}

const target = document.querySelectorAll('#svnt .grdt-bg, #svnt .navigation, #svnt .calc-offset');
window.addEventListener('resize', () => target.forEach(setOffset));

window.onload = () => target.forEach(setOffset);