/*eslint-env node, es6*/
/*eslint no-console:0*/

const prompt = require('prompt'),
    moment = require('moment');

function millTilRuntime(runTime) {

    var now = moment(),
        difference;

    runTime = moment(runTime, 'hh:mm a');
    difference = runTime.diff(now);

    if (difference < 0) {
        // add 1 day worth of miliseconds.
        difference = runTime.add(1, 'day').diff(now);
    }
    return difference;
}

function convertValues(promptData, daFunction) {
    var timeout = 0,
        timeTilRun = millTilRuntime(promptData.time);

    timeout = (((promptData.days * 24 + promptData.hours) * 60 + promptData.minutes) * 60 + promptData.seconds) * 1000;

    function runDaFunction() {
        daFunction(); //IS THIS STILL NEEDED????
        //start loop
        console.log("Interval set to " + timeout + " milliseconds \nBeginning timer");
        setInterval(daFunction, timeout);
    }


    console.log("First run will occur in " + timeTilRun + " milliseconds");
    setTimeout(runDaFunction, timeTilRun);
}

function promptUser(daFunction) {
    var settings = {
        properties: {
            time: {
                pattern: /^\d?\d:\d\d [AP]M?$/i,
                default: moment().format('hh:mm a'),
                message: "Please follow the pattern hh:mm AM/PM"
            },
            days: {
                pattern: /^\d+$/,
                message: "Value must be a number",
                type: 'integer',
                default: 0
            },
            hours: {
                pattern: /^\d+$/,
                message: "Value must be a number",
                type: 'integer',
                default: 0
            },
            minutes: {
                pattern: /^\d+$/,
                message: "Value must be a number",
                type: 'integer',
                default: 0
            },
            seconds: {
                pattern: /^\d+$/,
                message: "Value must be a number",
                type: 'integer',
                default: 0
            }
        }
    };
    console.log("What time of day would you like the program to run? (ex: hh:mm AM/PM) " +
        "How frequently you like the program to run?");
    prompt.start();
    prompt.get(settings, function (err, results) {
        if (err) {
            console.error(err);
            return;
        }
        convertValues(results, daFunction);
    });
}

module.exports = promptUser;
