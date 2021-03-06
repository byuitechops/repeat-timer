/*eslint-env node, es6*/
/*eslint no-console:0*/

const prompt = require('prompt');
const moment = require('moment');
const chalk = require('chalk');

const daPackage = require('../../package.json');

/*****************************
 * millTilRuntime
 * @param {Int} runTime
 * 
 * Purpose: calculates time till the
 * first fun in milliseconds
 *****************************/
function millTilRuntime(runTime) {
    let now = moment();
    let difference;

    if (runTime === 'Now') {
        return 0;
    }

    runTime = moment(runTime, 'hh:mm a');
    difference = runTime.diff(now);

    if (difference < 0) {
        /* Add 1 day worth of miliseconds */
        difference = runTime.add(1, 'day').diff(now);
    }
    return difference;
}

/*************************************
 * convertValues
 * @param {Obj} promptData
 * @param {Function} daFunction
 * 
 * converts days, hours, minutes, and 
 * seconds to millseconds 
 ************************************/
function convertValues(promptData, daFunction) {
    var timeout = 0;
    let timeTilRun = millTilRuntime(promptData.time);

    timeout = (((promptData.days * 24 + promptData.hours) * 60 + promptData.minutes) * 60 + promptData.seconds) * 1000;

    /*******************************************
    * Runs the function provided to the module
    ******************************************/
    function runDaFunction() {
        /* setInterval runs the first time after waiting the specified time.
      This line runs the function immediately and then starts counting*/
        daFunction();

        /* Start loop IF repeat was set to more than 0 */
        if (timeout !== 0) {
            setInterval(daFunction, timeout);
        } else {
            console.log('Complete');
            return;
        }
    }

    /* Calls runDaFunction after timeTilRun has passed */
    console.log('First run will occur in ' + timeTilRun + ' milliseconds');
    console.log('Repeat set to ' + timeout + ' milliseconds');

    setTimeout(runDaFunction, timeTilRun);
}

/***********************************
 * promptUser
 * @param {Function} daFunction
 * 
 * Purpose: Get repeat and scheduling info from user. calls convert values
 **********************************/
function promptUser(daFunction) {
    let settings = {
        properties: {
            time: {
                pattern: /^(Now)|(\d?\d:\d\d [AP]M?)$/i,
                default: 'Now',
                message: 'Please follow the pattern hh:mm AM/PM'
            },
            days: {
                pattern: /^\d+$/,
                message: 'Value must be a number',
                type: 'integer',
                default: 0
            },
            hours: {
                pattern: /^\d+$/,
                message: 'Value must be a number',
                type: 'integer',
                default: 0
            },
            minutes: {
                pattern: /^\d+$/,
                message: 'Value must be a number',
                type: 'integer',
                default: 0
            },
            seconds: {
                pattern: /^\d+$/,
                message: 'Value must be a number',
                type: 'integer',
                default: 0
            }
        }
    };

    console.log('What time of day would you like the program to run? (ex: hh:mm AM/PM) ' +
      'How frequently you like the program to run?');
    prompt.start();

    prompt.get(settings, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
        convertValues(results, daFunction);
    });
}

/*******************************************
 * Ensure repeat settings from Package.json
 * are valid. revert to prompt if not
 ******************************************/
function validatePackageInput(key, object) {
    let prop = object[key];

    if (key === 'time' && !/^(?:[1-9]|1[0-2]):[1-5]\d?\s(?:a|p)$/.test(prop)) {
        throw new Error('Unable to determine runtime based on package.json reverting to prompt');

    } else {
        /* prop must be num */
        prop = Number.isNaN(Number.parseFloat(prop)) ? 0 : Number.parseFloat(prop);
    }

    return prop;
}


/****************************************************
 * Add missing fields to package.json repeat object.
 * Validate existing fields
 ****************************************************/
function formatPackageSettings(settings, daFunction) {
    const requiredKeys = ['time', 'days', 'hours', 'minutes', 'seconds'];

    try {
        requiredKeys.forEach(requiredKey => {
            if (!settings[requiredKey]) {
                settings[requiredKey] = 0;
            } else {
                settings[requiredKey] = validatePackageInput(requiredKey, settings);
            }
        });

        convertValues(settings, daFunction);
    } catch (validationErr) {
        console.warn(chalk.yellow(validationErr));
        promptUser(daFunction);
    }
}


/*******************************************************
 * Start Here. Checks for repeat object in package.json
 * and calls prompt if none exist
 ********************************************************/
function init(daFunction) {
    if (!daPackage.repeat || process.argv.includes('-p'))
        promptUser(daFunction);
    else
        formatPackageSettings(daPackage.repeat, daFunction);
}

module.exports = init;