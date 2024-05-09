<?php
use EntwicklerHeld\MarkdownParserPhp;

use PHPUnit\Framework\TestCase;

final class MarkdownParserPhpTest extends TestCase
{

    protected function setUp(): void
    {
        print("##polylith[testStarted\n");
    }

    protected function tearDown(): void
    {
        print("\n##polylith[testFinished");
    }

    public function testParsingParagraph(): void
    {
        $this->assertResult('This will be a paragraph', '<p>This will be a paragraph</p>');
    }

    public function testParsingItalics(): void
    {
        $this->assertResult('_This will be italic_', '<p><em>This will be italic</em></p>');
    }

    public function testParsingBoldText(): void
    {
        $this->assertResult('__This will be bold__', '<p><strong>This will be bold</strong></p>');
    }

    public function testMixedNormalItalicsAndBoldText(): void
    {
        $this->assertResult('This will _be_ __mixed__', '<p>This will <em>be</em> <strong>mixed</strong></p>');
    }

    public function testWithH1Headerlevel(): void
    {
        $this->assertResult('# This will be an h1', '<h1>This will be an h1</h1>');
    }

    public function testWithH2Headerlevel(): void
    {
        $this->assertResult('## This will be an h2', '<h2>This will be an h2</h2>');
    }

    public function testWithH3Headerlevel(): void
    {
        $this->assertResult('### This will be an h3', '<h3>This will be an h3</h3>');
    }

    public function testWithH4Headerlevel(): void
    {
        $this->assertResult('#### This will be an h4', '<h4>This will be an h4</h4>');
    }

    public function testWithH5Headerlevel(): void
    {
        $this->assertResult('##### This will be an h5', '<h5>This will be an h5</h5>');
    }

    public function testWithH6Headerlevel(): void
    {
        $this->assertResult('###### This will be an h6', '<h6>This will be an h6</h6>');
    }

    public function testWithH7HeaderlevelAsParagraph(): void
    {
        $this->assertResult('####### This will not be an h7', '<p>####### This will not be an h7</p>');
    }

    public function testUnorderedLists(): void
    {
        $this->assertResult(
            "* Item 1\n* Item 2",
            '<ul><li>Item 1</li><li>Item 2</li></ul>'
        );
    }

    public function testWithALittleBitOfEverything(): void
    {
        $this->assertResult(
            "# Header!\n* __Bold Item__\n* _Italic Item_",
            '<h1>Header!</h1><ul><li><strong>Bold Item</strong></li><li><em>Italic Item</em></li></ul>'
        );
    }

    public function testWithMarkdownSymbolsInHeaderText(): void
    {
        $this->assertResult(
            "# This is a header with # and * in the text",
            '<h1>This is a header with # and * in the text</h1>'
        );
    }

    public function testWithMarkdownSymbolsInListItem(): void
    {
        $this->assertResult(
            "* Item 1 with a # in the text\n* Item 2 with * in the text",
            '<ul><li>Item 1 with a # in the text</li><li>Item 2 with * in the text</li></ul>'
        );
    }

    public function testWithMarkdownSymbolsInParagraph(): void
    {
        $this->assertResult(
            "This is a paragraph with # and * in the text",
            '<p>This is a paragraph with # and * in the text</p>'
        );
    }

    public function testUnorderedListsCloseProperlyWithPrecedingAndFollowingLines(): void
    {
        $this->assertResult(
            "# Start a list\n* Item 1\n* Item 2\nEnd a list",
            '<h1>Start a list</h1><ul><li>Item 1</li><li>Item 2</li></ul><p>End a list</p>'
        );
    }

    public function assertResult($markdown, $expectedHtml): void
    {
        $this->assertEquals($expectedHtml, MarkdownParserPhp::parseMarkdown($markdown), "Parser produces a wrong result for input:\n" . $markdown . "\n\n");
    }
}