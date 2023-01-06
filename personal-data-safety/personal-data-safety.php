<?php
declare(strict_types=1);
include("user_data.php");

function get_personal_data(string $user_id): array {

    $personal_data = get_user_by_id($user_id);
    $strong_auth = has_strong_authetication($user_id);
    $masked_data = [];

     foreach($personal_data as $item => $item_value) {
        if ($item === "street" || $item === "zip") {
            $masked_data[$item] = str_pad(substr($item_value, 0, 3), strlen($item_value), "*");
        }
        else if ($item === "city" || $item === "phone") {
            $masked_data[$item] = str_pad(substr($item_value, -3), strlen($item_value), "*", STR_PAD_LEFT);
        }
        else if ($item === "bank account") {
            $masked_data[$item] = substr($item_value, 0, 2) . str_pad(substr($item_value, -3), strlen($item_value)-2, "*", STR_PAD_LEFT);
        }
        else if ($item === "email") {
            $mail = explode("@", $item_value);
            $masked_data[$item] = str_pad("@" . $mail[1], strlen($item_value), "*", STR_PAD_LEFT);
        }
        else {
            $masked_data[$item] = $item_value;
        }
    }

    foreach($personal_data["reference account"] as $item => $item_value) {
        if ($item === "iban" || $item === "institution") {
            $masked_data["reference account"][$item] = substr($item_value, 0, 3) . str_pad(substr($item_value, -3), strlen($item_value)-3, "*", STR_PAD_LEFT);
        } else if ($item === "bic") {
            $masked_data["reference account"][$item] = str_pad(substr($item_value, -3), strlen($item_value), "*", STR_PAD_LEFT);
        }
    } 
    
    return ($strong_auth) ? $personal_data : $masked_data;
}
?>