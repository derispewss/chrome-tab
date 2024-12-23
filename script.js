function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { 
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();
function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = '50a967eee50ddea30041189246f6df5e';
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    const temp = Math.round(data.main.temp);
                    const description = data.weather[0].description;
                    const weatherIcon = getWeatherIcon(data.weather[0].main);
                    
                    document.getElementById('weatherText').textContent = `${temp}°C - ${description}`;
                    document.getElementById('weatherIcon').className = `fas ${weatherIcon}`;
                });
        });
    }
}
function getWeatherIcon(weatherMain) {
    switch(weatherMain.toLowerCase()) {
        case 'thunderstorm': return 'fa-bolt';
        case 'drizzle': return 'fa-cloud-rain';
        case 'rain': return 'fa-cloud-showers-heavy';
        case 'snow': return 'fa-snowflake';
        case 'clear': return 'fa-sun';
        case 'clouds': return 'fa-cloud';
        default: return 'fa-cloud';
    }
}
getWeather();
setInterval(getWeather, 600000);
document.getElementById('searchBox').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value;
        window.location.href = `https://www.google.com/search?q=${searchTerm}`;
    }
});
document.querySelectorAll('.bookmark-item').forEach(item => {
    item.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        window.location.href = url;
    });
});