# Document Scan

My solution for the ['Document Scan' Challenge](https://platform.entwicklerheld.de/challenge/document-scan?technology=Java) on the [EntwicklerHeld](https://platform.entwicklerheld.de/) Code Challenge Platform.

## Description
Challenge consisted of extracting an Address from a scanned document. The scanned document was provided in form of an Array of 'boxed' Characters, e.g. with X/Y points.

The first scenario was the 'easy' mode, which only contained perfectly aligned scans. The challenge allowed for a 'hard' mode, which also included scans, that were not correctly aligned, e.g. the letters were skewed slightly, either going up or down.

## Challenge Info
Data last updated: 2023-10-27
Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language
---|---|---|---|---|
▮▮▯▯ | ███░░░░░░░ 26% | 47 / 179 | 2023-09-03 | Java

## Comment
The easy mode was quickly solved, but I went for the 'hard' mode, which was quite a bit more challenging and required to throw away my first solution, that worked for the easy mode. Finally I ended up with a solution that groups the characters in Columns by their X position, then for each value of the first column, iterates through all the other columns to check, if the letter belongs to the same row, by calculating some distances between X/Y of the current and following characters.

There are some issues with the solution still though, if we look at the real world, as e.g. in a wrongly scanned document, the X values of the rows would not be perfectly aligned, which is what the solution currently assumes. It also only works for Left-To-Right and Left-Aligned text.