// Fill hour, minute and second select tags with values
fillTimeSelectors = () => {
    fillAndAdd(1, 12, 'timeSelectHH');
    fillAndAdd(0, 59, 'timeSelectMM');
}

// Padd zeros of it is a single digit
paddZero = (n) => {
    return (n<10) ? '0'+n : n;
}

// Add new options to existing select tag
fillAndAdd = (start, end, selectId) => {
    for(let i=start; i<=end; i++) {
        let option = document.createElement("option");
        option.text = paddZero(i);
        document.getElementById(selectId).add(option);
    }
}

// Set AM or PM
setAmPm = (hh) => {
    if(hh >= 12) {
        return 'PM';
    }
    return 'AM';
}

// Convert 24hr to 12hr
convert24to12 = (hh) => {
    if(hh > 12) {
        hh -= 12;
    } else if(hh === 0) {
        hh = 12;
    }
    return hh;
}

// Play alarm sound
playStopAlarmMusic = (action) => {
    let musicEle = document.getElementById('alarmMusic');
    if(action === 'play') {
        musicEle.play();
    } 
    if(action === 'stop') {
        musicEle.pause();
    }
}

// Alarm logic goes here
alarm = () => {
    let userSelHH;
    let userSelMM;
    let userSelAmPm;

    // Getting user inputs and initializing the variables
    setAlarm = () => {
        userSelHH = document.getElementById('timeSelectHH').value;
        userSelMM = document.getElementById('timeSelectMM').value;
        userSelAmPm = document.getElementById('timeSelectAmPm').value;
        document.getElementById('outputMsgHead').innerText = `Next Alarm : ${userSelHH}:${userSelMM} ${userSelAmPm}`;
        console.log(userSelHH, userSelMM, userSelAmPm);
    }
    setAlarm();

    // Ring the alarm if the input matches with the current time
    setInterval(function () {
        let d = new Date();
        let hh = d.getHours();
        let amPm = setAmPm(hh);
        hh = convert24to12(hh);
        let mm = d.getMinutes();
        let ss = d.getSeconds();
        if(hh == userSelHH && mm == userSelMM && amPm == userSelAmPm) {
            document.getElementById('outputMsgBody').innerText = "Alarm Active! Ring Ring!!";
            playStopAlarmMusic('play');
        } else {
            document.getElementById('outputMsgBody').innerText = "";
            playStopAlarmMusic('pause');
        }
    }, 1000);       
}


// Clock display 
clockDisplay = () => { 
    fillTimeSelectors();    
    setInterval(function () {
        let d = new Date();
        let hh = d.getHours();
        let amPm = setAmPm(hh);
        hh = convert24to12(hh);
        let mm = d.getMinutes();
        let ss = d.getSeconds();
        document.getElementById('outputTime').innerText = `${paddZero(hh)} : ${paddZero(mm)} : ${paddZero(ss)} ${amPm}`;
    }, 1000);    
}