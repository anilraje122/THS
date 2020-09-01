// Add or remove video controls. Eg: Play/Pause
addRemControls = () => {
    let myVideo = document.getElementById('myVideo');
    if(myVideo.controls) {
        myVideo.controls = false;
    } else {
        myVideo.controls = true;
    }
}

// Enable or disable auto play
enaDisAutoPlay = () => {
    let myVideo = document.getElementById('myVideo');
    if(myVideo.autoplay) {
        myVideo.autoplay = false;
        myVideo.load();
    } else {
        myVideo.autoplay = true;
        myVideo.load();
    }    
}
