# Circuit Breaker

My solution for the ['Circuit Breaker' Challenge](https://platform.entwicklerheld.de/challenge/circuit-breaker?technology=JavaScript) on the [EntwicklerHeld](https://platform.entwicklerheld.de/) Code Challenge Platform.

## Description
Implement a circuit breaker pattern, that prevents function executions, via timeouts, if previous attempts failed

## Challenge Info
Data last updated: 2024-06-07
Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language
---|---|---|---|---|
▮▮▯▯ | ████░░░░░░ 43% | 70 / 162 | 2024-04-05 | JavaScript

## Comment
Initially attempted to solve this by using some timers that self-reset, whenever the timeouts are over. It would've worked, and that solution would've been a bit more elegant, but unfortunately the way the EH tests were constructed, this was not possible: The tests do not *actually* wait x seconds before re-trying to call the function in the circuit-breaker, *but* they are 'faking' the passed time, by passing modified currentDates as parameter. :-(