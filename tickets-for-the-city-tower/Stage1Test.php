<?php

namespace App\Tests\Repository;

use App\Entity\Ticket;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;

class UserRepositoryTest extends KernelTestCase
{

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $entityManager;

    /** @var  Application $application */
    protected static $application;

    protected static $users = ['Max Mustermann', '', 'Vanessa Denton', 'Elin Neale', 'Lauren Bernard', 'Zaynab Mcgregor'];

    function setUp(){
        $kernel = self::bootKernel();
        echo("\n##polylith[testStarted\n");
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
    public function testGetUserByName()
    {
        //1_2
        $user = $this->entityManager
            ->getRepository(User::class)
            ->getUserByName("Plumplori");

        $user_assert = $this->getUserByName("Plumplori");

        $this->assertEquals($user_assert, $user, "You should return the right User object");

        //1_3
        try {
            $this->entityManager->getRepository(User::class)->getUserByName([123]);
            $this->fail("No TypeError was thrown, but expected");
        } catch (\TypeError $e) { }

        //1_4
        foreach (self::$users as $username) {
            $user = $this->entityManager
                ->getRepository(User::class)
                ->getUserByName($username);

            $user_assert = $this->getUserByName($username);
            $this->assertEquals($user_assert, $user, "You should return the right User object");
        }
    }

    public function testValidTickets()
    {
        //2_1
        try {
            $user = $this->entityManager
                ->getRepository(User::class)
                ->getUserByTicket($this->getTicketByUser('Plumplori', 0)->getId());
        } catch (\Exception $e) {
            $this->fail("Your implementation failed during the test. Exception: " . $e);
        }
        //2_2
        $user = $this->entityManager
            ->getRepository(User::class)
            ->getUserByTicket($this->getTicketByUser('Plumplori', 0)->getId());
        $this->assertEquals($this->getUserByName('Plumplori'), $user, "You found not the right owner of the tickets");

        $user = $this->entityManager
            ->getRepository(User::class)
            ->getUserByTicket($this->getTicketByUser('Plumplori', 2)->getId());
        $this->assertEquals($this->getUserByName('Plumplori'), $user, "You found not the right owner of the tickets");
        //2_3
        try {
            $this->entityManager->getRepository(User::class)->getUserByTicket(['1234']);
            $this->fail("No TypeError was thrown, but expected");
        } catch (\TypeError $e) { }
        //2_4
        foreach (self::$users as $u) {
            $user = $this->entityManager
                ->getRepository(User::class)
                ->getUserByTicket($this->getTicketByUser($u, 0)->getId());
            $this->assertEquals($this->getUserByName($u), $user, "You found not the right owner of the tickets");

            $user = $this->entityManager
                ->getRepository(User::class)
                ->getUserByTicket($this->getTicketByUser($u, 2)->getId());
            $this->assertEquals($this->getUserByName($u), $user, "You found not the right owner of the tickets");
        }
    }

    protected function getUserByName(String $name): ?User
    {
        return $this->entityManager->createQueryBuilder()
            ->select("u")
            ->from("App\Entity\User", "u")
            ->Where('u.name = :val')
            ->setParameter("val", $name)
            ->getQuery()
            ->getOneOrNullResult();
    }

    protected function getTicketByUser(String $name, int $pos): ?Ticket
    {
        try {
            $user = $this->entityManager->getRepository(User::class)->findBy(array('name' => $name))[0];
            $order = $this->entityManager->createQueryBuilder('o')
                ->select("o")
                ->from("App\Entity\Orders", "o")
                ->where('o.user = :uid')
                ->setParameter('uid', $user->getId())
                ->getQuery()
                ->getResult()[0];
            if ($order != null) {
                return $this->entityManager->createQueryBuilder('t')
                    ->select("t")
                    ->from("App\Entity\Ticket", "t")
                    ->where('t.order_id = :oid')
                    ->setParameter('oid', $order->getId())
                    ->getQuery()
                    ->getResult()[$pos];
            } else {
                return null;
            }
        } catch (Exception $e) {
            return null;
        }
    }
    
    static function tearDownAfterClass(){
        echo "##polylith[testFinished";
    }
}
