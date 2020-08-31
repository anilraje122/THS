// initializing second, minute and hour variables
s = 0;
m = 0;
h = 0;
myTimer = null;
var audio = new Audio('./media/fast_timer.mp3');

// background music
ticTicMusic = (playStop) => {
    switch (playStop) {
        case 'play': 
            audio.play();
            break;    
        case 'stop' : 
            audio.pause();
            break;
        default:
            audio.pause();
            break;
    }
}

// update specific html tag with latest values
updateHtmlText = (ele, val) => {
    if(val.toString(10).length === 1) {
        document.getElementById(`${ele}`).innerText = '0'+val;
    } else {
        document.getElementById(`${ele}`).innerText = val;
    }
}

// Below is ther counter logic of stopwatch
myCounter = () => {
    if(s === 59 && m === 59 && h === 59) {
        return;
    }  
    if(s === 59 && m === 59) {
        updateHtmlText('hh', ++h);
        s = 0;
        myCounter();
    }
    if(s === 59) {
        updateHtmlText('mm', ++m);
        s = 0;
        myCounter();
    }         
    updateHtmlText('ss', ++s);
    document.getElementById('btnStart').disabled = true;
    document.getElementById('btnPause').disabled = false;
    
    if(s || m || h) {
        document.getElementById('btnStart').innerHTML = "Resume";
    } else {
        document.getElementById('btnStart').innerHTML = "Start/Resume";
    }
    ticTicMusic('play');
}

// Pause button actions goes here
pauseMyCounter = () => {
    ticTicMusic('stop');
    if(myTimer === null) {
        return;
    } else {
        clearInterval(myTimer);
        document.getElementById('btnStart').disabled = false;
        if(s || m || h) {
            document.getElementById('btnPause').disabled = true;
        }
    }
}

// reset button actions goes here
resetMyCounter = () => {
    ticTicMusic('stop');
    if(myTimer === null) {
        return;
    } else {
        clearInterval(myTimer);
        s = 0;
        m = 0;
        h = 0;
        updateHtmlText('ss', s);
        updateHtmlText('mm', m);
        updateHtmlText('hh', h);
        
        document.getElementById('btnStart').disabled = false;
        document.getElementById('btnPause').disabled = false;
        document.getElementById('btnStart').innerHTML = "Start/Resume";
    }   
}