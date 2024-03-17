from random import shuffle, choice
from slot_machine.core import SlotMachineCore

class Symbol(object):
    def __init__(self, icon: str, reward_on_win: int):
        self.icon = icon
        self.reward_on_win = reward_on_win

    def __repr__(self) -> str:
        return self.icon


class SlotMachine(object):

    def get_winning_with_value_between(self, n: int = 5, m: int = 25) -> list:
        symbol = choice(list(filter(lambda item: item.reward_on_win >= n and item.reward_on_win <= m, self.symbols)))
        return [symbol] * 3
    
    def get_non_winning(self) -> list:
        result = [choice(self.symbols), choice(self.symbols)]
        last = choice(self.symbols)

        while (last.icon == result[0].icon):
            last = choice(self.symbols)

        result.append(last)
        shuffle(result)
        return result

    def get_lowered_result(self, min_val: int = 5, max_val: int = 25) -> list:
        result = []
        symbol = ""
        for i in range(0, 100):
            if i >= 99:
                symbol = self.get_winning_with_value_between(min_val, max_val)
            elif i >= 95:
                symbol = self.get_winning_with_value_between(min_val, min_val)
            else:
                symbol = self.get_non_winning()

            
            result.append(symbol)

        shuffle(result)
        return choice(result)


    def get_reward(self, result: list) -> int:

        symbol = result[0]
        for item in result:
            if (item.icon != symbol.icon):
                return 0

        return symbol.reward_on_win

    def insert_coin(self) -> (list, int):
        self.plays += 1
        result = []

        if (self.plays == 1):
            result = self.get_winning_with_value_between(5, 25)
        elif (self.won_amount >= 30):
            result = self.get_lowered_result(5, 50)
        else:
            result = SlotMachineCore.create_result(self.symbols)

        reward = self.get_reward(result)
        
        self.won_amount += reward

        return result, reward


    # not used here, because the test cases are written in a weird fashion,
    # so that using the overall average of the player's session is not working
    @property
    def get_average_won(self) -> float:
        return (self.won_amount / self.plays) if self.won_amount > 0 else 0


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
        self.plays = 0
        self.won_amount = 0