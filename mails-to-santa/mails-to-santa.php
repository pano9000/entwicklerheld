<?php
declare(strict_types=1);
include("holidays.php");

function calculated_time_to_process(DateTime $time_of_arrival):  DateTime {
    global $HOLIDAY_LIST;

    $business_hours = (object) [
        "start" => new DateTime("08:00:00"),
        "end" => new DateTime("16:00:00")
    ];

    $holiday_check_result = get_holiday_check($time_of_arrival, $HOLIDAY_LIST);

    if ($holiday_check_result->status == true) {
        $time_of_arrival = clone $holiday_check_result->end;
    }

    if ( $time_of_arrival->format("H:i") < $business_hours->start->format("H:i") ) {

        $time_of_arrival->setTime(
           intval($business_hours->start->format("H")), 
           intval($business_hours->start->format("i"))
        );
    }

    if ( $time_of_arrival->format("H:i") > $business_hours->end->format("H:i") ) {

        $time_of_arrival->setTime(
           intval($business_hours->start->format("H")), 
           intval($business_hours->start->format("i"))
        );

        $time_of_arrival->setDate(
            intval($time_of_arrival->format("Y")),
            intval($time_of_arrival->format("m")),
            intval($time_of_arrival->format("d"))+1
        );
    }

    if ( in_array($time_of_arrival->format("N"), array("6", "7")) ) {

        $days = 8 - $time_of_arrival->format('N');
        $days_to_add = new DateInterval("P{$days}D");

        $time_of_arrival->add($days_to_add);

        $time_of_arrival->setTime(
           intval($business_hours->start->format("H")), 
           intval($business_hours->start->format("i"))
        );
    }

    return $time_of_arrival;
}

function get_holiday_check($date_to_check, $list_of_holidays) {

    $date_copy = clone $date_to_check;
    $date_copy->setTime(0,0,0);

    $holiday_check = (object) [
        "status" => false,
        "end" => null
    ];

    foreach($list_of_holidays as $holiday_item) {

        $curr_year = $date_copy->format("Y");
        $h_start_month = $holiday_item["start"]["month"];
        $h_start_day = $holiday_item["start"]["day"];

        $h_end_month = $holiday_item["end"]["month"];
        $h_end_day = $holiday_item["end"]["day"];

        $h_start_date = new DateTime("{$curr_year}-{$h_start_month}-{$h_start_day}");
        $h_end_date = new DateTime("{$curr_year}-{$h_end_month}-{$h_end_day}");
        echo "
                holiday start date: {$h_start_date->format('Y-m-d')}
                holiday end date: {$h_end_date->format('Y-m-d')}
                date to check: {$date_to_check->format('Y-m-d')}
            ";

        if ($date_copy >= $h_start_date && $date_copy <= $h_end_date) {
            $holiday_check->status = true;
            $holiday_check->end = $h_end_date->add(new DateInterval("P1D"));
            $date_copy = clone($h_end_date);

        } 
    }

    return $holiday_check;
}

?>