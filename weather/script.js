const API_KEY = "2ae1d9e73cb9ddc67b7dfd829628a135";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

const city = document.getElementById("cityInput").value.trim();

if(city===""){

alert("Please enter a city name");
return;

}

getWeather(city);

});

async function getWeather(city){

const message=document.getElementById("message");
const weather=document.getElementById("weather");

message.innerHTML="Loading...";
weather.classList.add("hidden");

try{

const response=await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

);

if(!response.ok){

throw new Error("City not found");

}

const data=await response.json();

message.innerHTML="";

document.getElementById("city").innerHTML=
`${data.name}, ${data.sys.country}`;

document.getElementById("temp").innerHTML=
`🌡 Temperature : ${data.main.temp} °C`;

document.getElementById("desc").innerHTML=
`☁ Weather : ${data.weather[0].description}`;

document.getElementById("humidity").innerHTML=
`💧 Humidity : ${data.main.humidity}%`;

document.getElementById("wind").innerHTML=
`🌬 Wind Speed : ${data.wind.speed} m/s`;

weather.classList.remove("hidden");

}

catch(error){

message.innerHTML=error.message;

}

}