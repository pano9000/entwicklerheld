<?php

declare(strict_types=1);

namespace EntwicklerHeld;

use Exception;

class CustomCsvParser extends BaseCsvIterator
{
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
        // TODO: implement in scenario 2
        throw new Exception("__constructor Method not implemented");
    }
}