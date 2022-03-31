
const pokemon = document.querySelector(".pokemon")
const loading = document.querySelector(".loading")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50"

// document.addEventListener("DOMContentLoaded", (event) => {
//     if (window.confirm("Only continue if you are a true Pokemon fan.")) {
//         text = "Welcome trainer!"
//     } else {
//         window.open("https://c.tenor.com/AJupCWglORwAAAAC/pokemon-team-rocket.gif")
//     }
// })

function addPokemonListing(response) {
    const li = document.createElement("li")
    li.innerHTML = `
            <div class="pokemon-listing">
        <figure>
            <img src=${response.sprites.front_default} alt=${response.name} />
            <figcaption><a href="pokemon.html?pokemon=${response.id}">${response.name}</a></figcaption>
        </figure>
        </div>`
    pokemon.append(li)
}

fetch(url).then(response => {
    return response.json()
}).then(parsedResponse => {
    const urls = parsedResponse.results.map(result => result.url)
    const fetches = urls.map(url => fetch(url).then(response => response.json()))
    return Promise.all(fetches)
}).then(responses => {
    loading.classList.add("hidden")
    responses.forEach(response => {
        addPokemonListing(response)
    })
})

