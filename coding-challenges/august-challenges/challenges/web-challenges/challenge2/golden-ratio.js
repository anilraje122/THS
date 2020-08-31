// set width and height of all rectangles(div's) as per golden ratio
setGoldenRatio = (noOfDivs) => {
    addNestedDivs(noOfDivs); // add rectangle div's
    let w = 900;
    let h = 555;
    for(let i=1; i<=noOfDivs; i++) {
        if(i === 1) { // set width and height for first (outer) rectangle
            document.getElementById(`div${i}`).style.width = `${w}px`;
            document.getElementById(`div${i}`).style.height = `${h}px`;
            document.getElementById(`div${i}`).style.background = getRandomColor();
            continue;
        }
        if(i%2 === 0) { // set width and height for all even rectangles
            w = Math.floor(h/1.62);
            document.getElementById(`div${i}`).style.width = `${w}px`;
            document.getElementById(`div${i}`).style.height = `${h}px`;
            document.getElementById(`div${i}`).style.background = getRandomColor();
        } else { // set width and height for all odd rectangles
            w = Math.floor(h/1.62);
            h = Math.floor(w/1.62);
            document.getElementById(`div${i}`).style.width = `${w}px`;
            document.getElementById(`div${i}`).style.height = `${h}px`;
            document.getElementById(`div${i}`).style.background = getRandomColor();
        }
    }
}

// add nested divisions
addNestedDivs = (noOfDivs) => {
    document.getElementById('outputDiv').innerHTML = '<div id="div1"></div>';
    for(let i=1; i<noOfDivs; i++) {
        document.getElementById(`div${i}`).innerHTML = `<div id="div${i+1}"></div>`;
    }
}

// Get random hexadecimal color codes 
getRandomColor = () => {
    let hexArr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    let colorCode = '#';
    for (let i=0; i<6; i++) {
        colorCode += hexArr[Math.floor(Math.random()*16)];
    }
    console.log(colorCode);
    return colorCode;
}

// Load all DOM objects
window.addEventListener("DOMContentLoaded", setGoldenRatio(6));