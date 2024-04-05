import {CircuitBreakerStates} from "./utils.js";

export class CircuitBreaker {
    state = CircuitBreakerStates.CLOSED;
    functionThatCouldFail = null;

    currentFailureCount = 0;
    callCount = 0;
    failTimeStamp = null;

    lastExecutionTimeStamp = null;

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

    /**
     * @returns Number
     */
    get #failTimeDiff() {
        return (this.failTimeStamp === null || this.lastExecutionTimeStamp === null)
               ? 0 
               : (this.lastExecutionTimeStamp - this.failTimeStamp)
    }

    /**
     * @returns Boolean
     */
    get #isFailureInTimeWindow() {
        return this.#failTimeDiff < this.options.timeWindow;
    }

    /**
     * @returns Boolean
     */
    get #isInTimeout() {
        return this.#failTimeDiff <= this.options.resetTimeout
    }

    #updateStates(newState, newFailTimeStamp, newFailureCount) {
        this.state = newState;
        this.failTimeStamp = newFailTimeStamp;
        this.currentFailureCount = newFailureCount || this.currentFailureCount;
    }

    #handleState(currentDateTime, ...parameters) {

        switch (this.state) {
            case CircuitBreakerStates.CLOSED:

                if (this.#executeFunction(...parameters) === true) {
                    return new CircuitBreakerExecutionResult(true, this.state)
                }

                this.currentFailureCount++;
                
                if (this.currentFailureCount === 1) {
                    this.failTimeStamp = currentDateTime;
                    return new CircuitBreakerExecutionResult(false, this.state, this.currentFailureCount)
                }
    
                if (this.currentFailureCount >= this.options.failureCount && this.#isFailureInTimeWindow) {
                    this.#updateStates(CircuitBreakerStates.OPEN, currentDateTime)
                }
                return new CircuitBreakerExecutionResult(false, this.state, this.currentFailureCount)


            case CircuitBreakerStates.HALF_OPEN:

                if (this.#executeFunction(...parameters) === true) {
                    this.#updateStates(CircuitBreakerStates.CLOSED, null, 0);
                    return new CircuitBreakerExecutionResult(true, this.state)

                }
    
                this.#updateStates(CircuitBreakerStates.OPEN, currentDateTime)
                return new CircuitBreakerExecutionResult(false, this.state, this.currentFailureCount)


            case CircuitBreakerStates.OPEN:

                if (this.#isInTimeout) {
                    return new CircuitBreakerExecutionResult(false, this.state, this.currentFailureCount)
                }
    
                this.state = CircuitBreakerStates.HALF_OPEN;

                if (this.#executeFunction(...parameters) === true) {
                    this.#updateStates(CircuitBreakerStates.CLOSED, null, 0)
                    return new CircuitBreakerExecutionResult(true, this.state)
                }
    
                this.#updateStates(CircuitBreakerStates.OPEN, currentDateTime)
                return new CircuitBreakerExecutionResult(false, this.state, this.currentFailureCount)
        }

    }

    #executeFunction(...parameters) {
        try {
            this.functionThatCouldFail(...parameters);
            return true;
        }
        catch(err) {
            return false;
        }
    }


    fire(currentDateTime, ...parameters) {
        this.callCount++;
        this.lastExecutionTimeStamp = currentDateTime;
        this.#handleState(currentDateTime, ...parameters);
    }

}

class CircuitBreakerExecutionResult {
    success;
    stateAfterExecution;
    currentFailureCount;
    constructor(success, stateAfterExecution, currentFailureCount = 0) {
        this.success = success;
        this.stateAfterExecution = stateAfterExecution;
        this.currentFailureCount = currentFailureCount 
    }
}