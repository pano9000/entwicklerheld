import json
from django.http import HttpRequest, JsonResponse, HttpResponseServerError, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound
from django.core.exceptions import ValidationError
from django.db.models import Avg, FloatField, Max, Min

from selfies.models import Selfie, Vote


def get_selfies(request: HttpRequest) -> JsonResponse:
    data = Selfie.objects.values()
    response = JsonResponse(list(data), safe=False)

    return response
    


def rate_selfie(request: HttpRequest) -> JsonResponse:
    if not request.method == "POST":
        return HttpResponseNotAllowed(["POST"])

    try:
        req_data = json.loads(request.body)

        selfie_id = req_data.get("id")
        rating = req_data.get("rating")

        if selfie_id is None or rating is None:
            raise ValidationError("Missing id or rating value in request")


        # Add new vote to DB
        selfie = Selfie.objects.get(id=selfie_id)
        vote_add = Vote.objects.create(selfie=selfie, rating=rating)

        # Get Statistics data from DB
        ratings_stats = Vote.objects.filter(selfie=selfie).aggregate(
            id=Min("id"),
            highest_rating=Max("rating", default=0, output_field=FloatField()),
            lowest_rating=Min("rating", default=0, output_field=FloatField()),
            average_rating=Avg("rating", default=0, output_field=FloatField())
        )

        # for some reason the Django Round function inside the query is rounding down to the nearest integer, and ignores precision value
        # therefore rounding down manually here
        ratings_stats["average_rating"] = round(ratings_stats["average_rating"], 1)


        # Get Best Selfies From DB
        # ORM seems to suck when it comes to this task (or I am too stupid to make it work), so commenting out my attempt at using it, 
        # and reverting to simple and working raw SQL below instead

        #best_selfies_qs = Vote.objects.select_related("selfie").annotate(
        #        highest_rating=Max("rating", default=0, output_field=FloatField()),
        #        lowest_rating=Min("rating", default=0, output_field=FloatField()),
        #        average_rating=Avg("rating", default=0, output_field=FloatField()),
        #        image=F("selfie__image")
        #    ).filter(
        #        lowest_rating__gte=3.0,
        #        average_rating__gte=4.0
        #    ).values(
        #        "image", "average_rating"
        #    ).distinct()

        best_selfies_rqs = Vote.objects.raw(f"""
            SELECT 
                MIN(votes.id) AS id,
                MIN(votes.rating) AS lowest_rating,
                AVG(votes.rating) AS average_rating,
                MIN(selfies.image) AS image
            FROM 
                {Vote._meta.db_table} AS votes
                JOIN {Selfie._meta.db_table} AS selfies ON votes.selfie_id = selfies.id
            GROUP BY
                votes.selfie_id
            HAVING
                lowest_rating >= 3.0
                AND average_rating >= 4.0
            ORDER BY
                average_rating DESC,
                id ASC
        """)
    
        # just reuse the same dict, mutation isn't an issue here, as it is not used anywhere else
        response_data = ratings_stats
        response_data["best_selfies"] = []

        for entry in best_selfies_rqs:
            response_data["best_selfies"].append({"image": entry.image})

        return JsonResponse(response_data, safe=False)



    except json.JSONDecodeError as err:
        print(err)
        return HttpResponseBadRequest("Body must be valid JSON")
    
    except ValidationError as err:
        print(err)
        return HttpResponseBadRequest(err)

    except Selfie.DoesNotExist as err:
        print("selfie not found in DB", err)
        return HttpResponseNotFound("Provided Selfie ID not found")

    except Exception as err:
        print("Other Exception", err)
        return HttpResponseServerError()
