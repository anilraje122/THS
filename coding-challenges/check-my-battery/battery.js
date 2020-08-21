
// Decide what color needs to be applied for different battery levels
function fillBattery() {
    navigator.getBattery().then(function(battery) {
        var curBatLevel = battery.level * 100;
        if( curBatLevel <= 100 && curBatLevel >=80 ) {
            setColor('green', curBatLevel);
        }
        if( curBatLevel < 80 && curBatLevel >= 60 ) {
            setColor('yellow', curBatLevel);
        } 
        if( curBatLevel < 60 && curBatLevel >= 30 ) {
            setColor('orange', curBatLevel);
        }
        if( curBatLevel <30 && curBatLevel >=0 ) {
            setColor('red', curBatLevel);
        }
    });
}

// Apply decided color the battery portion
function setColor(color, curBatLevel) {
    document.getElementById('battery-percentage').innerText = `${curBatLevel}%`;
    if( color == 'red') {
        document.getElementById(color).style.background = '#d90429';
    }
    if( color == 'orange') {
        document.getElementById('red').style.background = '#fb5607';
        document.getElementById(color).style.background = '#fb5607';
    }
    if( color == 'yellow') {
        document.getElementById('red').style.background = '#f7b801';
        document.getElementById('orange').style.background = '#f7b801';
        document.getElementById(color).style.background = '#f7b801';
    }
    if( color == 'green') {
        document.getElementById('red').style.background = '#55a630';
        document.getElementById('orange').style.background = '#55a630';
        document.getElementById('yellow').style.background = '#55a630';
        document.getElementById(color).style.background = '#55a630';
    }
}

// Load DOM elements
window.addEventListener('DOMContentLoaded', fillBattery);