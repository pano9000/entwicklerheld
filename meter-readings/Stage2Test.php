<?php
declare(strict_types=1);

namespace EntwicklerHeld\Tests;

use Angle\Chrono;
use EntwicklerHeld\BaseCsvIterator;
use EntwicklerHeld\CustomCsvParser;
use phpmock\MockBuilder;
use PHPUnit\Framework\TestCase;


class Stage2Test extends TestCase
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


    # SCENARIO 1
    public function testCustomCsvParser()
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
        $parserOfUser = new CustomCsvParser($filePath);

        # THEN
        $this->assertInstanceOf(BaseCsvIterator::class, $parserOfUser);
        $this->assertNotEmpty($parserOfUser, "Your array data should not be empty!");

        $this->assertLessThan(100, Chrono::ms(), "ALARM: Your Parser is to slow!");


        $actualArray = array();
        foreach ($parserOfUser as $item) {
            array_push($actualArray, $item);
        }
        strpos(file_get_contents(__DIR__ . "/../src/CustomCsvParser.php"), '\fgetcsv') ? $this->fgetcsvCalledCount = +1 : null;
        $this->assertEquals($expectedArray, $actualArray);
        $this->assertEquals(0, $this->fgetcsvCalledCount, "The method fgetcsv should not used!");
        $this->assertCount(1, $parserOfUser, "Your array data should contain 1 entry because the csv only contains 1 element!");
    }

    public function testCustomCsvParserRandomSmall()
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
        $csvIterator = new CustomCsvParser($filePath);


        # THEN
        $this->assertInstanceOf(BaseCsvIterator::class, $csvIterator);
        $this->assertNotEmpty($csvIterator, "Your array data should not be empty!");
        strpos(file_get_contents(__DIR__ . "/../src/CustomCsvParser.php"), '\fgetcsv') ? $this->fgetcsvCalledCount = +1 : null;
        $this->assertEquals(0, $this->fgetcsvCalledCount, "The method fgetcsv should not used!");

        $this->assertLessThan(100, Chrono::ms(), "ALARM: Your Parser is to slow!");
        $this->assertEquals($expectedArray, $csvIterator->getData());
        $actualArray = array();
        foreach ($csvIterator as $item) {
            array_push($actualArray, $item);
        }

        $this->assertEquals($expectedArray, $actualArray);
        $this->assertCount(4, $csvIterator, "Your array \$data should contain 4 entries because the csv contains 4 elements!");
    }

    public function testRandomCustomCsvParser()
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
        $csvIterator = new CustomCsvParser($filePath);

        # THEN
        $this->assertInstanceOf(BaseCsvIterator::class, $csvIterator);
        $this->assertNotEmpty($csvIterator, "Your array \$data should not be empty!");
        $this->assertLessThan(100, Chrono::ms(), "ALARM: Your Parser is to slow!");


        foreach ($csvIterator as $item) {
            $this->assertContains($item, $expectedArray);
        }
        strpos(file_get_contents(__DIR__ . "/../src/CustomCsvParser.php"), '\fgetcsv') ? $this->fgetcsvCalledCount = +1 : null;
        $this->assertEquals(0, $this->fgetcsvCalledCount, "The method fgetcsv should not used!");


        $this->assertCount(5000, $csvIterator, "Your array \$data should contain 5000 entries because the csv contains 5000 elements!");
    }


}