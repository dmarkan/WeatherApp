const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
const query = req.body.cityName;
const apiKey = "418874062c6bfc74d1c4bd2c63193064";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<body style='background-image: url(images/image2.jpg); background-size: cover; background-attachment: fixed; background-repeat: no-repeat;'>")
        res.write("<h2 style='color:#fff;text-align:center;margin-top:30vh;font-size:2.5rem;'>The weather os currently " + weatherDescription + "</h2>");
        res.write("<img style='display: block; margin-left: auto;margin-right: auto;' src=" + imageURL + ">")
        res.write("<h1 style='color:#fff;text-align:center;font-size:3.2rem;'>The temperature in " + query + " is " + temp + " degrees celcius</h1>");
        res.send();
    })
});
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})