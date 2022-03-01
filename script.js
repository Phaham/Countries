const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
    const html =
        ` <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}
const getCountryAndNeighboour = function (country) {
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {

        const [data] = JSON.parse(this.responseText);
        console.log(data);

        // Render country ->
        renderCountry(data);

        // Get neighbour country ->
        const [neighbour] = data.borders;
        if (!neighbour) return;

        // AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function () {
            const data2 = JSON.parse(this.responseText);//we don't need to destructure because data now returns a single value not an array(here we're searching by codes not by names)
            console.log(data2);

            renderCountry(data2, 'neighbour');
        })
    });
};

// form 
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const country = document.getElementById('country').value;
    getCountryAndNeighboour(country);
    btnClear.classList.remove('hidden');
    country.placeholder.style.opacity = 1;
});
const clear = document.getElementById('button');
const btnClear = document.querySelector('.hidden');

clear.addEventListener('click', () => {
    window.location.reload();
    btnClear.classList.add('hidden');
});
