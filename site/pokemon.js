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
                                ${addPokemonAbilities()}`

}

function addPokemonAbilities() {
    const abilities = document.createElement("ul")
    abilities.classList.add("abilities")
    pokemonDetails.append(abilities)
    // const li = document.createElement("li")
    // pokemon.abilities.forEach(ability => {
    //     li.innerHTML = `<span class="ability-name">${ability.ability.name}</span>
    //         <span class="ability-short-description">${fetch(ability.ability.url).then(response => { return response.json() }).then(parsedResponse => { return parsedResponse.effect_entries[0].short_effect })}</span>`
    //     abilities.append(li)
    //     console.log(li)
    // })
}

console.log(addPokemonAbilities())

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        loading.classList.add("hidden")
        console.log(parsedResponse)
        addPokemonDetails(parsedResponse)
    })

