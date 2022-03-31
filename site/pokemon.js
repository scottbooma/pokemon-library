const loading = document.querySelector(".loading")
const body = document.querySelector("body")
const pokemonDetails = document.createElement("div")
pokemonDetails.classList.add("pokemon-details")
body.append(pokemonDetails)

function addPokemonDetails(pokemon) {
    pokemonDetails.innerHTML = `
                                <figure>
                                    <img src=${pokemon.sprites.front_default} alt=${pokemon.name} />
                                    <figcaption>${pokemon.name}</figcaption>
                                </figure>

                                <h2>Abilities</h2>
                                `

}

function addPokemonAbilities(pokemon) {
    const abilities = document.createElement("ul")
    abilities.classList.add("abilities")
    pokemonDetails.append(abilities)
    pokemon.abilities.forEach(ability => {
        const li = document.createElement("li")
        li.innerHTML = `<span class="ability-name">${ability.ability.name}</span>
            <span class="ability-short-description">${getAbilityDescription(ability)}</span>`
        abilities.append(li)
    })
}

function getAbilityDescription(ability) {
    fetch(ability.ability.url).then(response => {
        return response.json()
    }).then(parsedResponse => {
        return parsedResponse.effect_entries[0].short_effect
    })
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        loading.classList.add("hidden")
        addPokemonDetails(parsedResponse)
        addPokemonAbilities(parsedResponse)
    })

