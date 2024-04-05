import {CircuitBreakerStates} from "./utils.js";

export class CircuitBreaker {
    state = CircuitBreakerStates.CLOSED;
    functionThatCouldFail = null;

    currentFailureCount = 0;
    callCount = 0;
    failTimeStamp = null;

    // default options
    options = {
        failureCount: 3, // if there are 3 failures in the timeWindow => open the circuit breaker
        timeWindow: 3000, // Should be closed after 3 failures
        resetTimeout: 10000 // After 10 seconds, try again.
    }

    constructor(functionThatCouldFail, options = null) {
        if (options) {
            this.options = options;
        }
        this.functionThatCouldFail = functionThatCouldFail;
    }

    failTimeDiff(currentDateTime) {
        return (this.failTimeStamp !== null) ? (currentDateTime - this.failTimeStamp) : 0
    }


    fire(currentDateTime, ...parameters) {
        this.callCount++;
        console.log()
        const timeDiff = this.failTimeDiff(currentDateTime);
        console.log("--- Call #", this.callCount, "currr", currentDateTime, this.state, this.failTimeStamp, this.currentFailureCount, timeDiff)
        // implement the timing feature

        if (this.state == CircuitBreakerStates.CLOSED) {
            try {
                this.functionThatCouldFail(...parameters);
                console.log("    --- successfully called");
                //this.failTimeStamp = null;
            }
            catch(err) {
                
                this.currentFailureCount++;
                console.log("    --- Failure #", this.currentFailureCount)

                if (this.currentFailureCount === 1) {
                    console.log("        --- first failure, start failTimeStamp")
                    this.failTimeStamp = currentDateTime;
                    return
                }

                console.log("    --- timedifff", timeDiff);

                if (this.currentFailureCount === this.options.failureCount && timeDiff < this.options.timeWindow) {
                    console.log(`    --- ${this.options.failureCount} failures within timeWindow: switching to OPEN`)
                    this.state = CircuitBreakerStates.OPEN;
                    this.failTimeStamp = currentDateTime;

                    return;
                }

            }
        }

        if (this.state == CircuitBreakerStates.HALF_OPEN) {
            console.log("    +++ half-open state")

            try {
                this.functionThatCouldFail(...parameters);
                this.state = CircuitBreakerStates.CLOSED;
            }
            catch(err) {
                //console.error(err);
                this.state = CircuitBreakerStates.OPEN;
                this.failTimeStamp = currentDateTime;

            }

        }



        if (this.state == CircuitBreakerStates.OPEN) {
            console.log("    +++ open state")
            const timeDiff = currentDateTime - this.failTimeStamp;
            console.log("    +++", timeDiff, `resetTimeout: ${this.options.resetTimeout}`)

            if (timeDiff > this.options.resetTimeout) {
                console.log("    +++", "resetting to halfopen")

                this.state = CircuitBreakerStates.HALF_OPEN;
                //this.fire(currentDateTime, ...parameters)
                try {
                    console.log("       +++ trying to call func in open")
                    this.functionThatCouldFail(...parameters);
                    this.state = CircuitBreakerStates.CLOSED;
                    this.failTimeStamp = null;
                    this.currentFailureCount = 0;
                    console.log("       +++ func OK -> switching to CLOSED")

                }
                catch(err) {
                    console.log("       +++ calling fucntion in halfopen failed -> back to Open again")
                    this.state = CircuitBreakerStates.OPEN;
                    this.failTimeStamp = currentDateTime;
                }
                return
            }
            else if (timeDiff <= this.options.resetTimeout) {
                console.log("    +++ stil in timeout")

            }
            else {
                console.log("    +++ stil in timeout in else")
            }


        }
    }

}
