const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const loc = document.querySelector("#location");

const windDir = document.querySelector("#wind");
const locationWeather = document.querySelector("#location-weather");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = search.value;
  loc.textContent = "Loading...";
  locationWeather.textContent = "";

  fetch(`/weather?address=${input}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        loc.textContent = data.error;
      } else {
        loc.textContent = data.location;
        locationWeather.textContent = data.temp;
        windDir.textContent = data.windDir;
      }
    });
  });
});
