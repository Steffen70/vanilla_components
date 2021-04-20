function alternateTitle(count, maxCount, old = undefined) {
    const title = document.getElementById(`title-${count}`);

    count++;
    if (count > maxCount) count = 1;

    if (old) old.style.removeProperty('display');

    title.style.setProperty('display', 'initial');

    window.setTimeout(() => alternateTitle(count, maxCount, title), 2000);
}

onLoad.push(() => {
    const titles = document.querySelectorAll('#alternating-title span');

    if (titles.length > 1)
        alternateTitle(1, titles.length);
    else if (titles.length = 1)
        titles[0].style.setProperty('display', 'initial');
});