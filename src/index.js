let city;
const content = document.querySelector('.content')

async function find(event) {
    event.preventDefault();

    const input = document.querySelector('input');

    if (input.value == '') {
        city = 'London';
    }
    else {
        city = input.value;
    };

    try {
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e1b48ab018db65863ddd3d94013ec50e&units=metric`, { mode: 'cors' })
        const data = await responce.json()

        city = data.name;
        const desc = data.weather.find(item => item.description).description;
        const code = data.weather.find(item => item.icon).icon;
        const temp = data.main.temp + ' °C';
        const temp_feel = 'feels like: ' + data.main.feels_like + ' °C'
        const speed = ' Wind speed: ' + data.wind.speed + ' km/h';

        info(city, code, desc, temp, temp_feel, speed);
    }

    catch {

        // Remove old div if exist
        if (document.querySelector('.info')) {
            document.querySelector('.info').remove();
        };

        const error = document.createElement('h2');
        error.textContent = 'City not found!';
        error.setAttribute('class', 'info');
        content.appendChild(error);

        console.log('[!] City not found!');
    };

};

function info(city, code, desc, temp, temp_feel, speed) {
    const div = document.createElement('div');
    div.setAttribute('class', 'info');

    const name = document.createElement('h1');
    name.textContent = city;
    name.setAttribute('id', 'name');

    const temp_now = document.createElement('h2');
    temp_now.textContent = temp;
    temp_now.setAttribute('id', 'temp-now');

    const feels_like = document.createElement('p');
    feels_like.textContent = temp_feel;
    feels_like.setAttribute('id', 'feels-like');

    const weather = document.createElement('p');
    weather.textContent = desc;
    weather.setAttribute('id', 'weather');

    const wind_speed = document.createElement('p');
    wind_speed.textContent = speed;
    wind_speed.setAttribute('id', 'wind-speed');

    const icon = document.createElement('img');
    icon.src = `./img/${code}.png`;
    icon.setAttribute('id', 'icon');

    // Remove old div if exist
    if (document.querySelector('.info')) {
        document.querySelector('.info').remove();
    };

    temp_now.appendChild(icon);
    div.appendChild(name);
    div.appendChild(temp_now);
    div.appendChild(feels_like);
    div.appendChild(weather);
    div.appendChild(wind_speed);
    content.appendChild(div);

    const date = new Date();
    const time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const current_time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + time_zone;
    console.log(current_time)
};

document.querySelector('.find-btn').addEventListener('click', (event) => {
    find(event);
});