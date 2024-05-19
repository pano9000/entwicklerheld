using System;

namespace AllergiesCsharpImplementation
{
    public enum Allergen
    {
        Eggs         = 1 << 0,
        Peanuts      = 1 << 1,
        Shellfish    = 1 << 2,
        Strawberries = 1 << 3,
        Tomatoes     = 1 << 4,
        Chocolate    = 1 << 5,
        Pollen       = 1 << 6,
        Cats         = 1 << 7
    }

    public class Allergies
    {
        public readonly int score;

        public static Allergies CreateAllergy(Allergen[] allergens)
        {
            // scenario 3
            throw new NotImplementedException("You need to implement this function.");
        }

        public Allergies(int score) => this.score = score;

        public bool IsAllergicTo(Allergen allergen)
        {
            // scenario 1
            throw new NotImplementedException("You need to implement this function.");
        }

        public Allergen[] List()
        {
            // scenario 2
            throw new NotImplementedException("You need to implement this function.");
        }
    }
}