#include <gtest/gtest.h>
#include "iostream"
#include "stdarg.h"

extern "C" {
#include "RobotSimulator.h"
}

class RobotSimulatorTest : public testing::Test {
protected:
    void SetUp() override {

    }
};


char *interpolateString(const char *format, ...) {
    char *result;
    va_list args;

    va_start(args, format);
    int length = vsnprintf(nullptr, 0, format, args);
    va_end(args);

    result = (char *) malloc((length + 1) * sizeof(char));
    if (result == nullptr) {
        fprintf(stderr, "Memory allocation failed.\n");
        return nullptr;
    }

    va_start(args, format);
    vsnprintf(result, length + 1, format, args);
    va_end(args);

    return result;
}

const char *bearing_to_string(enum BEARING bearing) {
    switch (bearing) {
        case NORTH:
            return "NORTH";
        case EAST:
            return "EAST";
        case SOUTH:
            return "SOUTH";
        case WEST:
            return "WEST";
        default:
            return "Unknown";
    }
}

TEST(RobotSimulatorTest, TestScenario1) {
    const Robot &robot1 = Robot{};
    const Position &position1 = get_position(robot1);
    ASSERT_EQ(0, position1.x) << interpolateString("Position.x should be 0 but was %d", position1.x);
    ASSERT_EQ(0, position1.y) << interpolateString("Position.y should be 0 but was %d", position1.y);
    BEARING bearing1 = get_bearing(robot1);
    ASSERT_EQ(NORTH, bearing1) << interpolateString("Bearing should be NORTH but was %s", bearing_to_string(bearing1));

    const Robot &robot2 = Robot{
            .position = Position{.x=-1, .y=-1},
            .bearing = SOUTH
    };
    const Position &position2 = get_position(robot2);
    ASSERT_EQ(-1, position2.x) << interpolateString("Position.x should be -1 but was %d", position2.x);
    ASSERT_EQ(-1, position2.y) << interpolateString("Position.y should be -1 but was %d", position2.y);
    BEARING bearing2 = get_bearing(robot2);
    ASSERT_EQ(SOUTH, bearing2) << interpolateString("Bearing should be SOUTH but was %s", bearing_to_string(bearing2));

    struct Robot robot3 = Robot{
            .position = Position{.x=0, .y=0},
            .bearing = NORTH
    };

    turn_right(&robot3);

    const Position &position3 = get_position(robot3);
    ASSERT_EQ(0, position3.x) << interpolateString("Position.x should be 0 but was %d", position3.x);
    ASSERT_EQ(0, position3.y) << interpolateString("Position.y should be 0 but was %d", position3.y);
    BEARING bearing3 = get_bearing(robot3);
    ASSERT_EQ(EAST, bearing3) << interpolateString("Bearing should be EAST but was %s", bearing_to_string(bearing3));

    const Position &position4 = Position{0, 0};
    BEARING robot_bearing4 = EAST;
    struct Robot r4 = Robot{.position=position4, .bearing=robot_bearing4};

    turn_right(&r4);

    const Position &expected_robot_position4 = position4;
    ASSERT_EQ(expected_robot_position4.x, get_position(r4).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position4.x, position4.x);
    ASSERT_EQ(expected_robot_position4.y, get_position(r4).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position4.y, position4.y);
    ASSERT_EQ(SOUTH, get_bearing(r4)) << interpolateString("Bearing should be SOUTH but was %s", bearing_to_string(get_bearing(r4)));

    const Position &position = Position{0, 0};
    BEARING robot_bearing = SOUTH;
    struct Robot r5 = Robot{.position=position, .bearing=robot_bearing};

    turn_right(&r5);

    const Position &expected_robot_position5 = position;
    ASSERT_EQ(expected_robot_position5.x, get_position(r5).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position5.x, position.x);
    ASSERT_EQ(expected_robot_position5.y, get_position(r5).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position5.y, position.y);
    ASSERT_EQ(WEST, get_bearing(r5)) << interpolateString("Bearing should be WEST but was %s", bearing_to_string(get_bearing(r5)));

    const Position &position6 = Position{0, 0};
    BEARING robot_bearing6 = WEST;
    struct Robot r6 = Robot{.position=position6, .bearing=robot_bearing6};

    turn_right(&r6);

    const Position &expected_robot_position6 = position6;
    ASSERT_EQ(expected_robot_position6.x, get_position(r6).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position6.x, position6.x);
    ASSERT_EQ(expected_robot_position6.y, get_position(r6).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position6.y, position6.y);
    ASSERT_EQ(NORTH, get_bearing(r6)) << interpolateString("Bearing should be NORTH but was %s", bearing_to_string(get_bearing(r6)));

    const Position &position7 = Position{0, 0};
    BEARING robot_bearing7 = NORTH;
    struct Robot r7 = Robot{.position=position7, .bearing=robot_bearing7};

    turn_left(&r7);

    const Position &expected_robot_position7 = position7;
    ASSERT_EQ(expected_robot_position7.x, get_position(r7).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position7.x, position7.x);
    ASSERT_EQ(expected_robot_position7.y, get_position(r7).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position7.y, position7.y);
    ASSERT_EQ(WEST, get_bearing(r7)) << interpolateString("Bearing should be WEST but was %s", bearing_to_string(get_bearing(r7)));

    const Position &position8 = Position{0, 0};
    BEARING robot_bearing8 = WEST;
    struct Robot r8 = Robot{.position=position8, .bearing=robot_bearing8};

    turn_left(&r8);

    const Position &expected_robot_position8 = position8;
    ASSERT_EQ(expected_robot_position8.x, get_position(r8).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position8.x, position8.x);
    ASSERT_EQ(expected_robot_position8.y, get_position(r8).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position8.y, position8.y);
    ASSERT_EQ(SOUTH, get_bearing(r8)) << interpolateString("Bearing should be SOUTH but was %s", bearing_to_string(get_bearing(r8)));

    const Position &position9 = Position{0, 0};
    BEARING robot_bearing9 = SOUTH;
    struct Robot r9 = Robot{.position=position9, .bearing=robot_bearing9};

    turn_left(&r9);

    const Position &expected_robot_position9 = position9;
    ASSERT_EQ(expected_robot_position9.x, get_position(r9).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position9.x, position9.x);
    ASSERT_EQ(expected_robot_position9.y, get_position(r9).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position9.y, position9.y);
    ASSERT_EQ(EAST, get_bearing(r9)) << interpolateString("Bearing should be EAST but was %s", bearing_to_string(get_bearing(r9)));

    const Position &position10 = Position{0, 0};
    BEARING robot_bearing10 = EAST;
    struct Robot r10 = Robot{.position=position10, .bearing=robot_bearing10};

    turn_left(&r10);

    const Position &expected_robot_position10 = position10;
    ASSERT_EQ(expected_robot_position10.x, get_position(r10).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position10.x, position10.x);
    ASSERT_EQ(expected_robot_position10.y, get_position(r10).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position10.y, position10.y);
    ASSERT_EQ(NORTH, get_bearing(r10)) << interpolateString("Bearing should be NORTH but was %s", bearing_to_string(get_bearing(r10)));

    const Position &position11 = Position{0, 0};
    BEARING robot_bearing11 = NORTH;
    struct Robot r11 = Robot{.position=position11, .bearing=robot_bearing11};

    advance(&r11);

    const Position &expected_robot_position{0, 1};
    ASSERT_EQ(expected_robot_position.x, get_position(r11).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position.x, position11.x);
    ASSERT_EQ(expected_robot_position.y, get_position(r11).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position.y, position11.y);
    ASSERT_EQ(NORTH, get_bearing(r11)) << interpolateString("Bearing should be NORTH but was %s", bearing_to_string(get_bearing(r11)));

    const Position &position12 = Position{0, 0};
    BEARING robot_bearing12 = SOUTH;
    struct Robot r12 = Robot{.position=position12, .bearing=robot_bearing12};

    advance(&r12);

    const Position &expected_robot_position12{0, -1};
    ASSERT_EQ(expected_robot_position12.x, get_position(r12).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position12.x, position12.x);
    ASSERT_EQ(expected_robot_position12.y, get_position(r12).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position12.y, position12.y);
    ASSERT_EQ(SOUTH, get_bearing(r12)) << interpolateString("Bearing should be SOUTH but was %s", bearing_to_string(get_bearing(r12)));

    const Position &position13 = Position{0, 0};
    BEARING robot_bearing13 = EAST;
    struct Robot r13 = Robot{.position=position13, .bearing=robot_bearing13};

    advance(&r13);

    const Position &expected_robot_position13{1, 0};
    ASSERT_EQ(expected_robot_position13.x, get_position(r13).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position13.x, position13.x);
    ASSERT_EQ(expected_robot_position13.y, get_position(r13).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position13.y, position13.y);
    ASSERT_EQ(EAST, get_bearing(r13)) << interpolateString("Bearing should be EAST but was %s", bearing_to_string(get_bearing(r13)));

    const Position &position14 = Position{0, 0};
    BEARING robot_bearing14 = WEST;
    struct Robot r14 = Robot{.position=position14, .bearing=robot_bearing14};

    advance(&r14);

    const Position &expected_robot_position14{-1, 0};
    ASSERT_EQ(expected_robot_position14.x, get_position(r14).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position14.x, position14.x);
    ASSERT_EQ(expected_robot_position14.y, get_position(r14).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position14.y, position14.y);
    ASSERT_EQ(WEST, get_bearing(r14)) << interpolateString("Bearing should be WEST but was %s", bearing_to_string(get_bearing(r14)));

}
// -- SCENARIO 2 -- //
TEST(RobotSimulatorTest, TestScenario2) {
    const Position &position15 = Position{7, 3};
    BEARING robot_bearing15 = NORTH;
    struct Robot r15 = Robot{.position=position15, .bearing=robot_bearing15};

    execute_sequence(&r15, const_cast<char *> ("RAALAL"));

    const Position &expected_robot_position15{9, 4};
    ASSERT_EQ(expected_robot_position15.x, get_position(r15).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position15.x, position15.x);
    ASSERT_EQ(expected_robot_position15.y, get_position(r15).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position15.y, position15.y);
    ASSERT_EQ(WEST, get_bearing(r15)) << interpolateString("Bearing should be WEST but was %s", bearing_to_string(get_bearing(r15)));

    const Position &position16 = Position{0, 0};
    BEARING robot_bearing16 = NORTH;
    struct Robot r16 = Robot{.position=position16, .bearing=robot_bearing16};

    execute_sequence(&r16, const_cast<char *> ("LAAARALA"));

    const Position &expected_robot_position16{-4, 1};
    ASSERT_EQ(expected_robot_position16.x, get_position(r16).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position16.x, position16.x);
    ASSERT_EQ(expected_robot_position16.y, get_position(r16).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position16.y, position16.y);
    ASSERT_EQ(WEST, get_bearing(r16)) << interpolateString("Bearing should be WEST but was %s", bearing_to_string(get_bearing(r16)));

    const Position &position17 = Position{2, -7};
    BEARING robot_bearing17 = EAST;
    struct Robot r17 = Robot{.position=position17, .bearing=robot_bearing17};

    execute_sequence(&r17, const_cast<char *> ("RRAAAAALA"));

    const Position &expected_robot_position17{-3, -8};
    ASSERT_EQ(expected_robot_position17.x, get_position(r17).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position17.x, position17.x);
    ASSERT_EQ(expected_robot_position17.y, get_position(r17).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position17.y, position17.y);
    ASSERT_EQ(SOUTH, get_bearing(r17)) << interpolateString("Bearing should be SOUTH but was %s", bearing_to_string(get_bearing(r17)));

    const Position &position18 = Position{8, 4};
    BEARING robot_bearing18 = SOUTH;
    struct Robot r18 = Robot{.position=position18, .bearing=robot_bearing18};

    execute_sequence(&r18, const_cast<char *> ("LAAARRRALLLL"));

    const Position &expected_robot_position18{11, 5};
    ASSERT_EQ(expected_robot_position18.x, get_position(r18).x) << interpolateString("Position.x should be %d but was %d", expected_robot_position18.x, position18.x);
    ASSERT_EQ(expected_robot_position18.y, get_position(r18).y) << interpolateString("Position.y should be %d but was %d", expected_robot_position18.y, position18.y);
    ASSERT_EQ(NORTH, get_bearing(r18)) << interpolateString("Bearing should be NORTH but was %s", bearing_to_string(get_bearing(r18)));
}