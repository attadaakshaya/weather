window.onload = () => {
  const dropdown = document.getElementById("cityDropdown");
  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    dropdown.appendChild(option);
  });
};

function getWeather() {
  const dropdownCity = document.getElementById('cityDropdown').value.trim();
  const inputCity = document.getElementById('cityInput').value.trim();
  const city = dropdownCity || inputCity;

  if (!city) {
    showError("Please select or enter a city.");
    return;
  }

  const apiKey = OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  resetDisplay();

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      document.getElementById('cityName').textContent = data.name;
      document.getElementById('description').textContent = data.weather[0].description;
      document.getElementById('temp').textContent = data.main.temp;
      document.getElementById('humidity').textContent = data.main.humidity;
      document.getElementById('weatherInfo').classList.remove("hidden");
    })
    .catch(() => {
      showError("City not found. Please check spelling or choose another.");
    });
}

function resetDisplay() {
  document.getElementById('error').textContent = '';
  document.getElementById('weatherInfo').classList.add("hidden");
}

function showError(message) {
  document.getElementById('error').textContent = message;
}
