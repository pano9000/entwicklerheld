import random


class SlotMachineCore(object):
    @staticmethod
    def create_result(symbols) -> list:
        return [random.choice(symbols), random.choice(symbols), random.choice(symbols)]
