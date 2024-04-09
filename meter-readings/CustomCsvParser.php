<?php

declare(strict_types=1);

namespace EntwicklerHeld;

use Exception;

class CustomCsvParser extends BaseCsvIterator
{
    public $data = array();

    public $expectedColumns = array("id", "clientId", "createdAt", "readAt", "deletedAt", "type", "source", "value", "valid");

    public static function isValid(array $row): bool
    {
        return !empty($row['clientId'])
            && !empty($row['type'])
            && !empty($row['value'])
            && empty($row['deletedAt'])
            && is_numeric($row['value']);
    }

    public function __construct(string $csvFilePath)
    {

        $csvFilePointer = fopen($csvFilePath, "r");
        if (!$csvFilePointer)
        {
            throw new Exception("Could not open file.");
        }

        $csvHeadersLine = fgets($csvFilePointer);
        
        if ($csvHeadersLine === false)
        {
            throw new Exception("No CSV columns header found.");
        }

        $csvHeadersLine = rtrim($csvHeadersLine);
        
        if ($csvHeadersLine != implode(",", $this->expectedColumns))
        {
            throw new Exception("Unexpected CSV columns header found.");
        }
        
        $csvHeaders = explode(",", $csvHeadersLine);

        while ( ($csvLine = fgets($csvFilePointer)) !== false )
        {
            $currentLine = array();

            foreach(explode(",", $csvLine) as $key=>$value)
            {
                $currentLine[$csvHeaders[$key]] = ($csvHeaders[$key] === "valid") ? filter_var($value, FILTER_VALIDATE_BOOLEAN) : $value;
            }

            array_push($this->data, $currentLine);
        }

        fclose($csvFilePointer);
    }
}