onLoad.push(() => {
    const target = document.querySelectorAll('.paginated-feed-result .grdt-bg');

    resultsContainer = document.querySelector('.paginated-feed-result');
    feedWraper = document.querySelector('.feed-wraper');

    resultsContainer.addEventListener('scroll', () => target.forEach(setOffset));

    feedItemArray = Array.from(document.querySelectorAll('.feed-item'));

    [nextPageElem, lastPageElem] = [
        document.querySelector('.next-page'),
        document.querySelector('.last-page')
    ];

    feedWraperFade = parseInt(window.getComputedStyle(feedWraper).getPropertyValue('--feed-wraper-fade'));

    taskDescriptions = document.querySelectorAll('.task-description');

    paginationIndicatior = document.querySelector('.pagination-indicator');
    changePaginationIndicatior();

    window.addEventListener('resize', () => setVisibleFeed());

    nextPageElem.addEventListener('click', nextPage);
    lastPageElem.addEventListener('click', lastPage);

    deactivateButtons();

    setVisibleFeed();
});

let resultsContainer, feedWraper, feedItemArray, visibleItems, currentPage, pageCount;

function setVisibleFeed() {
    const height = feedItemArray.slice(0, visibleItems).reduce((n, i) => n + i.offsetHeight, 0);

    feedWraper.style.setProperty('--visible-feed', `${height}px`);

    // Add padding after last element

    const lastPageHeight = feedItemArray.slice((pageCount - 1) * visibleItems, feedItemArray.length)
        .reduce((n, i) => n + i.offsetHeight, 0);

    // Bug => --last-item-padding is sometimes set to 0 after resizing
    feedWraper.style.setProperty('--last-item-padding', `${height - lastPageHeight}px`);

    scrollCurrent();
    addCutOffClass();
}

let nextPageElem, lastPageElem;

function deactivateButtons() {
    if (currentPage === pageCount) {
        nextPageElem.classList.add('disabled');
        lastPageElem.classList.remove('disabled');
    }
    else if (currentPage === 1) {
        lastPageElem.classList.add('disabled');
        nextPageElem.classList.remove('disabled');
    }
    else {
        lastPageElem.classList.remove('disabled');
        nextPageElem.classList.remove('disabled');
    }
}

let feedWraperFade;

function scrollCurrent() {
    resultsContainer.scrollTop =
        feedItemArray[(currentPage - 1) * visibleItems].offsetTop - feedWraperFade;
}

let paginationIndicatior;

function changePaginationIndicatior() {
    paginationIndicatior.innerHTML = `${currentPage} of ${pageCount}`;
}

function nextPage() {
    if (nextPageElem.classList.contains('disabled'))
        return;

    currentPage++;

    deactivateButtons();
    changePaginationIndicatior();

    scrollCurrent();
}

function lastPage() {
    if (lastPageElem.classList.contains('disabled'))
        return;

    currentPage--;

    deactivateButtons();
    changePaginationIndicatior();

    scrollCurrent();
}

let taskDescriptions;

function addCutOffClass() {
    taskDescriptions.forEach(p => {
        const isOverflowing = p.clientHeight < p.scrollHeight
        const wraper = p.parentNode;
        if (isOverflowing)
            wraper.classList.add('cut-off');
        else if (wraper.classList.contains('cut-off'))
            wraper.classList.remove('cut-off')
    });
}