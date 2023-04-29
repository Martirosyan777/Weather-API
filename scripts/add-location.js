{
  const locationInput = document.querySelector('.location-input');
  const addLocationButton = document.querySelector('.add-location-button');

  const API_URL = 'http://api.weatherapi.com/v1/current.json?key=0698f3aa6b9d4f09a7c111107220507&q='
  const MIN_INPUT_SYMBOLS = 3;

  async function getWether(location) {
    const url = API_URL + location.toLocaleLowerCase();

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  function createCard(wether) {

    if (wether.error) {
      return alert(wether.error.message);
    }

    const cardHTML = `
        <img onclick="closeCard()" class="grid-card-menu-icon" src="images/menu-icon.svg" alt="menu icon">
        <div class="card-info">
          <img class="whether-icon" src="https:${wether.current.condition.icon}" alt="whether icon">
          <div class="location-day">
            <h3 class="location">${wether.location.name}</h3>
            <span class="day">${wether.current.last_updated}</span>
          </div>
        </div>

        <div class="condition">
          <h2 class="degrees">
            ${wether.current.temp_c}
            <span class="celsius active">°C</span>
            <span class="fahrenheit">°F</span>
          </h2>
          <span class="condition-text">${wether.current.condition.text}</span>
        </div>

        <div class="wether-info">
          <div class="info-row">
            <span class="row-text half-width">
              Visibility: ${wether.current.vis_km}km
            </span>
            <div class="row-divider"></div>
            <span class="row-text">Feels like: 10km</span>
          </div>
          <div class="info-row">
            <span class="row-text half-width">
              Humidity: 10%
            </span>
            <div class="row-divider"></div>
            <span class="row-text">Wind: 10km</span>
          </div>
        </div>
    `

    const grid = document.querySelector('.grid');
    const card = document.createElement('div');

    card.classList.add('grid-card');
    card.innerHTML = cardHTML;

    grid.append(card);

    closeModal();
  }

  function saveInLocalStorage(wether) {
    const parsedLocations = JSON.parse(localStorage.getItem('locations'));
    const cachedLocation = parsedLocations ? [...parsedLocations] : [];
    const locations = [wether, ...cachedLocation];

    localStorage.setItem('locations', JSON.stringify(locations));
  }

  async function handleClick() {
    if (locationInput.value.length < MIN_INPUT_SYMBOLS) {
      return alert('Please write valid location!');
    }

    const wether = await getWether(locationInput.value);

    saveInLocalStorage(wether);
    createCard(wether);

    locationInput.value = '';
  }

  function checkLocalStorage() {
    const locations = JSON.parse(localStorage.getItem('locations'));

    if (locations && locations.length) {
      locations.forEach((location) => {
        createCard(location);
      });
    }
  }

  addLocationButton.onclick = handleClick;

  window.onload = function () {
    checkLocalStorage();
  }

  function closeCard() {
    let card = document.querySelector('.grid-card');
    console.log('card', card);
    let parent = card.parentNode;
    console.log('parent', parent);
    parent.removeChild(card);
  }
}

