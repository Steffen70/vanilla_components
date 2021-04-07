function toggleOpenClass(setClass = true) {
    if (navigation.classList.contains('open'))
        navigation.classList.remove('open');
    else if (setClass)
        navigation.classList.add('open');
}

function isOrContains(t, e) {
    return t === e || e.contains(t);
}

let navigation;

onLoad.push(() => {
    const burger = document.getElementById('burger');
    navigation = document.getElementById('mobile-menu');

    burger.addEventListener('click', toggleOpenClass);

    document.addEventListener('click', e => {
        if (isOrContains(e.target, burger)) return;
        if (!isOrContains(e.target, navigation))
            toggleOpenClass(false);
    });
});