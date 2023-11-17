# Binary Tree

My solution for the ['Binary Tree' Challenge](https://platform.entwicklerheld.de/challenge/binary-tree?technology=JavaScript) on the [EntwicklerHeld](https://platform.entwicklerheld.de/) Code Challenge Platform.

## Description
Challenge consisted of working with binary trees and three scenarios:

1) Print a binary tree in a 'helpful' way

2) Compare and check if two trees are identical

3) Reverse/Mirror a given binary tree

## Challenge Info
Data last updated: 2023-11-17
Difficulty | Overall Success Rate @EH | Overall Solved/Accepted @EH | Date Solved | Language
---|---|---|---|---|
▮▮▯▯ | ███████░░░ 65% | 607 / 934 | 2023-07-28 | JavaScript

## Comment
I opted to try to solve the challenge with the use of a JavaScript generator that prints out every next value, Breadth First.

This made a few things more optimal, e.g. the checking of equalness this way can actually return early, if a difference is detected at the current nodes.

For printing the tree I created a helper class that calculates and prints the given treenode values in a 'centered' fashion.

Unrelated to the task, I also found a XSS vulnerability in the tasks Tests, which was reported to EntwicklerHeld.