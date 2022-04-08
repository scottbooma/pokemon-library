const loading = document.querySelector(".loading")
const pageTitle = document.querySelector("title")

const main = document.querySelector("main")
const pokemonDetails = document.createElement("div")
pokemonDetails.classList.add("pokemon-details")
main.append(pokemonDetails)

const returnHome = document.createElement("div")
returnHome.classList.add("return")
returnHome.innerHTML = `<a href="index.html">Return Home</a>`
main.append(returnHome)


function titleCase(string) {
    return string.toLowerCase().split("-").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(" ")
}

function addPokemonDetails(pokemon) {
    pokemonDetails.innerHTML = `
        <figure class="detail-figure">
            <img src=${pokemon.sprites.versions["generation-i"]["red-blue"].front_default} alt=${titleCase(pokemon.name)} class="detail-image" />
            <figcaption class="detail-figcaption">${titleCase(pokemon.name)}</figcaption>
        </figure>

        <h2>Abilities</h2>
    `

}

function addPokemonAbilities(pokemon) {
    const abilitiesList = document.createElement("ul")
    abilitiesList.classList.add("abilities")
    pokemonDetails.append(abilitiesList)
    Promise.all(pokemon.abilities
        .map(ability => ability.ability.url)
        .map(url => fetch(url)
            .then(response => response.json())))
        .then(responses => responses.forEach(response => {
            const li = document.createElement("li")
            li.innerHTML = `
                <span class="ability-name">${titleCase(response.name)}</span>
                <span class="ability-short-description">${response.effect_entries.find(effect => {
                return effect.language.name === "en"
            }).short_effect}</span>
            `
            abilitiesList.append(li)
        }))
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        loading.classList.add("hidden")
        pageTitle.textContent = titleCase(parsedResponse.name)
        addPokemonDetails(parsedResponse)
        addPokemonAbilities(parsedResponse)
    }).catch(error => {
        const p = document.createElement("p")
        p.textContent = "You blacked out!"
        main.append(p)
    })

