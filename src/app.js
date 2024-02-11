const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("../src/utils/forecast");
const geocode = require("../src/utils/geocode");
//test
const app = express();

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Tsogtbaatar",
    name: "Anand Tsogtbaatar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Anand Tsogtbaatar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Contact Customer Support",
    number: "317-371-4580",
    name: "Anand Tsogtbaatar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        res.send({ error: error });
      }

      forecast(latitude, longitude, (error, location, temperature) => {
        if (error) res.send({ error });

        res.send({ location: location, temp: temperature });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help",
    name: "Anand Tsogtbaatar",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anand Tsogtbaatar",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});
