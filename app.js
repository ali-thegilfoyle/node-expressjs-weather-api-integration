const express = require("express");
const app = express();
const port = 3000;

// https
const https = require("https");
// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "Your api key here";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<p>The weather is currently: ${description} </p>`);
      res.write(
        `<h1>The temperature in London is ${temp} degree Calcius.</h1>`
      );
      res.write(`<img src=${imageURL}></img>`);
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log(`server listing at http://localhost:${port}`);
});
