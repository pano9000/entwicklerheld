<?php

declare(strict_types=1);

namespace EntwicklerHeld;


use Exception;

class PhpCsvParser extends BaseCsvIterator
{
    public $data = array();

    public static function isValid(array $meterReading): bool
    {

        $validationChecks = array(
            isset($meterReading["clientId"]) && !empty($meterReading["clientId"]),
            isset($meterReading["deletedAt"]) && empty($meterReading["deletedAt"]),
            isset($meterReading["type"]) && !empty($meterReading["type"]),
            isset($meterReading["value"]) && is_numeric($meterReading["value"]),
            isset($meterReading["valid"]) && $meterReading["valid"] == true,
        );

        $meterReading["valid"] = !in_array(false, $validationChecks);

        return $meterReading["valid"];
    }

    public function __construct(string $csvFilePath)
    {

        $csvFilePointer = fopen($csvFilePath, "r");
        if (!$csvFilePointer)
        {
            throw new Exception("Could not open file.");
        }

        //TODO should check if csvHeaders are as expected -> TODO in stage2
        $csvHeaders = fgetcsv($csvFilePointer);

        while ( ($csvLine = fgetcsv($csvFilePointer)) !== false )
        {
            $currentLine = array();

            foreach($csvLine as $key=>$value)
            {
                $currentLine[$csvHeaders[$key]] = ($csvHeaders[$key] == "valid") ? filter_var($value, FILTER_VALIDATE_BOOLEAN) : $value;
            }

            array_push($this->data, $currentLine);

        }

        fclose($csvFilePointer);
    }
}