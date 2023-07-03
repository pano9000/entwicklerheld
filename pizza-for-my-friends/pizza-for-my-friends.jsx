import React from 'react';

// Start to implement a stateless react component.
// Stateless components in react are simple functions, which return html

export const PizzaList = ({pizzaOffers, friends, onClickCallback}) => {
    return (
        <ul>
            {pizzaOffers.map(pizzaOffer => <li key={pizzaOffer.id} onClick={() => onClickCallback(pizzaOffer, friends) }>{pizzaOffer.name}</li>)}
        </ul>
    )
};

export const printPizzaFans = (friends, pizzaOffers) => {

    return friends.map( friend => {

        const preferenceMatches = pizzaOffers.reduce((accum, pizza) => {

            let matchCount = 0;

            for (const topping of pizza.toppings) {
                if (friend.noGos.includes(topping)) {
                    return accum;
                }
                if (friend.preferences.includes(topping)) {
                    matchCount++;
                }
            }

            // update highestMatchCount
            if (matchCount > accum.highestMatchCount) { accum.highestMatchCount = matchCount };
            accum.matches.push([pizza.id, matchCount]);
            return accum;
        }, { matches: [], highestMatchCount: -1 } );

        const [matches, highestMatchCount] = preferenceMatches;
        //ugly
        const favouritePizzas = matches.filter(match => match[1] == highestMatchCount)
                                 .map(fav => pizzaOffers.find(pizza => pizza.id == fav[0]).name)
                                 .sort()
                                 .join(", ");

        return {"favouritePizza": favouritePizzas, "name": friend.name};
    })

}


export const printFriendsForAPizza = (pizza, friends) => {

    console.log("pizza: \n", pizza, "\nfriends:\n", friends);

    const result = friends.reduce( (result, friend) => {

        let matchCount = 0;

        for (const topping of pizza.toppings) {
            if (friend.noGos.includes(topping)) {
                return result;
            }
            if (friend.preferences.includes(topping)) {
                matchCount++;
            }
        }

        if (matchCount > result.highestMatchCount) { result.highestMatchCount = matchCount };

        result.matches.push([friend.name, matchCount])      
        return result;

    }, { matches: [], highestMatchCount: -1 })


    const b = result.matches.filter(match => match[1] == result.highestMatchCount)
                            .map(match => match[0])
                            .sort()
                            .join(", ")

    console.log(result.highestMatchCount, b)

    console.log("result\n", result)

    return b

    
}