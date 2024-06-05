# Storing vehicle data

My solution for the ['Storing vehicle data' Challenge](https://platform.entwicklerheld.de/challenge/storing-vehicle-data?technology=Java) on the [EntwicklerHeld](https://platform.entwicklerheld.de/) Code Challenge Platform.

## Description
Challenge consisted of two parts ("stages"), which involved working with a SQLite database and storing/retrieving data related to VIN (Vehicle Identification Number) and later also optimizing database file size for "embedded devices".

## Challenge Info
Data last updated: 2024-06-05
Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language
---|---|---|---|---|
▮▮▯▯ | █████░░░░░ 46% | 226 / 496 | 2023-07-14 | Java

## Comment
"Stage 1" was easily solved after reading the docs, on how to work with SQLite and Java.

"Stage 2" was a lot more tricky, as it involved the requirement to minimize the database size – which involved some creative tricks, which Entwicklerheld also hinted at in their description.

First attempt to save space by splitting up the VIN into its 3 parts (WMI, VDS and VIS) and saving these in separate tables, referencing only the row IDs of the "less unique" WMI and VDS parts, did not properly work for this scenario, as the additional page sizes of these tables was inflating the database size quite a bit.

I do believe, that in a production environment, splitting it up would be the correct way to go, as the test cases here, were only limited to 999 entries.

Second attempt was then to use a custom character encoding map, as the VIN consist of a `0-9`, `A-Z` - minus the letters `I`, `O`, `Q` -> character set of 33 characters.

This would fit into 6 bits, which I tried to store as BLOB, but unfortunately the smallest size SQLite can save is 1 byte.

So instead went with storing the VIN encoded as integers, which did save enough space for the challenge to go through.

