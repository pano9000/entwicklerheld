import {CircuitBreakerStates} from "./utils.js";

export class CircuitBreaker {
    state = CircuitBreakerStates.CLOSED;
    functionThatCouldFail = null;
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

    fire(currentDateTime, ...parameters) {
        // implement this
    }
}
