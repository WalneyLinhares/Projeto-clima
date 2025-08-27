const apiKey = '';

async function chamadaApi(cityName = "", lat = "", lon = "") {
    let apiURL = ""

    if (apiKey.length === 0) {
        showInfo({
            city: 'Fortaleza',
            country: 'BR',
            temp: 28,
            tempMax: 28.1,
            tempMin: 26.8,
            description: 'céu limpo',
            icon: '02d',
            windSpeed: 65,
            humidity: 6.17,
        });
        return
    }
    
    if (cityName !== "") {
        apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    } else if (lat !== "" && lon !== "") {
        console.log('caiu aqui')
        apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    } else {
        return showAlert("Você precisa informar a cidade")
    }

    const result = await fetch(apiURL);
    const json = await result.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            icon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector('#weather').classList.remove('visibility');
        showAlert(`
            Erro de busca... Tente novamente mais tarde

            <img src="imagens/undraw_to-the-moon_w1wa.svg"/>
        `);
    }
}


document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value
    chamadaApi(cityName);

});


document.getElementById('icon-location').addEventListener('click', () => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (posicao) => {
        const latitude = posicao.coords.latitude;
        const longitude = posicao.coords.longitude;
        chamadaApi(undefined, latitude, longitude);
        }, () => {
            return showAlert("Erro ao obter localização");
        }
    );
    } else {
        return showAlert("Geolocalização não é suportada pelo navegador");
    }

});


function bannerColor(description) {
    const descri = {
        "ensolarado": ["#d37f00", "#fae100"],
        "céu limpo": ["#0059ff", "#00eeff"],
        "nublado": ["#7a7a7a", "#383838"],
        "algumas nuvens": ["#0c285a", "#707070"],
        "nuvens dispersas": ["#d9f0fd", "#707070"],
    }
    
    return descri[description] || ["#0059ff", "#00eeff"];
}

function showInfo(json) {
    showAlert('');
    const Colors = bannerColor(json.description);
    document.querySelector('#weather').classList.add('visibility');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#temp_value').innerHTML = `${parseInt(json.temp)} <sup>C°</sup>`
    document.querySelector('#temp_description').innerHTML = json.description;
    document.querySelector('#img-temp').setAttribute('src', `https://openweathermap.org/img/wn/${json.icon}@2x.png`)
    document.getElementById('temp').style.background = `linear-gradient(60deg, ${Colors[0]}, ${Colors[1]})`;
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`
    document.querySelector('#temp-umi').innerHTML = `${json.humidity} %`
    document.querySelector('#temp-wind').innerHTML = `${json.windSpeed} km/h`
    
    
}

function showAlert(msg) {    
    document.querySelector('#weather').classList.remove('visibility');
    const container = document.querySelector('.container');
    const alertaExistente = document.querySelector('#alert');

    if (msg !== "") {
        if (alertaExistente) {
            alertaExistente.innerHTML = msg;
        } else {
            const novoAlerta = document.createElement('div');
            novoAlerta.id = 'alert';
            novoAlerta.innerHTML = msg;
            container.appendChild(novoAlerta);
        }
        return;
    }

    if (alertaExistente) {
        container.removeChild(alertaExistente);
    }
}

document.getElementById('button-light').addEventListener('click', () => {
    const iconButton = document.getElementById('icon-light');
    const isDark = document.body.classList.toggle('dark-mode');
    
    iconButton.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('modoLight', isDark ? 'dark-mode' : 'light-mode');
});

window.addEventListener('DOMContentLoaded', () => {
    const iconButton = document.getElementById('icon-light');
    const modoSalvo = localStorage.getItem('modoLight');
    
    if (!modoSalvo) {
        localStorage.setItem('modoLight', 'light-mode');
    }
    
    if (modoSalvo === 'dark-mode') {
        document.body.classList.add('dark-mode');
        iconButton.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('dark-mode');
        iconButton.className = 'fa-solid fa-moon';
    }
});