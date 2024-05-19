<?php
namespace App\Tests\Controller;
use App\Render\Preview;
use InvalidArgumentException;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
class Stage2Test extends WebTestCase
{
    protected static $header_cells = ["Ticket ID", "Price Category", "Price", "Date", "Remove"];
    protected static $content_cells = [[1, "adult", "12.00", "22.10.2019", "-", "/order/13/ticket/remove?id=1"]];
    protected static $content_cells_r = [
        [1, "adult", "12.00", "22.10.2019", "-", "/order/13/ticket/remove?id=1"],
        [2, "adult", "12.00", "22.11.2019", "-", "/order/13/ticket/remove?id=2"],
        [3, "child", "7.00", "22.11.2019", "-", "/order/13/ticket/remove?id=3"],
        [4, "senior", "9.00", "22.11.2019", "-", "/order/13/ticket/remove?id=4"],
        [5, "adult", "12.00", "12.12.2019", "-", "/order/13/ticket/remove?id=5"],
        [6, "senior", "9.00", "12.12.2019", "-", "/order/13/ticket/remove?id=6"],
        [7, "child", "7.00", "12.12.2019", "-", "/order/13/ticket/remove?id=7"],
        [8, "senior", "9.00", "12.12.2019", "-", "/order/13/ticket/remove?id=8"]
    ];
    protected $count = 0;
    private static $render;
    /** @var  Application $application */
    protected static $application;
    public function testShowPost(){
        //SetUp
        $client = static::createClient();
        self::$render = new Preview();
        $crawler = $client->request('GET', '/test/stage2/1');
        $this->assertEquals(200, $client->getResponse()->getStatusCode(), "Template cannot be rendered. Maybe you've done template syntax error. Expected status code 200 but was: " . $client->getResponse()->getStatusCode() . $this->getAdditionalErrorMessage($client, $crawler));
        //prepare print
        self::$render->add_html($crawler->html(), 1, 1);

        //1_1
        $this->assertCount(1, $crawler->filter('link'), "You included no stylesheet or did it wrong");
        $this->assertEquals($crawler->filter('link')->attr('href'), '/css/style.css', "You included the wrong stylesheet");

        //1_2
        $this->assertCount(1, $crawler->filter('div.header'), "There is not the right amount of divs with the class header in your HTML. Expected 1, got ".$crawler->filter('div.header')->count());
        $this->assertCount(1, $crawler->filter('div.content'), "There is not the right amount of divs with the class content in your HTML. Expected 1, got ".$crawler->filter('div.content')->count());

        //1_3
        $this->assertCount(1, $crawler->filter('div.header h2'), "There is not the right amount of h2 tags in your HTML. Expected 1, got ".$crawler->filter('div.header h2')->count());
        $this->assertSelectorTextContains('div.header h2', 'City Tower Leipzig' ,"Your title in the header section is wrong. Expected: City Tower Leipzig, got ".$crawler->filter('div.header h2')->text());

        //1_4
        $this->assertCount(1, $crawler->filter('div.content div'), "There is not the right amount of divs in the content section of your HTML. Expected 1, got ".$crawler->filter('div.content div')->count());
        $this->assertStringContainsString("message", $crawler->filter('div.content div')->attr('class'), "The div has not the right CSS class.");
        $this->assertStringContainsString("success", $crawler->filter('div.content div')->attr('class'), "The div has not the right CSS class.");
        $this->assertSelectorTextContains('div.content div', 'Ticket #1 added.' ,"Your message content is wrong. Expected: Ticket #1 added., got ".$crawler->filter('div.content div')->text());
        //test no msg
        $crawler = $client->request('GET', '/test/stage2/3');
        $this->assertEquals(200, $client->getResponse()->getStatusCode(), "Template cannot be rendered. Maybe you've done template syntax error. Expected status code 200 but was: " . $client->getResponse()->getStatusCode() . $this->getAdditionalErrorMessage($client, $crawler));
        $this->assertCount(0, $crawler->filter('div.content div'), "You should not display the message div if no message is given to you. Expected 0, got ".$crawler->filter('div.content div')->count());

        //1_5
        $this->assertCount(1, $crawler->filter('div.content h3'), "There is not the right amount of h3 tags in the content div in your HTML. Expected 1, got ".$crawler->filter('div.content h3')->count());
        $this->assertSelectorTextContains('div.content h3', 'Your Order #13' ,"Your title in the content section is wrong. Expected: Your Order #13, got ".$crawler->filter('div.content h3')->text());
        $this->assertCount(1, $crawler->filter('div.content h3 i'), "There is not the right amount of i tags in the h3 tag of the content div in your HTML. Expected 1, got ".$crawler->filter('div.content h3 i')->count());
        $this->assertCount(1, $crawler->filter('div.content h3 i.order_id'), "Your i has not the right CSS class. Expected order_id, got ".$crawler->filter('div.content h3 i')->attr("class"));
        $this->assertSelectorTextContains('div.content h3 i', '#13' ,"The text in the i section is wrong. Expected: Your Order #13, got ".$crawler->filter('div.content h3 i')->text());

        //1_6
        $this->assertCount(1, $crawler->filter('div.content table'), "There is no table in the content div in your HTML. Expected 1, got ".$crawler->filter('div.content table')->count());
        $this->assertCount(1, $crawler->filter('div.content table.tickets'), "The table has not the right CSS class in the content div in your HTML. Expected tickets, got ".$crawler->filter('div.content table')->attr('class'));
        $this->assertCount(5, $crawler->filter('div.content table tr th'), "The amount of table head cells in the table of your content div is wrong. Expected 5, got ".$crawler->filter('div.content table tr th')->count());
        $crawler->filter('div.content table tr th')->each(function (Crawler $node, $i){
            $this->assertStringContainsString(self::$header_cells[$i], $node->text(), "The text in the table head cells is wrong. Expected: ".self::$header_cells[$i]." in string: '".$node->text()."' but not found.");
        });

        //1_7
        $this->assertCount(2, $crawler->filter('div.content table tr'), "The amount of table rows in the content div in your HTML is wrong. Expected 2, got ".$crawler->filter('div.content table tr')->count());
        $crawler->filter('div.content table tr')->each(function (Crawler $node, $i){
            if ($i > 0){
                $node->filter('td')->each(function (Crawler $td, $j){
                    $this->assertStringContainsString(self::$content_cells[$this->count][$j], $td->text() ,"The text in the table head cells is wrong. Expected: ".self::$content_cells[$this->count][$j]." in string: '".$td->text()."' but not found.");
                    if ($j == 4) {
                        $this->assertCount(1, $td->filter('a'), "There is no delete ticket link in the table in your content div. Expected 1, got ".$td->filter('a')->count());
                        $this->assertEquals(self::$content_cells[$this->count][$j+1], $td->filter('a')->attr('href'), "The link reference of the delete ticket link is wrong. Expected: ".self::$content_cells[$this->count][$j+1].", but got ".$td->filter('a')->attr('href'));
                    }
                });
                $this->count ++;
            }
        });

        $client = static::createClient();
        $crawler_t = $client->request('GET', '/test/stage2/4');
        $this->assertEquals(200, $client->getResponse()->getStatusCode(), "Template cannot be rendered. Maybe you've done template syntax error. Expected status code 200 but was: " . $client->getResponse()->getStatusCode() . $this->getAdditionalErrorMessage($client, $crawler));
        $this->assertCount(1, $crawler_t->filter('div.content table tr'), "You should not have more table rows than your head if no tickets are provided. Expected 1, got ".$crawler_t->filter('div.content table tr')->count());

        $this->count = 0;

        //1_8
        $client = static::createClient();
        $crawler = $client->request('GET', '/test/stage2/2');
        $this->assertEquals(200, $client->getResponse()->getStatusCode(), "Template cannot be rendered. Maybe you've done template syntax error. Expected status code 200 but was: " . $client->getResponse()->getStatusCode() . $this->getAdditionalErrorMessage($client, $crawler));
        $this->assertSelectorTextContains('div.content h3', 'Your Order #14' ,"Your title in the content section is wrong. Expected: Your Order #14, got ".$crawler->filter('div.content h3')->text());
        $crawler->filter('div.content table tr')->each(function (Crawler $node, $i){
            if ($i > 0){
                $node->filter('td')->each(function (Crawler $td, $j){
                    $this->assertStringContainsString(self::$content_cells_r[$this->count][$j], $td->text() ,"The text in the table-head cells is wrong. Expected: ".self::$content_cells_r[$this->count][$j]." in string: '".$td->text()."' but not found.");
                    if ($j == 4) {
                        $this->assertCount(1, $td->filter('a'), "There is no delete ticket link in the table in your content div. Expected 1, got ".$td->filter('a')->count());
                        $this->assertEquals(self::$content_cells_r[$this->count][$j+1], $td->filter('a')->attr('href'), "The link-reference of the delete ticket link is wrong. Expected: ".self::$content_cells_r[$this->count][$j+1].", but got ".$td->filter('a')->attr('href'));
                    }
                });
                $this->count ++;
            }
        });
        self::$render->add_html($crawler->html(), 1, 8);

        //Needs to be printed
    }

    function setUp(){
        $kernel = self::bootKernel();
        echo "##polylith[testStarted";

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();

        $application = new Application($kernel);
        $application->setAutoExit(false);

        $input = new ArrayInput([
            'command' => 'doctrine:fixtures:load',
            '--quiet' => true,
            '--no-interaction' => true
        ]);
        $application->run($input);
    }

    protected function tearDown(): void {
        echo("\n##polylith[testFinished\n");
    }

    static function tearDownAfterClass(){
        self::$render->write();
    }

    private function getAdditionalErrorMessage(\Symfony\Bundle\FrameworkBundle\KernelBrowser $client, Crawler $crawler)
    {
        try {
            $additionalText = "\n" . $crawler->filter("title")->text();
            return $additionalText;
        } catch (InvalidArgumentException $error) {
            return $client->getResponse()->getContent();
        }
    }

}
