using System;

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
            int score = 0;
            foreach (Allergen allergen in allergens) {
                score += allergen.GetHashCode();
            }

            return new Allergies(score);
        }

        public Allergies(int score) => this.score = score;

        public bool IsAllergicTo(Allergen allergen)
        {
            return Convert.ToBoolean(this.score & allergen.GetHashCode());
        }

        public Allergen[] List()
        {

            var allergenList = new System.Collections.Generic.List<Allergen>();
            foreach (Allergen allergen in Enum.GetValues(typeof(Allergen))) {
                if (this.IsAllergicTo(allergen)) {
                    allergenList.Add(allergen);
                }
            }  

            return allergenList.ToArray();

        }
    }
}