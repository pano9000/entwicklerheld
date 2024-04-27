# Hacking a Slot Machine

My solution for the ['Hacking a Slot Machine' Challenge](https://platform.entwicklerheld.de/challenge/hacking-a-slot-machine?technology=Python) on the [EntwicklerHeld](https://platform.entwicklerheld.de/) Code Challenge Platform.

## Description
Change the behaviour of a slot machine to become a bit more 'unfair' after a few special cases

## Challenge Info
Data last updated: 2024-04-27
Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language
---|---|---|---|---|
▮▮▯▯ | ████░░░░░░ 37% | 330 / 893 | 2024-03-17 | Python

## Comment
This should've been easily solved, but the tests cases were a bit weird/illogic, which made life unnecessarily harder:

For phase 3 you are supposed to alter the machine, so that the average payout is lowered significantly, when compared to the default payout rate. A logical approach here would be to calculate some payout average inside the class and use that to alter if the next play(s) result in a win or a loss. However the way the tests are build prevent this: The test creates a snapshot of the slot machine after phase 2 and then calculates its own average, doing 10k runs -> but resetting the state at each iteration back to phase 2. This make it impossible to have a 'built-in' long-term average attribute on the slot-machine class, which would've been a nicer way to handle phase 3.