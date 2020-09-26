// Global vars
let app = document.querySelector('#app');
let tzList = [];
let myList;
let btn;
let op;

// Create Element
createElements = () => {
    let pageHeading = document.createElement('h2');
    pageHeading.innerText = "Find Tomorrow's Date";
    app.appendChild(pageHeading);

    myList = document.createElement('select');
    app.appendChild(myList);
    fillList();

    btn = document.createElement('button');
    let btnTxt = document.createTextNode("Get Tomorrow's Date");
    btn.appendChild(btnTxt);
    app.appendChild(btn);
    btn.addEventListener("click", findTomDate);

    op = document.createElement('p');
    app.appendChild(op);
}

// Create a drop down list
fillList = () => {
    for(let i=0; i<tzList.length; i++) {
        let op = document.createElement('option');
        op.text = tzList[i];
        op.value = tzList[i];
        myList.appendChild(op);
    }
    app.appendChild(myList);
}

// Get TZ
render = () => {
    axios.get('http://worldtimeapi.org/api/timezone')
    .then((res)=> {
        tzList = res.data;
        createElements();
    })
    .catch((err) => {
        console.log('Error: Unable to find the time!');
        console.log(err);
    })
}

// Find tom date
findTomDate = () => {
    let tom = new Date();
    let selectedTz = document.querySelector('select').value;
    tom.setDate(new Date().getDate() + 1)
    let tomNewTz = tom.toLocaleString('en-US', { timeZone: selectedTz });
    document.querySelector('p').innerHTML = `<p> Tomorrow's Time in ${selectedTz} : ${tomNewTz} </p>`;
}

render();