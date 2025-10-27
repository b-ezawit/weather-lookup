const express = require('express');
const app = express();
const https = require('https');
app.listen(5000 , ()=>{
    console.log("Listening: port # 5000 ...");
});
app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
const bodyParser = require('body-parser');
const middleware = bodyParser.urlencoded({extended : true});
app.use(middleware); 

app.post('/' , (req,res)=>{
    const inputCity = req.body.cityName;
    const inputURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ inputCity + '&units=metric&appid=a3b8802af9c4556acf13becb96aed0c6';

    https.get(inputURL , (response)=>{
        console.log(response.statusCode);
        
        response.on('data' , (data)=>{
        
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            res.write(`<body style="background-color: #D2B48C; color :#5C4033 "><h1 style= "text-align:center; margin-top : 120px; font-size:45px">The Temperature in ${inputCity} is ${temperature} <sup style="font-size:20px">0</sup>C</h1></body>`);
        
            const weatherDescription = weatherData.weather[0].description;
            res.write(`<h2 style= "text-align:center">Description: ${weatherDescription}</h2>`);
            const iconID = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";

            const img = (`<img style = "display:block; margin-left: auto; margin-right: auto;" src = ${iconURL}>`);
            res.write(img);
            res.write(`<button onclick = "window.location.href='/'" style="display:block;margin-left:auto; margin-right:auto; font-size:13px; cursor:pointer; height: 35px; width: 70px; background-color:#5C4033; color:white;" onmouseover="this.style.backgroundColor='#5C4033';" onmouseout="this.style.backgroundColor='gray';"
 >Go Back</button>`)
            res.send();
        })
    })
});
