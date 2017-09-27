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
    var timeout = 0;
    timeout = (((promptData.days * 24 + promptData.hours) * 60 + promptData.minutes) * 60 + promptData.seconds) * 1000;

    var timeTillRun = millTilRuntime(promptData.time);

    git
    
    //start loop
    console.log("Interval set to " + timeout + " milliseconds \nBeginning timer");
    daFunction();
    setInterval(daFunction, timeout);
}

function promptUser(daFunction) {
    var settings = {
        properties: {
            days: {
                pattern: /\d+/g,
                message: "Value must be a number",
                type: 'integer',
                default: 0
            },
            hours: {
                pattern: /\d+/g,
                message: "Value must be a number",
                type: 'integer',
                default: 0
            },
            minutes: {
                pattern: /\d+/g,
                message: "Value must be a number",
                type: 'integer',
                default: 0
            },
            seconds: {
                pattern: /\d+/g,
                message: "Value must be a number",
                type: 'integer',
                default: 0
            }
        }
    };
    console.log("How frequently you like the program to run?");
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
