<?php
declare(strict_types=1);

namespace EntwicklerHeld\Tests;

use Angle\Chrono;
use EntwicklerHeld\BaseCsvIterator;
use EntwicklerHeld\PhpCsvParser;
use phpmock\MockBuilder;
use PHPUnit\Framework\TestCase;


class Stage1Test extends TestCase
{
    private $fgetcsvMock;
    private $fgetcsvCalledCount;

    public function setUp(): void
    {
        parent::setUp();
        $this->fgetcsvCalledCount = 0;
        $builder = new MockBuilder();
        $builder
            ->setNamespace("EntwicklerHeld")
            ->setName("fgetcsv")
            ->setFunction(
                function ($handle, $length = 0, $delimiter = ',', $enclosure = '"', $escape = '\\') {
                    $this->fgetcsvCalledCount += 1;
                    return fgetcsv($handle, $length, $delimiter, $enclosure, $escape);
                }
            );
        $this->fgetcsvMock = $builder->build();
        $this->fgetcsvMock->enable();
        print("\n##polylith[testStarted\n");
    }

    public function tearDown(): void
    {
        $this->fgetcsvMock->disable();
        print("\n##polylith[testFinished\n");
    }

    // HELPER FUNCTION
    private function getReadableRow($row)
    {
        $validFieldAsString = ($row['valid'] ? 'true' : 'false');
        $readableString = "\n[ \n"
            . "     id => " . $row['id'] . "\n"
            . "     clientId => " . $row['clientId'] . "\n"
            . "     createdAt => " . $row['createdAt'] . "\n"
            . "     readAt => " . $row['readAt'] . "\n"
            . "     deletedAt => " . $row['deletedAt'] . "\n"
            . "     type => " . $row['type'] . "\n"
            . "     source => " . $row['source'] . "\n"
            . "     value => " . $row['value'] . "\n"
            . "     valid => " . $validFieldAsString . "\n]\n";
        return $readableString;
    }

    # SCENARIO 1
    public function testBaseCsvParserValidation()
    {
        # NO CLIENT ID
        # GIVEN
        $row = array(
            "id" => 1,
            "clientId" => "",
            "createdAt" => "8/18/2019",
            "readAt" => "9/1/2018",
            "deletedAt" => "",
            "type" => "gas",
            "source" => "call",
            "value" => 13037,
            "valid" => True);
        # WHEN
        $actualBoolean = PhpCsvParser::isValid($row);
        # THEN

        $this->assertFalse($actualBoolean, "This meter reading" . $this->getReadableRow($row) . "is not valid because it has no clientId!");


        # NO TYPE
        # GIVEN
        $row = array(
            "id" => 1,
            "clientId" => "2",
            "createdAt" => "8/18/2019",
            "readAt" => "9/1/2018",
            "deletedAt" => "",
            "type" => "",
            "source" => "call",
            "value" => 13037,
            "valid" => True);
        # WHEN
        $actualBoolean = PhpCsvParser::isValid($row);
        # THEN
        $this->assertFalse($actualBoolean, "This meter reading" . $this->getReadableRow($row) . "is not valid because it has no type!");


        # NO NUMERIC VALUE
        # GIVEN
        $row = array(
            "id" => 1,
            "clientId" => "2",
            "createdAt" => "8/18/2019",
            "readAt" => "9/1/2018",
            "deletedAt" => "",
            "type" => "gas",
            "source" => "call",
            "value" => "",
            "valid" => True);
        # WHEN
        $actualBoolean = PhpCsvParser::isValid($row);
        # THEN
        $this->assertFalse($actualBoolean, "This meter reading" . $this->getReadableRow($row) . "is not valid because it has no Value!");


        # NOT DELETED
        # GIVEN
        $row = array(
            "id" => 1,
            "clientId" => "2",
            "createdAt" => "8/18/2019",
            "readAt" => "9/1/2018",
            "deletedAt" => "10/1/2018",
            "type" => "gas",
            "source" => "call",
            "value" => "1234",
            "valid" => True);
        # WHEN
        $actualBoolean = PhpCsvParser::isValid($row);
        # THEN
        $this->assertFalse($actualBoolean, "This meter reading" . $this->getReadableRow($row) . "is not valid because it has deletion data");


        # NOT VALID
        # GIVEN
        $row = array(
            "id" => 1,
            "clientId" => "2",
            "createdAt" => "8/18/2019",
            "readAt" => "9/1/2018",
            "deletedAt" => "",
            "type" => "gas",
            "source" => "call",
            "value" => "1234",
            "valid" => false);
        # WHEN
        $actualBoolean = PhpCsvParser::isValid($row);
        # THEN
        $this->assertFalse($actualBoolean, "This meter reading" . $this->getReadableRow($row) . "is not valid because the field valid is set to False");


        # VALID 1
        # GIVEN
        $row = array(
            "id" => 1,
            "clientId" => "2",
            "createdAt" => "8/18/2019",
            "readAt" => "9/1/2018",
            "deletedAt" => "",
            "type" => "gas",
            "source" => "call",
            "value" => "1234",
            "valid" => True);
        # WHEN
        $actualBoolean = PhpCsvParser::isValid($row);
        # THEN
        $this->assertTrue($actualBoolean, "This meter reading" . $this->getReadableRow($row) . "is valid so your method should return true");

        # VALID 2
        # GIVEN
        $row = array(
            "id" => 2,
            "clientId" => "3",
            "createdAt" => "8/18/2019",
            "readAt" => "9/1/2018",
            "deletedAt" => "",
            "type" => "gas",
            "source" => "call",
            "value" => "12345",
            "valid" => True);
        # WHEN
        $actualBoolean = PhpCsvParser::isValid($row);
        # THEN
        $this->assertTrue($actualBoolean, "This meter reading" . $this->getReadableRow($row) . "is valid so your method should return true");

        # VALID 3
        # GIVEN
        $row = array(
            "id" => 4,
            "clientId" => "4",
            "createdAt" => "8/18/2019",
            "readAt" => "9/1/2018",
            "deletedAt" => "",
            "type" => "gas",
            "source" => "call",
            "value" => "76453",
            "valid" => True);
        # WHEN
        $actualBoolean = PhpCsvParser::isValid($row);
        # THEN
        $this->assertTrue($actualBoolean, "This meter reading" . $this->getReadableRow($row) . "is valid so your method should return true");
    }

    public function testBaseCsvParserValidationRandom()
    {
        # GIVEN
        // Test with small csv file
        $filePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'meterreadings_validation_random.csv';
        $givenArray = new SolutionParser($filePath);

        foreach ($givenArray as $row) {
            $expectedBoolean = $givenArray->isValid($row);

            # WHEN
            $actualBoolean = PhpCsvParser::isValid($row);

            # THEN
            $this->assertIsBool($actualBoolean, "Your method should return a boolean!");
            $this->assertEquals($expectedBoolean, $actualBoolean, "This entry " . $this->getReadableRow($row) . " should be validate as " . ($actualBoolean ? 'true' : 'false'));
        }
    }


    # SCENARIO 2
    public function testPhpCsvParser()
    {
        # GIVEN
        // Test with small csv file
        $filePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'meterreadings_mini.csv';
        $expectedParser = new SolutionParser($filePath);
        $expectedArray = array();
        foreach ($expectedParser as $item) {
            array_push($expectedArray, $item);
        }

        # WHEN
        Chrono::start();
        $parserOfUser = new PhpCsvParser($filePath);

        # THEN
        $this->assertInstanceOf(BaseCsvIterator::class, $parserOfUser);
        $this->assertNotEmpty($parserOfUser, "Your array \$data should not be empty!");

        $this->assertLessThan(100, Chrono::ms(),  "ALARM: Your Parser is to slow!");

        $this->assertEquals($expectedArray, $parserOfUser->getData());
        $actualArray = array();
        foreach ($parserOfUser as $item) {
            array_push($actualArray, $item);
        }

        $this->assertEquals($expectedArray, $actualArray, "You have the right data property but, your class is not an Iterable anymore?");
        $this->assertGreaterThan(0, $this->fgetcsvCalledCount, "The method fgetcsv should called at least one time");
        $this->assertCount(1, $parserOfUser, "Your array \$data should contain 1 entry because the csv only contains 1 element!");
    }

    public function testPhpCsvParserRandomSmall()
    {
        # GIVEN
        // Test with small csv file
        $filePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'meterreadings_small.csv';
        $expectedParser = new SolutionParser($filePath);
        $expectedArray = array();
        foreach ($expectedParser as $item) {
            array_push($expectedArray, $item);
        }

        # WHEN
        Chrono::start();
        $csvIterator = new PhpCsvParser($filePath);


        # THEN
        $this->assertInstanceOf(BaseCsvIterator::class, $csvIterator);
        $this->assertNotEmpty($csvIterator, "Your array \$data should not be empty!");

        $this->assertGreaterThan(0, $this->fgetcsvCalledCount, "The method fgetcsv should called at least one time");

        $this->assertLessThan(100, Chrono::ms(),  "ALARM: Your Parser is to slow!");
        $this->assertCount(4, $csvIterator, "Your array \$data should contain 4 entries because the csv contains 4 elements!");
        $this->assertEquals($expectedArray, $csvIterator->getData());
        $actualArray = array();
        foreach ($csvIterator as $item) {
            array_push($actualArray, $item);
        }

        $this->assertEquals($expectedArray, $actualArray);
    }

    public function testRandomPhpCsvParser()
    {
        # GIVEN
        $filePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'meterreadings.csv';
        $expectedParser = new SolutionParser($filePath);
        $expectedArray = array();
        foreach ($expectedParser as $item) {
            array_push($expectedArray, $item);
        }

        # WHEN
        Chrono::start();
        $csvIterator = new PhpCsvParser($filePath);

        # THEN
        $this->assertInstanceOf(BaseCsvIterator::class, $csvIterator);
        $this->assertNotEmpty($csvIterator, "Your array \$data should not be empty!");
        $this->assertLessThan(100, Chrono::ms(),  "ALARM: Your Parser is to slow!");


        foreach ($csvIterator as $item) {
            $this->assertContains($item, $expectedArray, "The item you have added is not in the expected Array. Check your fields");
        }

        $this->assertGreaterThan(0, $this->fgetcsvCalledCount, "The method fgetcsv should called at least one time");


        $this->assertCount(5000, $csvIterator, "Your array \$data should contain 5000 entries because the csv contains 5000 elements!");
    }


}