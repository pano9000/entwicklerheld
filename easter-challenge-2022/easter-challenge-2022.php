<?php
declare(strict_types=1);

function calculate_easter_sunday(int $year): DateTime {
    // first new moon 2022: 02. Januar 2022, 19.33 Uhr
    // one moon phase takes 29.53059 // 29.53058770576 days, according to wikipedia -> 
    // * 24 * 60 = every 42.524,0496 minutes or ~2.551.443 seconds // 2.551.442,777777664
    // full moon = half of the moon phase of
    $moon_cycle_seconds_full = 2551443;
    $moon_cycle_seconds_half = ceil($moon_cycle_seconds_full / 2);
    $moon_cycle = new DateInterval("PT{$moon_cycle_seconds_full}S");
    $moon_cycle_half = new DateInterval("PT{$moon_cycle_seconds_half}S");
    $base_new_moon = new DateTime("2022-01-02 18:33 UTC");
    $beginning_of_spring = new DateTime();
    $beginning_of_spring->setDate($year, 3, 21);

    $temp_new_moon = clone($base_new_moon);

    if ($year < $temp_new_moon->format("Y")) {

        while ($temp_new_moon > $beginning_of_spring ) {
            $temp_new_moon->sub($moon_cycle);
        } 
    } else {
        while ($temp_new_moon->format("Y-m-d") < $beginning_of_spring->format("Y-m-d") ) {
            $temp_new_moon->add($moon_cycle);
        }
    }
        $temp_new_moon->add($moon_cycle_half);
        $easter_sunday = ($temp_new_moon >= $beginning_of_spring) ? $temp_new_moon->modify("next Sunday") : $temp_new_moon->add($moon_cycle)->modify("next Sunday");
        echo $year . ": " . $easter_sunday->format("Y-m-d") . " easter \n";

        return $easter_sunday;    
}

function calculate_easter_days(int $year): array {
    $one_day = new DateInterval("P1D");
    $two_day = new DateInterval("P2D");
    $easter_sunday = calculate_easter_sunday($year);

    $good_friday = clone($easter_sunday);
    $easter_monday = clone($easter_sunday);

    $good_friday->sub($two_day); 
    $easter_monday->add($one_day);

    $easter_holidays = array($good_friday, $easter_sunday, $easter_monday);
    
    return $easter_holidays;
}