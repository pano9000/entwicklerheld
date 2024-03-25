from django.http import HttpRequest, JsonResponse
from selfies.models import Selfie, Vote

def get_selfies(request: HttpRequest) -> JsonResponse:
    pass


def rate_selfie(request: HttpRequest) -> JsonResponse:
    pass
