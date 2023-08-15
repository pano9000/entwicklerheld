from enum import Enum


class CheckResult(Enum):
    SUBLIST = 0
    SUPERLIST = 1
    EQUAL = 2
    UNEQUAL = 3
