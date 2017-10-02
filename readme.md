### Explanation ###
This module is used to schedule and repeat node scripts. 
Currently it prompts for the days, hours, minutes, and seconds you would like to wait between runs.
It repeats until the end of time. Or the next power outage.

### Usage ###

```
var timer = require('timer');
timer(function)
```

A series of prompts will ask when you would like the first run to occur at, as well ashow often you would like to repeat the given task. The defaults for these values result in running the task immediately one time.

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