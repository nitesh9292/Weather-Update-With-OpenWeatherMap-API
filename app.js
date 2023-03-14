const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res)
{
   res.sendFile(__dirname+"/index.html");
  
});

app.post("/",function(req,res)
{
   
const query = req.body.cityName;
const apiKey = process.env.API_KEY;
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url,function(response)
{
    // console.log(response.statusCode);

    response.on("data", function(data)
    {
        const weatherData = JSON.parse(data);
        // console.log(weatherData);
        const temp  = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write(`<style type="text/css">
                body {
                text-align:center;
                margin-top:2rem
                background-color:antiquewhite;
            }
            </style>`);
        res.write("<p>The weather currently is "+weatherDescription+"</p>");
        res.write("<h1>The temperature in the "+query+" is "+temp+ " degree celsius</h1>");
        res.write("<img src =" +imageUrl+ " >");
        res.send();
       
        // console.log(temp);
        // console.log(weatherDescription);
    })
})
    
    
});









app.listen(3000,function()
{
    console.log("Server is running on port 3000");
})