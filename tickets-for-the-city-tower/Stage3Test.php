<?php
namespace App\Tests\Controller;

use App\Render\Preview;
use App\Entity\Orders;
use App\Entity\Ticket;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Console\Input\ArrayInput;

class Stage3Test extends WebTestCase
{
    private static $render;

    /** @var  Application $application */
    protected static $application;
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private static $entityManager;

    private static $client;

    protected static $users = ['Max Mustermann', 'Vanessa Denton', 'Elin Neale', 'Lauren Bernard', 'Zaynab Mcgregor'];

    static function setUpBeforeClass(){
        self::$render = new Preview();

        $kernel = self::bootKernel();

        self::$entityManager = $kernel->getContainer()
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

    protected function setUp(){
        echo("\n##polylith[testStarted\n");
        self::$client = static::createClient();
    }

    public function testNewOrder(){
        //1_2
        $crawler = self::$client->request('POST', '/order/add/', ['username' => 'Ronny']);
        if (!self::$client->getResponse()->isSuccessful()) {$this->assertEquals(200, self::$client->getResponse()->getStatusCode(), $crawler->filter('title')->text());} else {$this->assertEquals(200, self::$client->getResponse()->getStatusCode(), "You made something wrong, check your implementation.");}

        //1_3

        //database
        $user = self::$entityManager->getRepository(User::class)->findBy(array("name" => "Ronny"))[0];

        $order = self::$entityManager->getRepository(Orders::class)->findOneBy(array("user" => $user));

        $this->assertNotEquals(null, $order, "You have not saved your order to the database with the passed user.");
        $this->assertEquals("Ronny", $order->getUser()->getName(), "Your order is assigned to the wrong User");
        $this->assertEquals(0, $order->getPrice(), "Your Price for this order is wrong");
        $this->assertEquals(\date("d.m.Y", \time()), $order->getDate()->format("d.m.Y"), "Your creation date is wrong for this order");
        $this->assertCount(0, $order->getTickets(), "Your Order should not have any tickets");

        //response
        $this->assertCount(0, $crawler->filter('div.content table tr:nth-of-type(2)'), "Your response should not have any tickets");
        $this->assertCount(1, $crawler->filter('div.content div.success'), "You should return a success message to the user");
        $this->assertSelectorTextContains(".message", "New Order created", "Your message isn't right. Expected: 'New Order created', got: ".$crawler->filter(".message")->text());

        //1_4
        $crawler = self::$client->request('POST', '/order/add/', ['username' => 'Entwicklerheld']);
        $this->assertEquals(404, self::$client->getResponse()->getStatusCode(), "If the user doesn't exist return a 404 status code");

        //1_5
        foreach(self::$users as $user){
            $crawler = self::$client->request('POST', '/order/add/', ['username' => $user]);
            if (!self::$client->getResponse()->isSuccessful()) {$this->assertEquals(200, self::$client->getResponse()->getStatusCode(), $crawler->filter('title')->text());} else {$this->assertEquals(200, self::$client->getResponse()->getStatusCode(), "You made something wrong, check your implementation.");}
            $order_id = ltrim($crawler->filter('div.content i.order_id')->text(), "#");
            $this->assertCount(1, self::$entityManager->getRepository(Orders::class)->findBy(array("id" => $order_id)), "The order #".$order_id." has not been persisted.");
            $this->assertContains("Order: #".$order_id." for ".$user.", price: 0, created at: ".date("d.m.Y", time())." shipping: false. Ticket IDs:", (string)self::$entityManager->getRepository(Orders::class)->findBy(array("id" => $order_id))[0], "The order is not correct.");
        }
    }

    public function testAddTickets(){
        //setUp
        foreach(self::$users as $username) {
            $this->createOrder($username);
        }
        $order_ids = array();
        $orders = self::$entityManager->getRepository(Orders::class)->findAll();
        foreach ($orders as $order){
            array_push($order_ids, $order->getId());
        }
        $ticketCountBeforeRequest = count(self::$entityManager->getRepository(Ticket::class)->findAll());
        $crawler = self::$client->request('POST', '/order/'.$order_ids[0].'/ticket/add/', ['category' => 'adult', 'date' => '30.09.2051']);
        if (!self::$client->getResponse()->isSuccessful()) {$this->assertEquals(200, self::$client->getResponse()->getStatusCode(), $crawler->filter('title')->text());} else {$this->assertEquals(200, self::$client->getResponse()->getStatusCode(), "You made something wrong, check your implementation.");}
        $ticketCountAfterRequest = count(self::$entityManager->getRepository(Ticket::class)->findAll());
        $ticket = self::$entityManager->getRepository(Ticket::class)->findBy(array(), array("id" => 'DESC'))[0];
        $createdTicket = $ticketCountBeforeRequest < $ticketCountAfterRequest;
        $this->assertTrue($createdTicket,  "You don't saved any tickets");
        $this->assertNotEquals(null, $ticket, "You don't saved any tickets");
        $this->assertContains('in order #'.$order_ids[0].', price: 12, category: adult, valid at: 30.09.2051', (string)$ticket, "Your saved ticket is wrong");

        //1_3 
        $this->assertCount(1, $crawler->filter('div.content table tr:nth-of-type(2)'), "Your response should contain 1 ticket");
        $this->assertSelectorTextContains("div.content table", $ticket->getId(), "Your response should contain a ticket with the right ticket id. Expect ".$ticket->getId().", got ".$crawler->filter('div.content table tr')->text());
        $this->assertCount(1, $crawler->filter('div.content div.success'), "You should return a success message to the user");
        $this->assertSelectorTextContains(".message", "#".$ticket->getId()." was added to your order.", "Your message isn't right. Expected: '#".$ticket->getId()." was added to your order.', got: ".$crawler->filter(".message")->text());

        self::$client->request('POST', '/order/12345789473625/ticket/add/', ['category' => 'noman', 'date' => '30.09.2051']);
        $this->assertEquals(404, self::$client->getResponse()->getStatusCode(), "If the category doesn't exist return a 404 status code");

        foreach($order_ids as $order_id){
            //Create 2 new tickets
            $ticketCountBeforeRequest = count(self::$entityManager->getRepository(Ticket::class)->findAll());

            $crawler = self::$client->request('POST', '/order/' . $order_id . '/ticket/add/', ['category' => 'adult', 'date' => '30.09.2051']);
            if (!self::$client->getResponse()->isSuccessful()) {$this->assertEquals(200, self::$client->getResponse()->getStatusCode(), $crawler->filter('title')->text());} else {$this->assertEquals(200, self::$client->getResponse()->getStatusCode(), "You made something wrong, check your implementation.");}

            $ticketCountAfterRequest = count(self::$entityManager->getRepository(Ticket::class)->findAll());

            $ticket = self::$entityManager->getRepository(Ticket::class)->findBy(array(), array("id" => 'DESC'))[0];
            $createdTicket = $ticketCountBeforeRequest < $ticketCountAfterRequest;
            $this->assertTrue($createdTicket,  "You don't saved any tickets");
            $this->assertNotEquals(null, $ticket, "You don't saved any tickets");
            $this->assertContains('in order #' . $order_id . ', price: 12, category: adult, valid at: 30.09.2051', (string)$ticket, "Your saved ticket is wrong");
            $this->assertCount(1, $crawler->filter('div.content table tr:nth-of-type(2)'), "Your response should contain 1 ticket");
            $this->assertSelectorTextContains("div.content table", $ticket->getId(), "Your response should contain a ticket with the right ticket id. Expect ".$ticket->getId().", got ".$crawler->filter('div.content table tr')->text());
            $this->assertCount(1, $crawler->filter('div.content div.success'), "You should return a success message to the user");
            $this->assertSelectorTextContains(".message", "#".$ticket->getId()." was added to your order.", "Your message isn't right. Expected: '#".$ticket->getId()." was added to your order.', got: ".$crawler->filter(".message")->text());
        }
    }

    protected function tearDown(): void {
        echo("\n##polylith[testFinished\n");
    }

    function createOrder($username) {
        $order = new Orders();
        $user = self::$entityManager->getRepository(User::class)->findOneBy(array("name" => $username));
        if ($user )
        $order->setUser($user);
        $order->setShipping(false);
        $order->setPrice(0);
        $order->setDate(new \DateTime());
        self::$entityManager->persist($order);
    }

    function createTicketForOrder($order_id, $category_name, $date){
        try{
            $order = self::$entityManager->getRepository(Orders::class)->findBy(array("id" => $order_id))[0];
            $category = self::$entityManager->getRepository(TicketCategory::class)->findBy(array("name" => $category_name))[0];
        }
        catch(\Exception $e){
            return;
        }
        $ticket = new Ticket();
        $ticket->setCategory($category);
        $ticket->setValidDate(\DateTime::createFromFormat('d.m.Y', $date));
        $ticket->setOrderId($order);

        self::$entityManager->persist($ticket);
        self::$entityManager->flush();
    }
}