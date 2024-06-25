const apiKey = "67bb4a765249f551c511f38cd5e09a65";

document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.querySelector(".listcity");
  citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value;
    checkWeather(selectedCity);
  });

  const defaultCity = citySelect.value;
  checkWeather(defaultCity);
});

async function checkWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Weather data not available");
    }
    const data = await response.json();

    console.log(data);
    updateUI(data);
  } catch (error) {
    console.error("Error fetching the weather data: ", error);
  }
}

function updateUI(data) {
  const date = new Date();
  document.querySelector(".date-dayname").textContent = date.toLocaleDateString(
    "en-US",
    { weekday: "long" }
  );
  document.querySelector(".date-day").textContent = date.toLocaleDateString(
    "en-US",
    { day: "numeric", month: "short", year: "numeric" }
  );
  document.querySelector(
    ".location"
  ).textContent = `${data.name}, ${data.sys.country}`;

  const weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.setAttribute(
    "data-feather",
    getWeatherIcon(data.weather[0].main)
  );
  feather.replace();
  document.querySelector(".weather-temp").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.querySelector(".weather-desc").textContent =
    data.weather[0].description;

  document.querySelector(
    ".humidity-view"
  ).textContent = `${data.main.humidity} %`;
  document.querySelector(".wind-view").textContent = `${data.wind.speed} km/h`;
  document.querySelector(".PRESSURE").textContent = `${data.main.pressure} hPa`;
}

function getWeatherIcon(main) {
  const weatherIcons = {
    Clear: "sun",
    Clouds: "cloud",
    Rain: "cloud-rain",
    Snow: "cloud-snow",
    Drizzle: "cloud-drizzle",
    Thunderstorm: "cloud-lightning",
    Mist: "cloud",
    Smoke: "cloud",
    Haze: "cloud",
    Dust: "cloud",
    Fog: "cloud",
    Sand: "cloud",
    Ash: "cloud",
    Squall: "cloud",
    Tornado: "cloud",
  };
  return weatherIcons[main] || "cloud";
}
