import copy
from unittest import TestCase, main

from xmlrunner import xmlrunner
from slot_machine.task import SlotMachine, Symbol
from slot_machine.visualization import Visualization


class SlotMachineTest(TestCase):
    visualization = Visualization()

    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")

    def test_get_result(self):
        five = Symbol("🍒", 5)
        ten = Symbol("🍏", 10)
        five_hundred = Symbol("💎", 500)

        slot_machine = SlotMachine()
        result = [five, five, five]
        reward = slot_machine.get_reward(result)
        self.assertEqual(reward, 5, f"{result} | Expected reward: 5€ but was {reward}")

        result = [five, ten, ten]
        reward = slot_machine.get_reward(result)
        self.assertEqual(reward, 0, f"{result} | Expected reward: 0€ but was {reward}")

        result = [five_hundred, five_hundred, five_hundred]
        reward = slot_machine.get_reward(result)
        self.assertEqual(reward, 500, f"{result} | Expected reward: 500€ but was {reward}")

        result = [five_hundred, five_hundred, five_hundred, five_hundred, five_hundred, five_hundred]
        reward = slot_machine.get_reward(result)
        self.assertEqual(reward, 500, f"{result} | Expected reward: 500€ but was {reward}")

        result = [ten, five_hundred, five_hundred, five_hundred, five_hundred, five_hundred]
        reward = slot_machine.get_reward(result)
        self.assertEqual(reward, 0, f"{result} | Expected reward: 0€ but was {reward}")

    def test_stage_1(self):
        overall_rewards = 0
        slot_machine = SlotMachine()
        # PHASE 1
        p1_score = self.get_score(slot_machine, '2', '1')
        self.assertTrue(
            5 <= p1_score <= 25,
            f"Expected the reward for the first time to be always more than 5 € but less than 30 €. Your average reward was {p1_score}"
        )
        result, reward = slot_machine.insert_coin()
        overall_rewards += reward
        # PHASE 2
        p1_slot_machine_score = self.get_score(slot_machine, '2', '4')
        self.assertTrue(0.55 < p1_slot_machine_score < 1,
                        msg=f"Expected an average reward between 0.55 and 1 but was {p1_slot_machine_score}")

        iterations = 0
        while overall_rewards < 30:
            if iterations > 150:
                raise AssertionError("After 150 tries, the player did not get more than 30 €")
            _, reward = slot_machine.insert_coin()
            overall_rewards += reward
            iterations += 1

        # PHASE 3
        p2_slot_machine_score = self.get_score(slot_machine, '2', '6')
        self.assertTrue(
            0.001 < p2_slot_machine_score < 0.4,
            f"Expected an average reward between 0.001 and 0.4 but was {p2_slot_machine_score}"
        )

    def get_score(self, slot_machine: SlotMachine, scenario_id: str, sentence_id: str):
        rewards = 0
        for i in range(0, 10000):
            my_machine = copy.deepcopy(slot_machine)
            result, reward = my_machine.insert_coin()
            rewards += reward

            try:
                SlotMachineTest.visualization.add_point(rewards, i + 1, scenario_id, sentence_id)
            except Exception:
                pass

            if reward != 0:
                self.assertTrue(
                    len(set(result)) == 1,
                    f"Expected that all slots should be equal when a reward is given, but was {result}")
                self.assertTrue(
                    result[0].reward_on_win == reward,
                    f"Expected the reward for {result[0]} to be {result[0].reward_on_win}, but was {reward}")

        return rewards / 10000

    @classmethod
    def tearDownClass(cls) -> None:
        SlotMachineTest.visualization.write()


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False, buffer=False, catchbreak=False)