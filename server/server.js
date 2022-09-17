require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.json());




app.post("/api",function(req,res){
  
    const apiKey= process.env.API_KEY;
  const units = "metric";
 const location = req.body.text;
//  console.log(location);

    // searchArr.push(location);
  
//   console.log(searchArr);
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+location+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    if(response.statusCode>399 && response.statusCode<450){
      errcl = "show";
    }else{
    response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const tempRounded =Math.floor(weatherData.main.temp) ;
    const tempDec = Math.round((temp - tempRounded)*100);
    const desc = weatherData.weather[0].description;
    const name= weatherData.name;
    const timezone = weatherData.timezone;
    const mintemp = weatherData.main.temp_min;
    const maxtemp = weatherData.main.temp_max;
    const feelslike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const windspeed = weatherData.wind.speed;
    const id = weatherData.weather[0].id;
    res.json({"weatherid" : id,"temp" : tempRounded,"location" : name,"tempDec" : tempDec,"desc": desc,"min": mintemp,"max" : maxtemp});
})}})})
// app.post("/api",(req,res)=>{
//     console.log("attempted post request");
// })
app.post("/yourlocation",function(req,res){

    const apiKey= process.env.API_KEY;
  const units = "metric";
 const lat = req.body.lat;
 const lon = req.body.lon;
//  console.log(location);

    // searchArr.push(location);
  
//   console.log(searchArr);

  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&lat="+lat+"&lon="+lon+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    if(response.statusCode>399 && response.statusCode<450){
      errcl = "show";
    }else{
    response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const tempRounded =Math.floor(weatherData.main.temp) ;
    const tempDec = Math.round((temp - tempRounded)*100);
    const desc = weatherData.weather[0].description;
    const name= weatherData.name;
    const timezone = weatherData.timezone;
    const mintemp = weatherData.main.temp_min;
    const maxtemp = weatherData.main.temp_max;
    const feelslike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const windspeed = weatherData.wind.speed;
    const id = weatherData.weather[0].id;
    res.json({"weatherid" : id,"temp" : tempRounded,"location" : name,"tempDec" : tempDec,"desc": desc,"min": mintemp,"max" : maxtemp});
})}})})

const PORT = process.env.PORT || 3000
app.listen(PORT,function(){
  console.log("Server has started successfully");
})