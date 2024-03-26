from typing import Dict

class FibonacciPython:

    @staticmethod
    def fibonacci(number: int, memo: Dict[int, int] = {1: 0, 2: 1}) -> int:

        if not memo.get(number) == None:
            return memo.get(number)

        result_a = FibonacciPython.fibonacci(number - 1, memo)
        result_b = FibonacciPython.fibonacci(number - 2, memo)

        memo.update({
            number - 1: result_a,
            number - 2: result_b
        })

        return result_a + result_b