// find ASCII character of user input
asciiFinder = () => {
    let asciiChars = [];
    inputText = document.getElementById('inputText').value;
    for(let i=0; i<inputText.length; i++) {
        asciiChars.push(inputText[i].charCodeAt(0));
    }
    document.getElementById('output').innerText = asciiChars.join(',');
}

// clear all inputs
clearInputs = () => {
    document.getElementById('output').innerText = "";
    document.getElementById('inputText').value = "";
}