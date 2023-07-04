import React from 'react';

export const PizzaList = ({pizzaOffers, friends, onClickCallback}) => {
    return (
        <ul>
            {pizzaOffers.map(pizzaOffer => <li key={pizzaOffer.id} onClick={() => onClickCallback(pizzaOffer, friends) }>{pizzaOffer.name}</li>)}
        </ul>
    )
}

export const printPizzaFans = (friends, pizzaOffers) => {

    return friends.map( friend => {

        const preferenceMatches = pizzaOffers.reduce((accum, pizza) => {
            return getPreferenceMatch(pizza, friend, accum, pizza);
        }, getPreferenceMatchTemplate());

        const favouritePizzas = preferenceMatchesToString(preferenceMatches);
        return {"favouritePizza": favouritePizzas, "name": friend.name};
    })

}

export const printFriendsForAPizza = (pizza, friends) => {

    const preferenceMatches = friends.reduce( (accum, friend) => {
        return getPreferenceMatch(pizza, friend, accum, friend);
    }, getPreferenceMatchTemplate());

    return preferenceMatchesToString(preferenceMatches);

}

const getPreferenceMatchTemplate = () => {
    return { matches: [], highestMatchCount: -1 };
}


/**
 * @param {[],Integer}
 */
const preferenceMatchesToString = (preferenceMatches) => {

    const {matches, highestMatchCount} = preferenceMatches;
    return matches.filter(match => match[1] == highestMatchCount)
                  .map(fav => fav[0].name)
                  .sort()
                  .join(", ");

}


const getPreferenceMatch = (pizza, friend, accum, itemToPush) => {

    let matchCount = 0;

    for (const topping of pizza.toppings) {
        if (friend.noGos.includes(topping)) {
            return accum;
        }
        if (friend.preferences.includes(topping)) {
            matchCount++;
        }
    }

    if (matchCount > accum.highestMatchCount) { accum.highestMatchCount = matchCount };
    accum.matches.push([itemToPush, matchCount]);
    return accum;

}
