from django.test import TestCase
import json

from selfies import models


class Stage1(TestCase):
    def tearDown(self):
        print("##polylith[testFinished")

    def setUp(self):
        self.maxDiff = None
        models.Selfie.objects.bulk_create([
            models.Selfie(
                title="The Little Mermaid",
                description="Me in front of the sculpture of The Little Mermaid",
                image="https://example.com/little-mermaid.jpg"
            ),
            models.Selfie(
                title="Kronborg Castle",
                description="Me in front of the most famous Danish castle",
                image="https://example.com/kronborg-castle.jpg"
            ),
            models.Selfie(
                title="Tivoli Gardens",
                description="Me in the great amusement park",
                image="https://example.com/tivoli-gardens.jpg"
            )
        ])
        print("##polylith[testStarted")

    def test_that_get_selfies_view_returns_a_JsonResponse(self):
        response = self.client.get('/selfies/copenhagen/')
        self.assertEqual(response.__class__.__name__, 'JsonResponse')
        self.assertEqual(response.status_code, 200)

    def test_that_get_selfies_view_returns_all_selfies_as_JSON(self):
        response = self.client.get('/selfies/copenhagen/')
        self.assertJSONEqual(
            response.content.decode("utf-8"), [
                {"id": 1, "title": "The Little Mermaid",
                 "description": "Me in front of the sculpture of The Little Mermaid",
                 "image": "https://example.com/little-mermaid.jpg"},
                {"id": 2, "title": "Kronborg Castle", "description": "Me in front of the most famous Danish castle",
                 "image": "https://example.com/kronborg-castle.jpg"},
                {"id": 3, "title": "Tivoli Gardens", "description": "Me in the great amusement park",
                 "image": "https://example.com/tivoli-gardens.jpg"}
            ]
        )

    def test_that_get_selfies_view_still_works_after_new_added_selfies(self):
        models.Selfie.objects.bulk_create([
            models.Selfie(
                title="Nyhavn",
                description="Me in Nyhavn",
                image="https://example.com/nyhavn.jpg"
            ),
            models.Selfie(
                title="Amalienborg Palace",
                description="Me in front of the Amalienborg Palace",
                image="https://example.com/amalienborg-palace.jpg"
            ),
            models.Selfie(
                title="Bakken",
                description="Me in Bakken",
                image="https://example.com/bakken.jpg"
            ),
            models.Selfie(
                title="The Round Tower",
                description="Me on the Round Tower",
                image="https://example.com/round-tower.jpg"
            )
        ])
        response = self.client.get('/selfies/copenhagen/')
        self.assertJSONEqual(
            response.content.decode("utf-8"), [
                {"id": 1, "title": "The Little Mermaid",
                 "description": "Me in front of the sculpture of The Little Mermaid",
                 "image": "https://example.com/little-mermaid.jpg"},
                {"id": 2, "title": "Kronborg Castle", "description": "Me in front of the most famous Danish castle",
                 "image": "https://example.com/kronborg-castle.jpg"},
                {"id": 3, "title": "Tivoli Gardens", "description": "Me in the great amusement park",
                 "image": "https://example.com/tivoli-gardens.jpg"},
                {"id": 4, "title": "Nyhavn", "description": "Me in Nyhavn", "image": "https://example.com/nyhavn.jpg"},
                {"id": 5, "title": "Amalienborg Palace", "description": "Me in front of the Amalienborg Palace",
                 "image": "https://example.com/amalienborg-palace.jpg"},
                {"id": 6, "title": "Bakken", "description": "Me in Bakken", "image": "https://example.com/bakken.jpg"},
                {"id": 7, "title": "The Round Tower", "description": "Me on the Round Tower",
                 "image": "https://example.com/round-tower.jpg"}
            ]
        )


class Stage2(TestCase):

    def test_that_rate_selfie_view_returns_a_JsonResponse(self):
        models.Selfie.objects.create(
            title="The Little Mermaid",
            description="Me in front of the sculpture of The Little Mermaid",
            image="https://example.com/little-mermaid.jpg"
        )
        response = self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 1, "rating": 4}),
                                    content_type="application/json")
        self.assertEqual(response.__class__.__name__, 'JsonResponse')
        self.assertEqual(response.status_code, 200)

    def test_that_rate_selfie_view_allows_only_post_requests(self):
        models.Selfie.objects.create(
            title="The Little Mermaid",
            description="Me in front of the sculpture of The Little Mermaid",
            image="https://example.com/little-mermaid.jpg"
        )
        response = self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 1, "rating": 4}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/selfies/copenhagen/rate-selfie/')
        self.assertEqual(response.status_code, 405)
        response = self.client.put('/selfies/copenhagen/rate-selfie/')
        self.assertEqual(response.status_code, 405)
        response = self.client.patch('/selfies/copenhagen/rate-selfie/')
        self.assertEqual(response.status_code, 405)
        response = self.client.delete('/selfies/copenhagen/rate-selfie/')
        self.assertEqual(response.status_code, 405)

    def test_that_a_vote_object_is_created_after_a_post_request(self):
        models.Selfie.objects.create(
            title="The Little Mermaid",
            description="Me in front of the sculpture of The Little Mermaid",
            image="https://example.com/little-mermaid.jpg"
        )

        self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 1, "rating": 4}),
                         content_type="application/json")
        amount_of_votes = models.Vote.objects.filter(selfie__id=1).count()
        self.assertEqual(1, amount_of_votes, "The vote was not saved to database yet.")
        self.assertEqual(models.Selfie.objects.get(id=1).vote_set.first().rating, 4)

    def test_that_rate_selfie_view_returns_correct_average_lowest_highest_rating(self):
        selfie = models.Selfie.objects.create(
            title="The Little Mermaid",
            description="Me in front of the sculpture of The Little Mermaid",
            image="https://example.com/little-mermaid.jpg"
        )

        response = self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 1, "rating": 3}),
                                    content_type="application/json")
        response_data = json.loads(response.content.decode("utf-8"))
        response_data.pop('best_selfies', None)
        self.assertIsNotNone(response_data.get('id'), "'id' property is not in json response")
        self.assertIsNotNone(response_data.get('highest_rating'), "'highest_rating' property is not in json response")
        self.assertIsNotNone(response_data.get('lowest_rating'), "'lowest_rating' property is not in json response")
        self.assertIsNotNone(response_data.get('average_rating'), "'average_rating' property is not in json response")
        self.assertDictEqual(
            response_data,
            {
                'id': selfie.id,
                'highest_rating': 3.0,
                'lowest_rating': 3.0,
                'average_rating': 3.0,
            }
        )

        response = self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 1, "rating": 5}),
                                    content_type="application/json")
        response_data = json.loads(response.content.decode("utf-8"))
        response_data.pop('best_selfies', None)
        self.assertIsNotNone(response_data.get('id'), "'id' property is not in json response")
        self.assertIsNotNone(response_data.get('highest_rating'), "'highest_rating' property is not in json response")
        self.assertIsNotNone(response_data.get('lowest_rating'), "'lowest_rating' property is not in json response")
        self.assertIsNotNone(response_data.get('average_rating'), "'average_rating' property is not in json response")
        self.assertDictEqual(
            response_data,
            {
                'id': selfie.id,
                'highest_rating': 5.0,
                'lowest_rating': 3.0,
                'average_rating': 4.0,
            }
        )

        response = self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 1, "rating": 2}),
                                    content_type="application/json")
        response_data = json.loads(response.content.decode("utf-8"))
        response_data.pop('best_selfies', None)
        self.assertIsNotNone(response_data.get('id'), "'id' property is not in json response")
        self.assertIsNotNone(response_data.get('highest_rating'), "'highest_rating' property is not in json response")
        self.assertIsNotNone(response_data.get('lowest_rating'), "'lowest_rating' property is not in json response")
        self.assertIsNotNone(response_data.get('average_rating'), "'average_rating' property is not in json response")
        self.assertDictEqual(
            response_data,
            {
                'id': selfie.id,
                'highest_rating': 5.0,
                'lowest_rating': 2.0,
                'average_rating': 3.3,
            }
        )

        response = self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 1, "rating": 4}),
                                    content_type="application/json")
        response_data = json.loads(response.content.decode("utf-8"))
        response_data.pop('best_selfies', None)
        self.assertIsNotNone(response_data.get('id'), "'id' property is not in json response")
        self.assertIsNotNone(response_data.get('highest_rating'), "'highest_rating' property is not in json response")
        self.assertIsNotNone(response_data.get('lowest_rating'), "'lowest_rating' property is not in json response")
        self.assertIsNotNone(response_data.get('average_rating'), "'average_rating' property is not in json response")
        self.assertDictEqual(
            response_data,
            {
                'id': selfie.id,
                'highest_rating': 5.0,
                'lowest_rating': 2.0,
                'average_rating': 3.5,
            }
        )

    def test_that_rate_selfie_view_returns_correct_image_urls(self):
        models.Selfie.objects.bulk_create([
            models.Selfie(
                id=1,
                title="The Little Mermaid",
                description="Me in front of the sculpture of The Little Mermaid",
                image="https://example.com/little-mermaid.jpg"
            ),
            models.Selfie(
                id=2,
                title="Kronborg Castle",
                description="Me in front of the most famous Danish castle",
                image="https://example.com/kronberg-castle.jpg"
            ),
            models.Selfie(
                id=3,
                title="Tivoli Gardens",
                description="Me in the great amusement park",
                image="https://example.com/tivoli-gardens.jpg"
            ),
            models.Selfie(
                id=4,
                title="Nyhavn",
                description="Me in Nyhavn",
                image="https://example.com/nyhavn.jpg"
            ),
            models.Selfie(
                id=5,
                title="Copenhagen Zoo",
                description="Me in Copenhagen Zoo",
                image="https://example.com/copenhagen-zoo.jpg"
            ),
            models.Selfie(
                id=6,
                title="Frilandsmuseet",
                description="Me in Frilandsmuseet",
                image="https://example.com/frilandsmuseet.jpg"
            ),
            models.Selfie(
                id=7,
                title="Glyptoteket",
                description="Me in Glyptoteket",
                image="https://example.com/glyptoteket.jpg"
            )
        ])
        models.Vote.objects.bulk_create([
            models.Vote(
                selfie_id=1,
                rating=3
            ),
            models.Vote(
                selfie_id=1,
                rating=3
            ),
            models.Vote(
                selfie_id=1,
                rating=3
            ),
            models.Vote(
                selfie_id=2,
                rating=5
            ),
            models.Vote(
                selfie_id=2,
                rating=2
            ),
            models.Vote(
                selfie_id=2,
                rating=5
            ),
            models.Vote(
                selfie_id=3,
                rating=5
            ),
            models.Vote(
                selfie_id=3,
                rating=4
            ),
            models.Vote(
                selfie_id=3,
                rating=3
            ),
            models.Vote(
                selfie_id=4,
                rating=5
            ),
            models.Vote(
                selfie_id=4,
                rating=4
            ),
            models.Vote(
                selfie_id=5,
                rating=3
            ),
            models.Vote(
                selfie_id=5,
                rating=2
            ),
            models.Vote(
                selfie_id=5,
                rating=4
            ),
            models.Vote(
                selfie_id=5,
                rating=5
            ),
            models.Vote(
                selfie_id=6,
                rating=5
            ),
            models.Vote(
                selfie_id=6,
                rating=5
            ),
            models.Vote(
                selfie_id=6,
                rating=4
            ),
            models.Vote(
                selfie_id=6,
                rating=5
            ),
            models.Vote(
                selfie_id=7,
                rating=4
            ),
        ])

        response = self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 4, "rating": 4}),
                                    content_type="application/json")

        best_selfies = json.loads(response.content).get('best_selfies')
        self.assertIsNotNone(best_selfies, "'best_selfies' property is not in json response")

        self.assertCountEqual(
            best_selfies,
            [
                {'image': 'https://example.com/frilandsmuseet.jpg'},
                {'image': 'https://example.com/nyhavn.jpg'},
                {'image': 'https://example.com/tivoli-gardens.jpg'},
                {'image': 'https://example.com/glyptoteket.jpg'},
            ]
        )

        self.assertEqual(
            best_selfies,
            [
                {'image': 'https://example.com/frilandsmuseet.jpg'},
                {'image': 'https://example.com/nyhavn.jpg'},
                {'image': 'https://example.com/tivoli-gardens.jpg'},
                {'image': 'https://example.com/glyptoteket.jpg'},
            ],
            'The order of appearance in the returned list is not right'
        )

        models.Vote.objects.create(
            selfie_id=3,
            rating=2
        ),

        response = self.client.post('/selfies/copenhagen/rate-selfie/', json.dumps({"id": 4, "rating": 4}),
                                    content_type="application/json")

        best_selfies = json.loads(response.content).get('best_selfies')
        self.assertIsNotNone(best_selfies, "'best_selfies' property is not in json response")

        self.assertEqual(
            best_selfies,
            [
                {'image': 'https://example.com/frilandsmuseet.jpg'},
                {'image': 'https://example.com/nyhavn.jpg'},
                {'image': 'https://example.com/glyptoteket.jpg'},
            ]
        )

    def setUp(self):
        self.maxDiff = None
        print("##polylith[testStarted")

    def tearDown(self):
        print("##polylith[testFinished")