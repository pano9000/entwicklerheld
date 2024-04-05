import {CircuitBreaker} from "../circuit-breaker-javascript.js";
import {CircuitBreakerStates} from "../utils.js";


beforeEach(() => {
    howOftenFunctionWasCalled = 0;
    console.log("##polylith[testStarted");
});

afterEach(() => {
    console.log("##polylith[testFinished")
});

test('first scenario', () => {
    // GIVEN
    const startingDateTime = new Date(2018, 12, 10, 5, 20, 0);

    const functionThatSometimesFails = () => {
        howOftenFunctionWasCalled += 1
        if (!funtionSuccessfully) {
            throw new Error("Error while running function");
        }
    }
    const resetTimeOut = 10000; // 10 seconds

    const options = {
        failureCount: 3, // if there are 3 failures open the circuit breaker
        timeWindow: 3000, // Should be closed after 3 failures
        resetTimeout: resetTimeOut // After 10 seconds, try again.
    };

    // WHEN
    const circuitBreakerOfUser = new CircuitBreaker(functionThatSometimesFails, options);

    // First try success
    callCircuitBreakerFunction(
        "First call of the function is successful in second 0, so everything should be fine and the circuitbreaker should be closed",
        circuitBreakerOfUser, true, startingDateTime, CircuitBreakerStates.CLOSED)

    // Second try one second later unsuccessful
    callCircuitBreakerFunction(
        "Second call of the function in second 1 is unsuccessful and the circuitbreaker should be still open because it only should be closed when there are 3 failures in 3 seconds",
        circuitBreakerOfUser, false, addSeconds(startingDateTime, 1), CircuitBreakerStates.CLOSED)

    // Third try one second later unsuccessful
    callCircuitBreakerFunction(
        "Third call of the function in second 2 is unsuccessful and the circuitbreaker should be still open because it only should be closed when there are 3 failures in 3 seconds",
        circuitBreakerOfUser, false, addSeconds(startingDateTime, 2), CircuitBreakerStates.CLOSED)

    // Fourth try half a second later successful
    callCircuitBreakerFunction(
        "Fourth call of the function in second 3 is unsuccessful, circuit breaker should be in OPEN state, because the function failed three times in the time window.",
        circuitBreakerOfUser, false, addSeconds(startingDateTime, 3), CircuitBreakerStates.OPEN, true
    );

    // CIRCUIT BREAKER IS CLOSED NOW
    let failureDateTime = addSeconds(startingDateTime, 3);


    // Fifth try one second later unsuccessful
    callCircuitBreakerFunction(
        "Fifth call one second later unsuccessful but should still be in OPEN state, because there is a 10 seconds timeout",
        circuitBreakerOfUser, false, addSeconds(failureDateTime, 1), CircuitBreakerStates.OPEN)

    // Sixth try a second later successful
    callCircuitBreakerFunction(
        "Sixth call half a second later unsuccessful, circuit breaker should still be in OPEN state, because there is a 10 seconds timeout",
        circuitBreakerOfUser, false, addSeconds(failureDateTime, 2), CircuitBreakerStates.OPEN
    );

    // Seventh try half a second later unsuccessful now the circuit breaker should change in the open state
    callCircuitBreakerFunction(
        "Seventh call one second later unsuccessful now the circuit breaker should change in the open state, because there is a 10 seconds timeout",
        circuitBreakerOfUser, false, addSeconds(failureDateTime, 3), CircuitBreakerStates.OPEN)

    // CIRCUIT BREAKER STILL OPEN (SINCE ANOTHER ERROR)

    let secondFailureDateTime = addSeconds(failureDateTime, 11);
    callCircuitBreakerFunction(
        "Eighth call 11seconds after first error: Now the circuit breaker extends his timeout another 10 seconds. The circuit breaker should called the function in the half open state. But the function was unsuccessful. So the circuit breaker should be in the open state again.",
        circuitBreakerOfUser, false, secondFailureDateTime, CircuitBreakerStates.OPEN, true
    );

    callCircuitBreakerFunction(
        "Ninth try one second later successful now the circuit breaker should change in the half open state, because there is a 10 seconds timeout",
        circuitBreakerOfUser, false, addSeconds(secondFailureDateTime, 5), CircuitBreakerStates.OPEN);

    callCircuitBreakerFunction(
        "Tenth call 11 seconds after last timeout: Now the circuit breaker should first go into the half open state and then into the closed state, because the function was successful.",
        circuitBreakerOfUser, true, addSeconds(secondFailureDateTime, 11), CircuitBreakerStates.CLOSED);

});

test('second scenario', () => {
    // GIVEN
    const startingDateTime = new Date(2020, 5, 15, 10, 30, 0);

    const functionThatSometimesFails = () => {
        howOftenFunctionWasCalled += 1
        if (!funtionSuccessfully) {
            throw new Error("Error while running function");
        }
    }
    const resetTimeout = 5000; // 5 seconds
    const timeWindow = 5000; // 5 seconds

    const options = {
        failureCount: 2, // If there are 2 failures, open the circuit breaker
        timeWindow: timeWindow, // Count failures within a 5-second window
        resetTimeout: resetTimeout // Retry after 5 seconds.
    };

    // WHEN
    const circuitBreakerOfUser = new CircuitBreaker(functionThatSometimesFails, options);

    // First attempt: Successful
    callCircuitBreakerFunction(
        "First call of the function is successful. The circuit breaker should be closed.",
        circuitBreakerOfUser, true, startingDateTime, CircuitBreakerStates.CLOSED);

    // Second attempt: Failed
    callCircuitBreakerFunction(
        "Second call of the function is unsuccessful. The circuit breaker should still be closed since it should only open after 2 failures.",
        circuitBreakerOfUser, false, addSeconds(startingDateTime, 1), CircuitBreakerStates.CLOSED);

    // Third attempt: Successful
    callCircuitBreakerFunction(
        "Third call of the function is successful. The circuit breaker should still be closed since it should only open after 2 failures.",
        circuitBreakerOfUser, true, addSeconds(startingDateTime, 2), CircuitBreakerStates.CLOSED);

    // Fourth attempt: Failed
    callCircuitBreakerFunction(
        "Fourth call of the function is unsuccessful. The circuit breaker should now be open since it should open after 2 failures within a 5-second window.",
        circuitBreakerOfUser, false, addSeconds(startingDateTime, 3), CircuitBreakerStates.OPEN, true);

    // Fifth attempt: Failed
    callCircuitBreakerFunction(
        "Fifth call of the function is unsuccessful. The circuit breaker should still be open since it should only retry after the resetTimeout of 5 seconds.",
        circuitBreakerOfUser, false, addSeconds(startingDateTime, 8), CircuitBreakerStates.OPEN);

    // Sixth attempt: Successful
    callCircuitBreakerFunction(
        "Sixth call of the function is successful. The circuit breaker should now transition to the closed state since it succeeded after the resetTimeout.",
        circuitBreakerOfUser, true, addSeconds(startingDateTime, 15), CircuitBreakerStates.CLOSED);
});





// variable to set if the function should work or not is
let funtionSuccessfully = true;
let howOftenFunctionWasCalled = 0;
const callCircuitBreakerFunction = (errorMessage, circuitBreaker, functionShouldBeSuccessfully, datetime, expectedState, forceCallCheck = false) => {
    const howOftenFunctionWasCalledBefore = howOftenFunctionWasCalled;
    funtionSuccessfully = functionShouldBeSuccessfully;
    try {
        circuitBreaker.fire(datetime, "Erika", "Mustermann")

    } catch (thrownError) {
        // do nothing
    }
    expect(circuitBreaker.state, errorMessage).toBe(expectedState);
    if (circuitBreaker.state === CircuitBreakerStates.CLOSED || forceCallCheck) {
        expect(howOftenFunctionWasCalled, "CircuitBreaker should be in Closed or 'Half Open' state, so you should run the given function.").toBe(howOftenFunctionWasCalledBefore + 1);
    } else {
        expect(howOftenFunctionWasCalled, "Function should not be called because the state of the Circuit Breaker is open.").toBe(howOftenFunctionWasCalledBefore);
    }

}

const addSeconds = (date, seconds) => {
    return new Date(date.getTime() + seconds * 1000);
}