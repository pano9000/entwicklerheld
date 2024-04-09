<?php


namespace EntwicklerHeld\Tests;

class SolutionParser implements \Iterator, \Countable
{
    protected $data = [];

    public function __construct(string $csvFile)
    {
        if (false === $handle = fopen($csvFile, 'r')) {
            throw new \InvalidArgumentException('Cannot read file');
        }

        $fields = null;
        while (($row = fgets($handle)) !== false) {
            $row = explode(',', trim($row));
            if (null === $fields) {
                $fields = $row;
                continue;
            }
            $newEntry = array_combine($fields, $row);
            $newEntry['valid'] = $newEntry['valid'] == 'true' ? true : false;
            $this->data[] = $newEntry;
        }

        fclose($handle);
    }

    public function isValid(array $row): bool
    {
        return !empty($row['clientId'])
            && !empty($row['type'])
            && !empty($row['value'])
            && empty($row['deletedAt'])
            && boolval($row['valid'])
            && is_numeric($row['value']);
    }

    public function current()
    {
        return current($this->data);
    }

    public function next()
    {
        return next($this->data);
    }

    public function key()
    {
        return key($this->data);
    }

    public function valid()
    {
        return is_array($this->current());
    }

    public function rewind()
    {
        return reset($this->data);
    }

    public function count()
    {
        return count($this->data);
    }