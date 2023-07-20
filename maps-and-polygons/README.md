# Maps And Polygons

My solution for the ['Maps And Polygons' Challenge](https://platform.entwicklerheld.de/challenge/maps-and-polygons?technology=java) on the [Entwicklerheld](https://platform.entwicklerheld.de/) Code Challenge Platform.

Description
---
Challenge consists of two scenarios: 
1) Was to calculate the area of a given (irregular) polygon
2) Placing a label on a map for each of the given polygons - following certain rules, like e.g. the label not being allowed to touch the polygon and not being allowed to be "outside" of the map

Challenge Info
---
* Difficulty Level according to Entwicklerheld: `3/4 (Hard)`
* Originally solved on `2023-Jul-20`.

Comment
---
Interesting challenge for me, as I did not really pay any attention during my Maths classes :-).
The first scenario was nevertheless easily solved after finding out about the `Shoelace Algorithm/Formula`, which I just needed to turn into Java code.
The second scenario was the more challenging one, as it involved finding a way to detect "collisions" between the label and the polygon and the map borders.