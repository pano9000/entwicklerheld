<?php

namespace Tests\Feature;

use App\Category;
use App\Training;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Utils\TestUtils;

class TrainingApiTest extends TestCase
{
    use RefreshDatabase;
    private $categoryRunning;
    private $categorySwimming;
    private $categoryCycling;
    private $user_1;
    private $user_2;
    private $user_3;
    private $user_4;
    private $user_5;
    private $user_6;
    private $user_7;
    private $user_8;
    private $user_9;
    private $user_10;
    private $user_11;
    private $user_12;
    private $user_13;
    private $user_14;

    public function setUp(): void
    {
        print("\n##polylith[testStarted\n");
        parent::setUp();
        $this->categoryRunning = factory(Category::class)->create([
            "name" => "Running"
        ]);
        $this->categorySwimming = factory(Category::class)->create([
            "name" => "Swimming"
        ]);
        $this->categoryCycling = factory(Category::class)->create([
            "name" => "Cycling"
        ]);

        $this->user_1 = factory(User::class)->create(['name' => 'user_1']);
        $this->user_2 = factory(User::class)->create(['name' => 'user_2']);
        $this->user_3 = factory(User::class)->create(['name' => 'user_3']);
        $this->user_4 = factory(User::class)->create(['name' => 'user_4']);
        $this->user_5 = factory(User::class)->create(['name' => 'user_5']);
        $this->user_6 = factory(User::class)->create(['name' => 'user_6']);
        $this->user_7 = factory(User::class)->create(['name' => 'user_7']);
        $this->user_8 = factory(User::class)->create(['name' => 'user_8']);
        $this->user_9 = factory(User::class)->create(['name' => 'user_9']);
        $this->user_10 = factory(User::class)->create(['name' => 'user_10']);
        $this->user_11 = factory(User::class)->create(['name' => 'user_11']);
        $this->user_12 = factory(User::class)->create(['name' => 'user_12']);
        $this->user_13 = factory(User::class)->create(['name' => 'user_13']);
        $this->user_14 = factory(User::class)->create(['name' => 'user_14']);
    }

    protected function tearDown(): void
    {
        print("\n##polylith[testFinished\n");
    }
    public function testAddTraining422BecauseOfMissingDistance()
    {
        #$this->withoutExceptionHandling();#->expectException('Illuminate\Validation\ValidationException');
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);

        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # When
        $payload = ['name' => 'endurance run', 'category' => 'Running'];
        $response = $this->actingAs($user, 'api')->json('POST', 'api/training', $payload);

        # THEN
        $trainings = Training::all();
        $response->assertStatus(422);

        $actualTraining = Training::all()->first();
        $this->assertEquals(null, $actualTraining, "You added an an training although the Post data was wrong");
    }
    public function testAddTraining422BecauseOfMissingDataHidden()
    {
        #$this->withoutExceptionHandling();#->expectException('Illuminate\Validation\ValidationException');
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);

        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # When
        $payload = ['name' => 'endurance run', 'category' => 'Running'];
        $response = $this->actingAs($user, 'api')->json('POST', 'api/training', $payload);

        # THEN
        $trainings = Training::all();
        $response->assertStatus(422);

        $actualTraining = Training::all()->first();
        $this->assertEquals(null, $actualTraining, "You added an an training although the Post data was wrong");
    }
    public function testAddTraining422BecauseOfMissingName()
    {
        #$this->withoutExceptionHandling();#->expectException('Illuminate\Validation\ValidationException');
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);

        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # When
        $payload = ['title' => 'endurance run', 'category' => 'Running', 'distance' => 10.2];
        $response = $this->actingAs($user, 'api')->json('POST', 'api/training', $payload);

        # THEN
        $trainings = Training::all();
        $response->assertStatus(422);

        $actualTraining = Training::all()->first();
        $this->assertEquals(null, $actualTraining, "You added an training although the Post data was wrong (title instead of name).");
    }
    public function testAddTraining422BecauseOfWrongCategory()
    {
        $this->withoutExceptionHandling();
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);

        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # When
        $payload = ['name' => 'endurance run', 'category' => 'Fencing', 'distance' => 10.2];
        $response = $this->actingAs($user, 'api')->json('POST', 'api/training', $payload);

        # THEN
        $trainings = Training::all();
        $response->assertStatus(422);
        $this->assertEquals($response->json(), ['error' => ['message' => 'category not exists']]);

        $actualTraining = Training::all()->first();
        $this->assertEquals(null, $actualTraining);
    }
    public function testAddTraining200()
    {
        $this->withoutExceptionHandling();
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);

        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # WHEN
        $payload = ['name' => 'endurance run', 'category' => 'Running', 'distance' => 10.2];
        $response = $this->actingAs($user, 'api')->json('POST', 'api/training', $payload);

        # THEN
        $trainings = Training::all();
        $response->assertStatus(201);

        $actualTraining = Training::all()->first();
        $this->assertEquals("endurance run", $actualTraining->name);
        $this->assertEquals($user->id, $actualTraining->user->id);
        $this->assertEquals(10.2, $actualTraining->distance);
        $this->assertEquals($this->categoryRunning->name, $actualTraining->category->name);
    }
    public function testAddTraining200Hidden()
    {
        $this->withoutExceptionHandling();
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);

        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # WHEN
        $payload = ['name' => 'short run', 'category' => 'Running', 'distance' => 5.2];
        $response = $this->actingAs($user, 'api')->json('POST', 'api/training', $payload);

        # THEN
        $trainings = Training::all();
        $response->assertStatus(201);

        $actualTraining = Training::all()->first();
        $this->assertEquals("short run", $actualTraining->name);
        $this->assertEquals($user->id, $actualTraining->user->id);
        $this->assertEquals(5.2, $actualTraining->distance);
        $this->assertEquals($this->categoryRunning->name, $actualTraining->category->name);
    }
    public function testGetTrainings200()
    {
        $this->withoutExceptionHandling();
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);


        TestUtils::createTraining('endurance run', 20, $this->categoryRunning, $user);
        TestUtils::createTraining('normal run', 11, $this->categoryRunning, $user);
        TestUtils::createTraining('normal run', 11, $this->categoryRunning, $user);
        TestUtils::createTraining('endurance run', 40, $this->categoryRunning, $user);
        TestUtils::createTraining('endurance run', 40, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 5, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);

        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('cycling', 5, $this->categoryCycling, $user);

        TestUtils::createTraining('normal run', 5, $this->categorySwimming, $this->user_1);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $this->user_1);

        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # WHEN
        $response = $this->actingAs($user, 'api')->get('api/training');

        # THEN
        $response->assertStatus(200);
        $trainings = Training::all()->where('user_id', $user->id)->where('category.name', 'Running')->toArray();
        $this->assertEquals($trainings, $response->json());
    }
    public function testGetTrainings200Hidden()
    {
        $this->withoutExceptionHandling();
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);


        TestUtils::createTraining('endurance run', 20, $this->categoryRunning, $user);
        TestUtils::createTraining('normal run', 11, $this->categoryRunning, $user);
        TestUtils::createTraining('normal run', 11, $this->categoryRunning, $user);
        TestUtils::createTraining('endurance run', 40, $this->categoryRunning, $user);
        TestUtils::createTraining('endurance run', 40, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 5, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('long run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('long run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);

        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('cycling', 5, $this->categoryCycling, $user);
        TestUtils::createTraining('cycling', 5, $this->categoryCycling, $this->user_1);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $this->user_1);
        TestUtils::createTraining('normal run', 5, $this->categoryRunning, $this->user_1);
        TestUtils::createTraining('normal run', 5, $this->categoryRunning, $this->user_1);
        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # WHEN
        $response = $this->actingAs($user, 'api')->get('api/training');

        # THEN
        $response->assertStatus(200);

        $trainings = Training::all()->where('user_id', $user->id)->where('category.name', 'Running')->toArray();
        $this->assertEquals($trainings, $response->json());
    }
    public function testGetTrainings200Hidden2()
    {
        $this->withoutExceptionHandling();
        # GIVEN
        $password = 'i-love-entwicklerheld';
        $user = factory(User::class)->create([
            'password' => bcrypt($password),
        ]);


        TestUtils::createTraining('endurance run', 20, $this->categoryRunning, $user);
        TestUtils::createTraining('normal run', 11, $this->categoryRunning, $user);
        TestUtils::createTraining('normal run', 11, $this->categoryRunning, $user);
        TestUtils::createTraining('endurance run', 40, $this->categoryRunning, $user);
        TestUtils::createTraining('endurance run', 40, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 5, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('long run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('long run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 5, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('long run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('long run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);
        TestUtils::createTraining('short run', 2, $this->categoryRunning, $user);

        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $user);
        TestUtils::createTraining('cycling', 5, $this->categoryCycling, $user);
        TestUtils::createTraining('normal run', 5, $this->categoryRunning, $this->user_1);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $this->user_1);
        TestUtils::createTraining('swim', 5, $this->categorySwimming, $this->user_1);

        $result = $this->json('POST', '/login', [
            'email' => $user->email,
            'password' => $password,
        ]);
        $this->assertAuthenticatedAs($user);
        # WHEN
        $response = $this->actingAs($user, 'api')->get('api/training');

        # THEN
        $response->assertStatus(200);
        $trainings = Training::all()->where('user_id', $user->id)->where('category.name', 'Running')->toArray();
        $this->assertEquals($trainings, $response->json());
    }
}
