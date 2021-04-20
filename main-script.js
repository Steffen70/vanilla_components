let onLoad = [];

//Execute all onLoad functions
window.onload = () => onLoad.forEach(f => f());