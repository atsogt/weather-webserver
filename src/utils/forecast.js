const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const weatherLocation =
    "http://api.weatherstack.com/current?access_key=685ad882d173879ba3ec103317ce6d84&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url: weatherLocation, json: true }, (error, { body }) => {
    if (error) {
      return callback("Unable to connect to service", undefined);
    } else if (body.error) {
      return callback("Unable to fine location", undefined);
    } else {
      // console.log(response.body);
      let { location, current } = body;
      let { name, region } = location;
      let {
        temperature: temp,
        wind_speed: windSpeed,
        weather_descriptions: forecast,
        wind_dir: windDirection,
      } = current;

      callback(
        undefined,
        name + ", " + region,
        `It is ${temp} degrees with wind speed of ${windSpeed}. Today forcast is ${forecast[0]}.`,
        `The wind direction is blowing ${windDirection}`
      );
    }
  });
};

module.exports = forecast;
