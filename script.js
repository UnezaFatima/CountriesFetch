const countriesElem = document.querySelector(".countries");
const dropdown = document.querySelector(".dropdown button");
const dropElem = document.querySelector(".showDropDown");
const regionElems = document.querySelectorAll(".region");
const searchInput = document.querySelector(".form-control input");

async function getCountry() {
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    console.log(res);
    res.forEach(element => {
        showCountry(element);
    });
}
getCountry();

function showCountry(data) {
    const country = document.createElement("div");
    country.classList.add("country");
    country.innerHTML = `
        <div class="country-img">
            <img class="image" src="${data.flags.svg}" alt="Flag of ${data.name.common}">
        </div>
        <div class="countryInfo">
            <h5>${data.name.common}</h5>
            <p><b>Population:</b> ${data.population.toLocaleString()}</p>
            <p class="regionName"><b>Region:</b> ${data.region}</p>
            <p><b>Capital:</b> ${data.capital ? data.capital[0] : 'N/A'}</p>
        </div>
    `;
    countriesElem.appendChild(country);
}


dropdown.addEventListener("click", () => {
    dropElem.classList.toggle("showDropDown");
    console.log("Dropdown toggled");
});

regionElems.forEach(element => {
    element.addEventListener("click", () => {
        const selectedRegion = element.textContent;
        filterCountriesByRegion(selectedRegion);
    });
});

function filterCountriesByRegion(region) {
    const countryElems = document.querySelectorAll(".country");
    countryElems.forEach(country => {
        const regionName = country.querySelector(".regionName").textContent.split(': ')[1];
        if (region === "All" || regionName === region) {
            country.style.display = "grid";
        } else {
            country.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const countryElems = document.querySelectorAll(".country");
    countryElems.forEach(country => {
        const countryName = country.querySelector("h5").textContent.toLowerCase();
        if (countryName.includes(query)) {
            country.style.display = "grid";
        } else {
            country.style.display = "none";
        }
    });
});








