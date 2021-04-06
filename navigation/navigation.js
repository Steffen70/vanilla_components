const navigation = document.getElementById('mobile-menu');
const burger = document.getElementById('burger');

function toggleOpenClass(setClass = true) {
    if (navigation.classList.contains('open'))
        navigation.classList.remove('open');
    else if (setClass)
        navigation.classList.add('open');
}

function isOrContains(t, e) {
    return t === e || e.contains(t);
}

burger.addEventListener('click', toggleOpenClass);

document.addEventListener('click', e => {
    if (isOrContains(e.target, burger)) return;
    if (!isOrContains(e.target, navigation))
        toggleOpenClass(false);
});