from random import shuffle
from slot_machine.core import SlotMachineCore


class Symbol(object):
    def __init__(self, icon: str, reward_on_win: int):
        self.icon = icon
        self.reward_on_win = reward_on_win

    def __repr__(self) -> str:
        return self.icon


class SlotMachine(object):
    def get_reward(self, result: list) -> int:
        # Implement this in scenario 1.
        return 0

    def insert_coin(self) -> (list, int):
        # Manipulate this in scenario 2.
        # You can also add new classes, attributes and methods if you want!

        value_1, value_2, value_3 = SlotMachineCore.create_result(self.symbols)
        result = [value_1, value_2, value_3]
        return result, self.get_reward(result)

    def __init__(self, symbol_wheel=None):
        # default symbols
        if symbol_wheel is None:
            five = Symbol("🍒", 5)
            ten = Symbol("🍏", 10)
            twenty_five = Symbol("🍋", 25)
            fifty = Symbol("🔔", 50)
            hundred = Symbol("💜", 100)
            five_hundred = Symbol("💎", 500)
            symbol_wheel = [
                five, five, five, five, five, five, five, five, five, five, five, five, five, five, five,
                ten, ten, ten, ten, ten, ten, ten, ten, ten, ten,
                twenty_five, twenty_five, twenty_five, twenty_five, twenty_five,
                fifty, fifty, fifty,
                hundred, hundred,
                five_hundred,
            ]

        shuffle(symbol_wheel)
        self.symbols = symbol_wheel
