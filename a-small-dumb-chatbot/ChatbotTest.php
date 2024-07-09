<?php

declare(strict_types=1);
include(dirname(__FILE__) . "/../src/Chatbot.php");

use PHPUnit\Framework\TestCase;

final class ChatbotTest extends TestCase
{
    private static $init = False;
    private $names = ["Ben", "Hugo", "Phill", "Jakob", "Steffi", "Charlie", "Christine", "Betty", "Clare", "Olivia"];
    private static $chatbot;
    private static  $chatbots;
    private $things = [
        "mango" => [false, ""],
        "apples" => [true, ""],
        "cake" => [false, "apples"],
        "inlineskating" => [true, ""],
        "spinach" => [false, "inlineskating"],
        "mushrooms" => [false, ""],
        "art" => [true, ""],
        "magic" => [false, "art"],
        "banana" => [false, "art"],
        "linux" => [false, "inlineskating"],
        "ori" => [true, ""],
        "boots" => [false, "ori"],
        "uber" => [true, ""],
        "cups" => [false, "uber"],
    ];

    protected function setUp()
    {
        if (!self::$init) {
            foreach ($this->names as $name) {
                self::$chatbots[$name] = new Chatbot();
            }
            self::$chatbot = new Chatbot();
            self::$init = True;
        }
        print("##polylith[testStarted\n");
    }

    protected function tearDown()
    {
        print("\n##polylith[testFinished");
    }

    public function test_scenario_1(): void
    {
        $this->assertEquals("Hi :-) Who are you?", self::$chatbot->chat("Hi"), "Expected the answer: 'Hi :-) Who are you?' for the message 'Hi'");
    }

    public function test_scenario_2(): void
    {
        $this->assertStringContainsString("I'm happy to text you, Amanda. I am ", self::$chatbot->chat("I'm Amanda. And who are you?"), "Expected the answer: 'I'm happy to text you, Amanda. I am `\$name`' for the message 'I'm Amanda. And who are you?'");
        foreach ($this->names as $name) {
            $this->assertStringContainsString("I'm happy to text you, $name. I am ", self::$chatbots[$name]->chat("I'm $name. And who are you?"), "Expected the answer: 'I'm happy to text you, $name. I am `\$name`' for the message 'I'm $name. And who are you?'");
        }
    }

    public function test_scenario_3(): void
    {
        $this->assertEquals("Sorry Amanda, I don't like mango.", self::$chatbot->chat("Hey, I like mango. Do you like mango too?"), "Expected the answer: 'Sorry Amanda, I don't like mango.' for the message 'Hey, I like mango. Do you like mango too?'");
        $this->assertEquals("You like apples? I really like apples too.", self::$chatbot->chat("Hey, I like apples. Do you like apples too?"), "Expected the answer: 'You like apples? I really like apples too.' for the message 'Hey, I like apples. Do you like apples too?'");
        $this->assertEquals("Sorry Amanda, I don't like cake. But I heard, you like apples.", self::$chatbot->chat("Hey, I like cake. Do you like cake too?"), "Expected the answer: 'You like apples? I really like apples too.' for the message 'Hey, I like cake. Do you like cake too?'");
        foreach ($this->names as $name) {
            foreach ($this->things as $thing => $value) {
                $reply = "Sorry $name, I don't like $thing.";
                if ($value[0]) {
                    $reply = "You like $thing? I really like $thing too.";
                }
                if (!$value[0] && $value[1] !== "") {
                    $reply = "Sorry $name, I don't like $thing. But I heard, you like ".$value[1].".";
                }
                $this->assertEquals($reply, self::$chatbots[$name]->chat("Hey, I like $thing. Do you like $thing too?"), "Expected the answer: '$reply' for the message 'Hey, I like $thing. Do you like $thing too?'");
            }
        }
    }
}
