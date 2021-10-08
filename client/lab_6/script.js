const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

const cities = []

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    })
}

function displayMatches () {
    const matchArray = findMatches(this.value, cities)
    console.log(matchArray)
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', (evt) => { displayMatches(evt);})
})