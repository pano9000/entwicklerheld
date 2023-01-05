# Matching Clients

My solution for the ['Matching Clients' Challenge](https://platform.entwicklerheld.de/challenge/challenge) on the [Entwicklerheld](https://platform.entwicklerheld.de/) Code Challenge Platform.

Description
---
The goal is to create an algorithm for finding and merging "similar clients", based on the provided client information (first name, last name, phone, etc.). 
E.g. when a user creates a new account the provided information should be checked and determine, if they are indeed a new user, or if we can find an already existing matching account for that user.
Depending on that either create or update the client in the  "Client Database".
Bonus task is to also implement a "fuzzy/soft matching" to also detect and match clients even with typos or small deviations in the client info.

Challenge Info
---
* Difficulty Level according to Entwicklerheld: `2/4 (Medium)`
* Originally solved on `2022-Jun-19`.

Comment
---
Interesting challenge, overall. The "fuzzy/soft matching" part was a a bit more challenging, due to the fact that you would need to somehow match smaller typos with the correct entry. My solution for that was to incorporate `Levenshtein Distance` calculations, which calculates the difference between two strings, and allowed to do some "soft matching" this way.