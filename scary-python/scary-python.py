from datetime import datetime

class Payment(object):
    amount = 0
    username = ""
    events = []
    status = 0

    def __init__(self):
        self.amount = 0
        self.username = ""
        self.events = []
        self.status = 0

    def __repr__(self):
        return f"<{self.amount}€ Payment of {self.username}>"


class PaymentStatus:
    UNDEFINED = 0
    PROCESSED = 100
    PAYED = 200
    DECLINED = 300


class CheckoutService(object):
    @staticmethod
    def add_payment_to_successful_payments(payment, successful_payments=None):
        if successful_payments is None:
            successful_payments = []
        successful_payments.append(payment)
        return successful_payments

    @staticmethod
    def get_payment_status(status_number):
        if status_number == PaymentStatus.PROCESSED:
            return "Your Payment is processed."
        if status_number == PaymentStatus.PAYED:
            return "Your Payment is payed."
        if status_number == PaymentStatus.DECLINED:
            return "Sorry your Payment was declined."
        return "Your Payment is unknown."


    @staticmethod
    def create_payment(amount: int, username: str):
        payment = Payment()
        payment.amount = amount
        payment.username = username
        payment.events.append({
            'name': "payment_created",
            'date': datetime.now()
        })

        return payment


all_processed_payments = 0


def get_processed_payments():
    global all_processed_payments
    return all_processed_payments


def increase_processed_payments():
    global all_processed_payments
    all_processed_payments += 1
    return all_processed_payments
