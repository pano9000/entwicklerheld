def calculate_space_age(seconds, planet):
    if not isinstance(planet, str):
        raise Exception(f"Expected 'planet' to be a string, but got '{type(planet)}'")

    if not isinstance(seconds, int):
        raise Exception(f"Expected 'seconds' to be an integer, but got '{type(seconds)}'")
    
    normalized_planet = planet.lower().strip()

    if not normalized_planet in planets:
        raise Exception(f"'{normalized_planet}' is not a valid planet")

    return round(seconds / planets[normalized_planet], 2)


EARTH_YEAR_IN_SECONDS = 31557600

# orbital periods of planets compared to Earth, in seconds
planets = {
    "earth": 1 * EARTH_YEAR_IN_SECONDS,
    "mars": 1.8808158 * EARTH_YEAR_IN_SECONDS,
    "mercury": 0.2408467 * EARTH_YEAR_IN_SECONDS,
    "venus": 0.61519726 * EARTH_YEAR_IN_SECONDS,
    "mars": 1.8808158 * EARTH_YEAR_IN_SECONDS,
    "jupiter": 11.862615 * EARTH_YEAR_IN_SECONDS,
    "saturn": 29.447498 * EARTH_YEAR_IN_SECONDS,
    "uranus": 84.016846 * EARTH_YEAR_IN_SECONDS,
    "neptune": 164.79132 * EARTH_YEAR_IN_SECONDS
}
