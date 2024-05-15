<?php

use App\Entity\Category;
use App\Entity\Training;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\HttpFoundation\Response;

class TrainingsApiTestCase extends WebTestCase
{
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $entityManager;
    /**
     * @var \Doctrine\Common\Persistence\ObjectRepository|\Doctrine\ORM\EntityRepository
     */
    private $userRepository;

    /**
     * @var \Doctrine\Common\Persistence\ObjectRepository|\Doctrine\ORM\EntityRepository
     */
    private $categoryRepository;
    private $categoryRunning;
    private $categorySwimming;

    protected function setUp()
    {
        $kernel = self::bootKernel();
        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();

        $application = new Application($kernel);
        $application->setAutoExit(false);

        // BECAUSE WE HAVE NO FIXTURES THIS GENERATES AN EMPTY DATABASE
        $input = new ArrayInput([
            'command' => 'doctrine:fixtures:load',
            '--quiet' => true,
            '--no-interaction' => true
        ]);
        $application->run($input);

        // REGISTER REPOS FOR DATABASE CALLS
        $this->userRepository = $this->entityManager->getRepository(User::class);
        $this->categoryRepository = $this->entityManager->getRepository(Category::class);

        // EXPLICIT CHECK IF DATABASE IS EMPTY (HAS NO USER) -- I HATE DOCTRINE SYMFONY OR WHATEVER
        $users = $this->userRepository->findAll();
        $this->assertEmpty($users);

        $this->categoryRunning = $this->createCategory("Running");
        $this->categorySwimming = $this->createCategory("Swimming");

        $this->createUser("Ilja");
        $this->createUser("Philipp");
        $this->createUser("Ronny");
        $this->createUser("Steffi");
        $this->createUser("Norma");
        $this->createUser("Dan");
        $this->createUser("Daniel");
        $this->createUser("Ron");
        $this->createUser("Felix");
        $this->createUser("Jakob");
        $this->createUser("Andre");
        $this->createUser("Mirko");
        $this->createUser("Christian");

        parent::setUp();

        print("\n##polylith[testStarted\n");

    }

    protected function tearDown(): void
    {
        parent::tearDown();
        print("\n##polylith[testFinished\n");
    }

    public function testAddUser()
    {
        # GIVEN
        $this->createUser("Plumplori");

        # WHEN
        $users = $this->userRepository->findAll();

        # THEN
        $this->assertNotEmpty($users);

    }

    public function testGetScore200()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 854
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 200, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 354, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 300, $this->categoryRunning);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 854,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent());
    }

    public function testGetScoreRandom1()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 2854
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 200, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 354, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 300, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 1000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 1000, $this->categoryRunning);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 2854,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent());
    }

    public function testGetScoreRandom2()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 12800
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 3000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 4000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 3800, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categoryRunning);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 12800,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent(), "This is a random check.");
    }

    public function testGetScoreRandom3()
    {
        # GIVEN
        $user = $this->createUser("Random EntwicklerHeld");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Random EntwicklerHeld",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 13800
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 3000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 4000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 3800, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 1000, $this->categoryRunning);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 13800,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent(), "Attention now the user Random EntwicklerHeld sends the request. You should get the user from the \$request, who sends the request.");
    }

    public function testGetScoreWithGetParam200()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 854
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 200, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 354, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 300, $this->categoryRunning);

        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/?category=Running");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 854,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent());
    }

    public function testGetScoreWithGetParamRandom1()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 2854
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 200, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 354, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 300, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 1000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 1000, $this->categoryRunning);

        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/?category=Running");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 2854,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent());
    }

    public function testGetScoreWithGetParamRandom2()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 12800
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 3000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 4000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 3800, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categoryRunning);

        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categorySwimming);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/?category=Running");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 12800,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent());
    }

    public function testGetScoreWithGetParamRandom3()
    {
        # GIVEN
        $user = $this->createUser("Random EntwicklerHeld");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Random EntwicklerHeld",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 13800
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 3000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 4000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 3800, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 2000, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 1000, $this->categoryRunning);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/?category=Running");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 13800,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent(), "Attention now the user Random EntwicklerHeld sends the request. You should get the user from the \$request, who sends the request.");
    }

    public function testGetLeaderBoard()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        $this->createLeaderBoardWhereUserIsPlaceTwo($user->getUsername());

        # WHEN
        $crawler = $client->request("GET", "/get_leaderboard/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            array("position" => 1, "name" => "Ilja", "score" => 1500),
            array("position" => 2, "name" => "Plumplori", "score" => 1450),
            array("position" => 3, "name" => "Philipp", "score" => 1400),
            array("position" => 4, "name" => "Ronny", "score" => 1300),
            array("position" => 5, "name" => "Steffi", "score" => 1100),
            array("position" => 6, "name" => "Norma", "score" => 900),
            array("position" => 7, "name" => "Dan", "score" => 750),
            array("position" => 8, "name" => "Daniel", "score" => 500),
            array("position" => 9, "name" => "Ron", "score" => 450),
            array("position" => 10, "name" => "Felix", "score" => 400),
        );
        $actual = json_decode($response->getContent(), true);
        $this->assertEquals($expectedData, $actual);
    }

    public function testGetLeaderBoardPlaceTen()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        $this->createLeaderBoardWhereUserIsPlaceTen($user->getUsername());

        # WHEN
        $crawler = $client->request("GET", "/get_leaderboard/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            array("position" => 1, "name" => "Ilja", "score" => 1600),
            array("position" => 2, "name" => "Andre", "score" => 1450),
            array("position" => 3, "name" => "Philipp", "score" => 1400),
            array("position" => 6, "name" => "Norma", "score" => 900),
            array("position" => 7, "name" => "Dan", "score" => 750),
            array("position" => 8, "name" => "Daniel", "score" => 610),
            array("position" => 9, "name" => "Ron", "score" => 460),
            array("position" => 10, "name" => "Plumplori", "score" => 400),
            array("position" => 11, "name" => "Felix", "score" => 300),
            array("position" => 12, "name" => "Jakob", "score" => 280),

        );
        $actual = json_decode($response->getContent(),  true);
        $this->assertEquals($expectedData, $actual);
    }

    public function testGetLeaderBoardPlaceEleven()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        $this->createLeaderBoardWhereUserIsPlaceEleven($user->getUsername());

        # WHEN
        $crawler = $client->request("GET", "/get_leaderboard/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            array("position" => 1, "name" => "Ilja", "score" => 1600),
            array("position" => 2, "name" => "Andre", "score" => 1450),
            array("position" => 3, "name" => "Philipp", "score" => 1400),
            array("position" => 7, "name" => "Dan", "score" => 750),
            array("position" => 8, "name" => "Daniel", "score" => 610),
            array("position" => 9, "name" => "Ron", "score" => 460),
            array("position" => 10, "name" => "Felix", "score" => 400),
            array("position" => 11, "name" => "Plumplori", "score" => 300),
            array("position" => 12, "name" => "Jakob", "score" => 280),
            array("position" => 13, "name" => "Mirko", "score" => 200),

        );
        $actual = json_decode($response->getContent(),  true);
        $this->assertEquals($expectedData, $actual, "This is a random check. Mr. Plumplori is now at place 10.");
    }

    public function testGetLeaderBoardPlaceTwelfth()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        $this->createLeaderBoardWhereUserIsPlaceTwelfth($user->getUsername());

        # WHEN
        $crawler = $client->request("GET", "/get_leaderboard/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            array("position" => 1, "name" => "Ilja", "score" => 1600),
            array("position" => 2, "name" => "Andre", "score" => 1450),
            array("position" => 3, "name" => "Philipp", "score" => 1400),
            array("position" => 8, "name" => "Daniel", "score" => 600),
            array("position" => 9, "name" => "Ron", "score" => 450),
            array("position" => 10, "name" => "Felix", "score" => 400),
            array("position" => 11, "name" => "Jakob", "score" => 300),
            array("position" => 12, "name" => "Plumplori", "score" => 290),
            array("position" => 13, "name" => "Mirko", "score" => 200),
            array("position" => 14, "name" => "Christian", "score" => 110),

        );
        $actual = json_decode($response->getContent(),  true);
        $this->assertEquals($expectedData, $actual, "This is a random check. Mr. Plumplori is now at place 12.");
    }

    public function testGetLeaderBoardLastPlace()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        $this->createLeaderBoardWhereUserIsLastPlace($user->getUsername());

        # WHEN
        $crawler = $client->request("GET", "/get_leaderboard/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            array("position" => 1, "name" => "Ilja", "score" => 1600),
            array("position" => 2, "name" => "Andre", "score" => 1450),
            array("position" => 3, "name" => "Philipp", "score" => 1400),
            array("position" => 8, "name" => "Daniel", "score" => 600),
            array("position" => 9, "name" => "Ron", "score" => 450),
            array("position" => 10, "name" => "Felix", "score" => 400),
            array("position" => 11, "name" => "Jakob", "score" => 300),
            array("position" => 12, "name" => "Christian", "score" => 298),
            array("position" => 13, "name" => "Mirko", "score" => 200),
            array("position" => 14, "name" => "Plumplori", "score" => 100),

        );
        $actual = json_decode($response->getContent(),  true);
        $this->assertEquals($expectedData, $actual);
    }

    public function testGetLeaderBoardRandom()
    {
        # GIVEN
        $user = $this->createUser("Random EntwicklerHeld");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Random EntwicklerHeld",
            'PHP_AUTH_PW' => "test",
        ]);
        $this->createLeaderBoardWhereUserIsPlaceTwoRandom($user->getUsername());

        # WHEN
        $crawler = $client->request("GET", "/get_leaderboard/");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            array("position" => 1, "name" => "Ilja", "score" => 1600),
            array("position" => 2, "name" => "Random EntwicklerHeld", "score" => 1560),
            array("position" => 3, "name" => "Philipp", "score" => 1460),
            array("position" => 4, "name" => "Ronny", "score" => 1300),
            array("position" => 5, "name" => "Steffi", "score" => 1100),
            array("position" => 6, "name" => "Norma", "score" => 900),
            array("position" => 7, "name" => "Dan", "score" => 750),
            array("position" => 8, "name" => "Daniel", "score" => 500),
            array("position" => 9, "name" => "Ron", "score" => 450),
            array("position" => 10, "name" => "Felix", "score" => 400),
        );
        $actual = json_decode($response->getContent(), true);
        $this->assertEquals($expectedData, $actual, "This is a random check. Now the user Random EntwicklerHeld ask for the leaderboard and he is now at place 2. You should use the user in the \$request, who sends the request.");
    }

    public function testGetScoreWithGetParamRandom200()
    {
        # GIVEN
        $user = $this->createUser("Plumplori");
        $client = static::createClient([], [
            'PHP_AUTH_USER' => "Plumplori",
            'PHP_AUTH_PW' => "test",
        ]);
        // User Score is 854
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 200, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 354, $this->categoryRunning);
        $this->addTrainingToUser($user->getUsername(), "Morning Run", 300, $this->categoryRunning);

        $this->addTrainingToUser($user->getUsername(), "Morning Swimming", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Swimming", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Swimming", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Swimming", 2000, $this->categorySwimming);
        $this->addTrainingToUser($user->getUsername(), "Morning Swimming", 2000, $this->categorySwimming);

        # WHEN
        $crawler = $client->request("GET", "/get_total_distance/?category=Swimming");
        $response = $client->getResponse();

        # THEN
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $expectedData = array(
            "totalDistance" => 10000,
        );
        $this->assertJsonStringEqualsJsonString(json_encode($expectedData), $response->getContent(), "Mr. Plumplori wants now his 'swimming' performance. The request was to the url '/get_total_distance/?category=Swimming'");
    }

    ############# START UTILS #############
    private function addTrainingToUser(String $userName, String $title, int $distance, Category $category)
    {
        $training = new Training();
        $training->setTitle($title);
        $training->setValue($distance);
        $training->setCategory($category);

        $user = $this->userRepository->findOneBy(array(
            "username" => $userName,
        ));

        $user->addTraining($training);
        try {
            $this->entityManager->persist($user);
            $this->entityManager->persist($training);
            $this->entityManager->persist($category);
            $this->entityManager->flush();
        } catch (\Doctrine\ORM\ORMException $e) {
        }
        return $training;
    }

    public function createUser($userName)
    {
        $user = new User();
        $user->setUsername($userName);

        $user->setPassword('$argon2id$v=19$m=65536,t=4,p=1$hN4H/EXhgM3BDeURUf0YFg$9h8oO66QelY1t/DywLeg81t3Aob6RM4bUWx8tVwZ7/Q');
        try {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        } catch (\Doctrine\ORM\ORMException $e) {
        }
        return $user;

    }

    public function createCategory($name)
    {
        $category = new Category();
        $category->setName($name);

        try {
            $this->entityManager->persist($category);
            $this->entityManager->flush();
        } catch (\Doctrine\ORM\ORMException $e) {
        }
        return $category;
    }

    private function createLeaderBoardWhereUserIsPlaceTwo(String $userName)
    {
        # PLACE 1
        $this->addTrainingToUser("Ilja", 'Running', 1500, $this->categoryRunning);

        # PLACE 2
        $this->addTrainingToUser($userName, 'Running', 725, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 725, $this->categoryRunning);

        # PLACE 3
        $this->addTrainingToUser("Philipp", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 200, $this->categoryRunning);

        # PLACE 4
        $this->addTrainingToUser("Ronny", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 100, $this->categoryRunning);

        # PLACE 5
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 100, $this->categoryRunning);

        # PLACE 6
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);

        # PLACE 7
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 250, $this->categoryRunning);

        # PLACE 8
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);

        # PLACE 9
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 150, $this->categoryRunning);

        # PLACE 10
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);

        # PLACE 11
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 100, $this->categoryRunning);

        # PLACE 12
        $this->addTrainingToUser("Andre", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 120, $this->categoryRunning);

        # PLACE 13
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);

        # PLACE 14
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 30, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 40, $this->categoryRunning);
    }

    private function createLeaderBoardWhereUserIsPlaceTwoRandom(String $userName)
    {
        # PLACE 1
        $this->addTrainingToUser("Ilja", 'Running', 1600, $this->categoryRunning);

        # PLACE 2
        $this->addTrainingToUser($userName, 'Running', 705, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 735, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 100, $this->categoryRunning);

        # PLACE 3
        $this->addTrainingToUser("Philipp", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 200, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 60, $this->categoryRunning);

        # PLACE 4
        $this->addTrainingToUser("Ronny", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 100, $this->categoryRunning);

        # PLACE 5
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 100, $this->categoryRunning);

        # PLACE 6
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);

        # PLACE 7
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 250, $this->categoryRunning);

        # PLACE 8
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);

        # PLACE 9
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 150, $this->categoryRunning);

        # PLACE 10
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);

        # PLACE 11
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 100, $this->categoryRunning);

        # PLACE 12
        $this->addTrainingToUser("Andre", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 120, $this->categoryRunning);

        # PLACE 13
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);

        # PLACE 14
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 30, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 40, $this->categoryRunning);
    }

    private function createLeaderBoardWhereUserIsPlaceTen(String $userName)
    {
        # PLACE 1
        $this->addTrainingToUser("Ilja", 'Running', 1600, $this->categoryRunning);

        # PLACE 2
        $this->addTrainingToUser("Andre", 'Running', 725, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 725, $this->categoryRunning);

        # PLACE 3
        $this->addTrainingToUser("Philipp", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 200, $this->categoryRunning);

        # PLACE 4
        $this->addTrainingToUser("Ronny", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 150, $this->categoryRunning);

        # PLACE 5
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 100, $this->categoryRunning);

        # PLACE 6
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);

        # PLACE 7
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 250, $this->categoryRunning);

        # PLACE 8
        $this->addTrainingToUser("Daniel", 'Running', 110, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);

        # PLACE 9
        $this->addTrainingToUser("Ron", 'Running', 110, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 150, $this->categoryRunning);

        # PLACE 10
        $this->addTrainingToUser($userName, 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 100, $this->categoryRunning);

        # PLACE 11
        $this->addTrainingToUser("Felix", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);

        # PLACE 12
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 130, $this->categoryRunning);

        # PLACE 13
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);

        # PLACE 14
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 30, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 40, $this->categoryRunning);
    }

    private function createLeaderBoardWhereUserIsPlaceEleven(String $userName)
    {
        # PLACE 1
        $this->addTrainingToUser("Ilja", 'Running', 1600, $this->categoryRunning);

        # PLACE 2
        $this->addTrainingToUser("Andre", 'Running', 725, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 725, $this->categoryRunning);

        # PLACE 3
        $this->addTrainingToUser("Philipp", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 200, $this->categoryRunning);

        # PLACE 4
        $this->addTrainingToUser("Ronny", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 150, $this->categoryRunning);

        # PLACE 5
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 100, $this->categoryRunning);

        # PLACE 6
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);

        # PLACE 7
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 250, $this->categoryRunning);

        # PLACE 8
        $this->addTrainingToUser("Daniel", 'Running', 110, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);

        # PLACE 9
        $this->addTrainingToUser("Ron", 'Running', 110, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 150, $this->categoryRunning);

        # PLACE 10
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);

        # PLACE 11
        $this->addTrainingToUser($userName, 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 100, $this->categoryRunning);

        # PLACE 12
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 130, $this->categoryRunning);

        # PLACE 13
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);

        # PLACE 14
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 30, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 40, $this->categoryRunning);
    }

    private function createLeaderBoardWhereUserIsPlaceTwelfth(String $userName)
    {
        # PLACE 1
        $this->addTrainingToUser("Ilja", 'Running', 1600, $this->categoryRunning);

        # PLACE 2
        $this->addTrainingToUser("Andre", 'Running', 725, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 725, $this->categoryRunning);

        # PLACE 3
        $this->addTrainingToUser("Philipp", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 200, $this->categoryRunning);

        # PLACE 4
        $this->addTrainingToUser("Ronny", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 150, $this->categoryRunning);

        # PLACE 5
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 100, $this->categoryRunning);

        # PLACE 6
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);

        # PLACE 7
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 250, $this->categoryRunning);

        # PLACE 8
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);

        # PLACE 9
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 150, $this->categoryRunning);

        # PLACE 10
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);

        # PLACE 11
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 100, $this->categoryRunning);

        # PLACE 12
        $this->addTrainingToUser($userName, 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 60, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 130, $this->categoryRunning);

        # PLACE 13
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);

        # PLACE 14
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 30, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 40, $this->categoryRunning);
    }

    private function createLeaderBoardWhereUserIsLastPlace(String $userName)
    {
        # PLACE 1
        $this->addTrainingToUser("Ilja", 'Running', 1600, $this->categoryRunning);

        # PLACE 2
        $this->addTrainingToUser("Andre", 'Running', 725, $this->categoryRunning);
        $this->addTrainingToUser("Andre", 'Running', 725, $this->categoryRunning);

        # PLACE 3
        $this->addTrainingToUser("Philipp", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Philipp", 'Running', 200, $this->categoryRunning);

        # PLACE 4
        $this->addTrainingToUser("Ronny", 'Running', 700, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Ronny", 'Running', 150, $this->categoryRunning);

        # PLACE 5
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 500, $this->categoryRunning);
        $this->addTrainingToUser("Steffi", 'Running', 100, $this->categoryRunning);

        # PLACE 6
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Norma", 'Running', 300, $this->categoryRunning);

        # PLACE 7
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 300, $this->categoryRunning);
        $this->addTrainingToUser("Dan", 'Running', 250, $this->categoryRunning);

        # PLACE 8
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);
        $this->addTrainingToUser("Daniel", 'Running', 200, $this->categoryRunning);

        # PLACE 9
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Ron", 'Running', 150, $this->categoryRunning);

        # PLACE 10
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Felix", 'Running', 100, $this->categoryRunning);

        # PLACE 11
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 100, $this->categoryRunning);
        $this->addTrainingToUser("Jakob", 'Running', 100, $this->categoryRunning);

        # PLACE 12
        $this->addTrainingToUser("Christian", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 60, $this->categoryRunning);
        $this->addTrainingToUser("Christian", 'Running', 138, $this->categoryRunning);

        # PLACE 13
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);
        $this->addTrainingToUser("Mirko", 'Running', 50, $this->categoryRunning);

        # PLACE 14
        $this->addTrainingToUser($userName, 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 20, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 30, $this->categoryRunning);
        $this->addTrainingToUser($userName, 'Running', 30, $this->categoryRunning);
    }

    ############# END UTILS #############
}