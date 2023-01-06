import {RECIPE} from "./Recipe";

// Scenario 1
export function howLongDoesItTake(){
    var arrayOfTimers = RECIPE.times.cake.concat(RECIPE.times.buttercream);
    var totalTime = arrayOfTimers.reduce( (accumulator, currentValue, currentIndex) => {
        accumulator += parseInt(currentValue);
        return parseInt(accumulator)
    });
    
    return totalTime;
}


// Scenario 2
export function getQuantityOfIngredient(ingredient, numberOfCakes){
    var quantityOfIngredient = 0;
    var unit = "";
    for (var ingredientOfCake of RECIPE.ingredients.cake){
        if(ingredientOfCake.name === ingredient){
            quantityOfIngredient = ingredientOfCake.quantity * numberOfCakes;
            unit = " " + ingredientOfCake.unit;
            if(ingredient === "eggs"){
                quantityOfIngredient = (ingredientOfCake.quantity * 1 + 1) * numberOfCakes;
                break;
            }
        }
    }
    return quantityOfIngredient.toString() + unit;
}

// Scenario 3
export function getPurchaseList(){

    var calculator_funcs = [];
    var ingredients = RECIPE.ingredients.buttercream.concat(RECIPE.ingredients.cake);
    const ingredientsButtercream = RECIPE.ingredients.buttercream;
    const ingredientsCake = RECIPE.ingredients.cake;
    const resultNew = {};
    ingredients.forEach(ingredient => {
        if (resultNew.hasOwnProperty([ingredient.name])) {
            resultNew[ingredient.name] += Number(ingredient.quantity)
        } else {
            resultNew[ingredient.name] = Number(ingredient.quantity);
        }
    })

    return resultNew;
}

// Scenario 4
export function calculateDifficulty(){
    var arrayOfTimers = RECIPE.times.cake.concat(RECIPE.times.buttercream);
    var difficulties = [];
    for(var timer of arrayOfTimers){
        if(timer == 0){
            difficulties.push("super easy");
            continue;
        }
        if(timer <= 10){
            difficulties.push("easy");
            continue;
        }
        if(10 < timer && timer < 20){
            difficulties.push("medium");
            continue;
        }
        if(20 < timer && timer <= 30) {
            difficulties.push("difficult");
            continue;
        }
        difficulties.push("hard");
    }
    return difficulties;
}