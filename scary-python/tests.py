from unittest import TestCase, main
from xmlrunner import xmlrunner

from scarypython.task import CheckoutService, Payment, get_processed_payments
import scarypython.task as task_ref


class ScaryPythonTests(TestCase):
    def test_scenario_1(self):
        payment1 = Payment(); payment2 = Payment()
        payment1.amount = 47; payment2.amount = 42
        payment1.username = "Mr. Plumplori"; payment2.username = "Mrs. Plumplori"
        empty_list = []
        result_list = CheckoutService.add_payment_to_successful_payments(payment1, empty_list)
        self.assertEqual(result_list, [payment1])

        result_list = CheckoutService.add_payment_to_successful_payments(payment1)
        self.assertEqual(result_list, [payment1])

        result_list = CheckoutService.add_payment_to_successful_payments(payment1)
        self.assertEqual(result_list, [payment1])
        self.assertEqual(CheckoutService.add_payment_to_successful_payments(payment2, [payment1]), [payment1, payment2])

    def test_scenario_2(self):
        self.assertEqual(
            CheckoutService.get_payment_status(0), "Your Payment is unknown.",
            f"Expected 'Your Payment is unknown.' for payment status 0 but got: '{CheckoutService.get_payment_status(0)}'"
        )
        self.assertEqual(
            CheckoutService.get_payment_status(100), "Your Payment is processed.",
            f"Expected 'Your Payment is unknown.' for payment status 0 but got: '{CheckoutService.get_payment_status(100)}'"
        )
        self.assertEqual(
            CheckoutService.get_payment_status(200), "Your Payment is payed.",
            f"Expected 'Your Payment is unknown.' for payment status 0 but got: '{CheckoutService.get_payment_status(200)}'"
        )
        self.assertEqual(
            CheckoutService.get_payment_status(300), "Sorry your Payment was declined.",
            f"Expected 'Your Payment is unknown.' for payment status 0 but got: '{CheckoutService.get_payment_status(300)}'"
        )

    def test_scenario_3(self):
        payment1 = CheckoutService.create_payment(42, "Mrs. Plumplori")

        self.assertEqual(
            len(payment1.events), 1,
            f"Expected exactly 1 event in {payment1}'s events but found {len(payment1.events)}: {payment1.events}"
        )

        payment2 = CheckoutService.create_payment(47, "Mr. Plumplori")
        self.assertEqual(
            len(payment1.events), 1,
            f"Expected exactly 1 event in {payment1}'s events but found {len(payment1.events)}: {payment1.events}"
        )
        self.assertEqual(
            len(payment2.events), 1,
            f"Expected exactly 1 event in {payment2}'s events but found {len(payment2.events)}: {payment2.events}"
        )

    def test_scenario_4(self):
        self.assertEqual(0, task_ref.all_processed_payments)
        self.assertEqual(0, get_processed_payments())

        task_ref.increase_processed_payments()
        self.assertEqual(1, task_ref.all_processed_payments)
        self.assertEqual(1, get_processed_payments())

        task_ref.increase_processed_payments()
        self.assertEqual(2, task_ref.all_processed_payments)
        self.assertEqual(2, get_processed_payments())



    def setUp(self):
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")


if __name__ == '__main__':
    with open('results.xml', 'w') as output:
        main(
            testRunner=xmlrunner.XMLTestRunner(output=output),
            failfast=False, buffer=False, catchbreak=False)
