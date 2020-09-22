const axios = require('axios');
const fs = require('fs');

function getIp() {
    return axios.get('http://api.ipify.orgg/?format=json');
}

getIp()
.then((res) => {
    fs.writeFile('IP_log.txt', res.data.ip, (err)=> {
        if(err) {
            throw err;
        }
        console.log('Result stored in IP_log.txt');
    });
})
.catch((err) => {
    console.log("Error Occured!");
});