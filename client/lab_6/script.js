async function windowActions () {

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

const cities = []

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
}

function displayMatches () {
    const matchArray = findMatches(event.target.value, cities)
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.name}</span></br>
                <span class="address">${place.address_line_1}</span></br>
                <span class="city">${place.city}</span></br>
                <span class="zip">${place.zip}</span></br>
            </li>
            <br>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', () => { 
    if (searchInput.value == '') {
        suggestions.innerHTML = '';
    } else {
        displayMatches()
    }

});

}

window.onload = windowActions;