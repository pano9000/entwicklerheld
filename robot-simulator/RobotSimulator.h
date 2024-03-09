#ifndef ROBOT_SIMULATOR_H
#define ROBOT_SIMULATOR_H

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

enum BEARING {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3
};

BEARING next_bearing_step(BEARING bearing, int direction) {
    // check that we have 1 or -1 otherwise default back to 0
    if ((direction != 1) && (direction != -1)) direction = 0;
    
    BEARING new_bearing;
    switch (bearing + direction)
    {
    case -1:
        return new_bearing = WEST;

    case 0:
        return new_bearing = NORTH;

    case 1:
        return new_bearing = EAST;

    case 2:
        return new_bearing = SOUTH;

    case 3:
        return new_bearing = WEST;

    default:
        printf("Next Bearing Step: Did not get a valid bearing direction, skipping move.");
        return new_bearing = NORTH;
    }
    
}

struct Position {
    int x;
    int y;
};

struct Robot {
    struct Position position;
    enum BEARING bearing;
};

struct Position get_position(struct Robot robot) {
    return robot.position;
}

enum BEARING get_bearing(struct Robot robot) {
    return robot.bearing;
}

void turn_right(struct Robot *robot) {
    robot->bearing = next_bearing_step(get_bearing(*robot), 1);
}

void turn_left(struct Robot *robot) {
    robot->bearing = next_bearing_step(get_bearing(*robot), -1);
}

void advance(struct Robot *robot) {

    BEARING current_bearing = get_bearing(*robot);

    switch (current_bearing)
    {
    case 0:
        robot->position.y++;
        break;
    case 1:
        robot->position.x++;
        break;
    case 2:
        robot->position.y--;
        break;
    case 3:
        robot->position.x--;
        break;
    default:
        printf("Advance: Did not get a valid bearing state, skipping move.");
        break;
    }

}

void execute_sequence(struct Robot *robot, char *sequence) {

    char current_c = 0;
    while (sequence[current_c] != '\0')
    {
        switch (toupper(sequence[current_c]))
        {
        case 'R':
            turn_right(robot);
            break;

        case 'L':
            turn_left(robot);
            break;

        case 'A':
            advance(robot);
            break;

        default:
            printf("Exec Seq: The character '%c' at Position %d in the sequence is not valid, skipping move.", sequence[current_c], current_c);
            break;
        }
        current_c++;
    }
}



#endif