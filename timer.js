/*eslint-env node, es6*/
/*eslint no-console:0*/

const prompt = require('prompt');
const moment = require('moment');

/*****************************
 * millTilRuntime
 * @param {Int} runTime
 * 
 * Purpose: calculates time till the
 * first fun in milliseconds
 *****************************/
function millTilRuntime(runTime) {
   let now = moment()
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

      // Start loop IF repeat was set to more than 0
      if (timeout !== 0) {
         setInterval(daFunction, timeout);
      } else {
         console.log("Complete");
         return;
      }
   }

   // Calls runDaFunction after timeTilRun has passed
   console.log("First run will occur in " + timeTilRun + " milliseconds");
   console.log("Repeat set to " + timeout + " milliseconds");

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