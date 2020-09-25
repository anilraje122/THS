// Global var declaration
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Get output element into a variable
let app = document.querySelector('#app');

// Add heading to the page
app.innerHTML = '<h3 class="text-center"> Calendar 2020 </h3>';

// Create month grid
createMonthGrid = (year, month) => {
    let totalDaysMonth = findDaysInMonth(year, month);
    let startDay = findStartDayInMonth(year, month);
    let totalWeeksMonth = findTotalWeeksMonth(startDay, year, month);
    const daysOfWeek = ['Sun', 'Mon', "Tue", 'Wed', 'Thu', 'Fri', 'Sat'];
    let day = 1;
    let dayCounter = 0;
    let monthTable = `
        <table class="text-center"> 
            <tr>
                <th colspan="7" class="text-center table-heading">${months[month]} ${year}</th>
            </tr>
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>   
        `;
    for(let i=0; i<totalWeeksMonth; i++) {        
        monthTable += '<tr>';
        for(let j=0; j<daysOfWeek.length; j++){
            if(i == 0) {
                if(dayCounter < startDay) {
                    monthTable += `<td></td>`;
                } else {
                    if(isSunday(year, month, day)) {
                        monthTable += `<td class="text-danger">${day}</td>`;
                    } else {
                        monthTable += `<td>${day}</td>`;
                    }
                    day++;
                }
                dayCounter++;
            } else {
                if(day <= totalDaysMonth) {
                    if(isSunday(year, month, day)) {
                        monthTable += `<td class="text-danger">${day}</td>`;
                    } else {
                        monthTable += `<td>${day}</td>`;
                    }
                } else { 
                    monthTable += `<td></td>`;
                }
                day++;
            }
        }
        monthTable += '</tr>';
    }
    monthTable += '</table>';
    return monthTable;
}

// Find total weeks in a month
findTotalWeeksMonth = (startDay, year, month) => {
    let totalDaysMonth = findDaysInMonth(year, month);
    if(startDay > 4 && totalDaysMonth >= 30) {
        return 6;
    } else if(startDay > 4 && totalDaysMonth <= 29) {
        return 5;
    } else if(startDay === 0 && totalDaysMonth === 28) {
        return 4;
    } else {
        return 5;
    }
}

// Find total days in a month
findDaysInMonth = (year, month) => {
    // getDate require month index to start from 1
    return new Date(year, month+1, 0).getDate();
}

// Find first day in a month : returns day index of a week (0: sun, 1: mon, etc.)
findStartDayInMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
}

// return true if the input is a Sunday
isSunday = (year, month, day) => {
    let dayOfTheWeek = new Date(year, month, day).getDay();
    return (dayOfTheWeek === 0);
}

// Create year grid 
createYearGrid = (year) => {
    for(let monthIndex=0; monthIndex<months.length; monthIndex++) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = createMonthGrid(year, monthIndex);
        app.appendChild(newDiv);
    }
}
createYearGrid(2020);