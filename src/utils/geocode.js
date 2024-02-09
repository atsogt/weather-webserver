const request = require("postman-request");

const geocode = (address, callback) => {
  const mapBoxURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXRzb2d0MTciLCJhIjoiY2xyeThvNnBmMWxqYjJsb2JqdzhqN2tvNCJ9.UUKjctvwU72LrRG2HE8g4A";

  request({ url: mapBoxURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service ", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, Try another search.", undefined);
    } else {
      let { center, place_name: name } = body.features[0];
      callback(undefined, {
        longitude: center[0],
        latitude: center[1],
        location: name,
      });
    }
  });
};

module.exports = geocode;
