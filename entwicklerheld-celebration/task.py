def count_clinking_glasses_for_eh_team(number_of_guests):
    # x guests, clinking with everyone else, except themselves -> x -1
    # and since we are supposed to count clinks, not glasses -> divide by two
    return number_of_guests * (number_of_guests - 1) / 2


def count_clinking_glasses_for_variable_number_of_guests(number_of_guests):
    count = 0
    for i in range(number_of_guests, 1, -1):
        count += count_clinking_glasses_for_eh_team(i)
    return count