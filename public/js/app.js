const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const loc = document.querySelector("#location");
const locationWeather = document.querySelector("#location-weather");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = search.value;
  loc.textContent = "Loading...";
  locationWeather.textContent = "";

  fetch(`http://localhost:3000/weather?address=${input}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        loc.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.temp);
        loc.textContent = data.location;
        locationWeather.textContent = data.temp;
      }
    });
  });
});
