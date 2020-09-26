/**********************************************

Find weekends in a Month for the Year 2020

Input : Jan
Output : 4 weekends

Input : Feb
Output : 3 weekends

***********************************************/

// Imports
const rls = require('readline-sync');

// Main function
main = () => {
    const year = 2020;
    console.log('\n-- Find Weekends --');
    const userInput = rls.question('\nEnter a month (In this format : jan/feb) : ').toLowerCase();
    let weekends = findWeekends(userInput, year);
    console.log('\nWeekend Dates : ');
    console.log(weekends);
    console.log(`\nTotal Number of Weekends : ${weekends.length}`);
}

findWeekends = (month, year) => {
    let weekends = [];
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let totalDaysMonth = new Date(year, months.indexOf(month)+1, 0).getDate();
    for(let day=1; day<=totalDaysMonth; day++) {
        let curDayInWeek = new Date(year, months.indexOf(month), day).getDay();
        if(curDayInWeek === 6) {
            weekends.push(day);
        } 
    }
    return weekends;
}

main();