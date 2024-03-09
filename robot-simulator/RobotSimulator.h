#ifndef ROBOT_SIMULATOR_H
#define ROBOT_SIMULATOR_H

#include <stdbool.h>
#include <string.h>


enum BEARING {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3
};

struct Position {
    int x;
    int y;
};

struct Robot {
    struct Position position;
    enum BEARING bearing;
};

struct Position get_position(struct Robot robot) {

}

enum BEARING get_bearing(struct Robot robot) {

}

void turn_right(struct Robot *robot) {

}

void turn_left(struct Robot *robot) {

}

void advance(struct Robot *robot) {

}

void execute_sequence(struct Robot *robot, char *sequence) {

}

#endif