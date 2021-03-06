## Explanation
This module is used to schedule and repeat node scripts. 
Currently it prompts for the days, hours, minutes, and seconds you would like to wait between runs.
It repeats until the end of time. Or the next power outage.

## Installation
Run the following script to install the module:
```
npm i --save byuitechops/repeat-timer
```

## Usage

``` js
const timer = require('timer');
timer(function)
```

### Arguments
| Flag | Description |
|------|-------------|
| -p   | Enables the prompt and overwrites the settings in package.json |

### Prompt
A series of prompts will ask when you would like the first run to occur at, as well as how often you would like to repeat the given task. The defaults for these values result in running the task immediately one time.

```
What time of day would you like the program to run? (ex: hh:mm AM/PM) How frequently you like the program to run?
prompt: time:  (Now)
prompt: days:  (0)
prompt: hours:  (0)
prompt: minutes:  (0)
prompt: seconds:  (0)
First run will occur in 0 milliseconds
Repeat set to 0 milliseconds
YOUR FUNCTION RUNS HERE
Complete
```

If you know you'll always use the same settings, you can include them in the package.json file and avoid filling out the prompt each time your module starts. Any properties that are missing from the object will be set to their default values. The object should have the following format:
```json
"repeat": {
    "time": "9:45 a",
    "days": 1,
    "hours": 1,
    "minutes": 1,
    "seconds": 1
  }
```
