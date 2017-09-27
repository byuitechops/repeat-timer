/*eslint-env node*/
/*eslint no-console:0*/

var prompt = require('prompt');
var moment = require('moment');

function convertValues(promptData, daFunction) {
    var timeout = 0;
    timeout = (((promptData.days * 24 + promptData.hours) * 60 + promptData.minutes) * 60 + promptData.seconds) * 1000;

    //start loop
    console.log("Interval set to " + timeout + " milliseconds \nBeginning timer");
    moment.
    daFunction();
    setInterval(daFunction, timeout);
}

function promptUser(daFunction) {
    var settings = {
        properties: {
            time: {
                pattern: /^\d?\d:\d\d [AP]M?$/i,
                default: 'now',
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
