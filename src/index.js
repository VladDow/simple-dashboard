// eslint-disable-next-line semi
'use strict'

import './scss/config.scss';
import chartRender from '/js/chartRender';

const API_URL = [
  'https://geocoding-api.open-meteo.com/v1/search',
  'https://api.open-meteo.com/v1/forecast',
];

const name = document.getElementById('search');
const type = document.getElementById('type');
const chart = document.getElementById('chart');

document.getElementById('form-weather')
    .addEventListener('submit', function(event) {
      event.preventDefault();

      fetch(`${API_URL[0]}?name=${name.value}&count=1&format=json`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Wrong response geodata!');
            }
          })
          .then((city) => {
            if (city.results[0] === undefined) {
              throw new Error('Wrong geodata!');
            }

            const {latitude, longitude} = city.results[0];

            // eslint-disable-next-line max-len
            fetch(`${API_URL[1]}?latitude=${latitude}&longitude=${longitude}&hourly=${type.value}`)
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error('Wrong response weather!');
                  }
                })
                .then((weather) => {
                  if (weather.hourly === undefined ||
                    weather.hourly_units === undefined) {
                    throw new Error('Wrong data weather!');
                  }

                  console.log(weather);

                  if (type.value === 'temperature_2m') {
                    chartRender('Температура',
                        weather.hourly.time,
                        weather.hourly.temperature_2m,
                        0, 25, chart);
                  } else if (type.value === 'windspeed_10m') {
                    chartRender('Скорость ветра',
                        weather.hourly.time,
                        weather.hourly.windspeed_10m,
                        0, 30, chart);
                  }
                })
                .catch((error) => {
                  alert('Произошла ошибка!');
                  console.log(error);
                });

            return;
          }).catch((error) => {
            alert('Произошла ошибка!');
            console.log(error);
          });
    });

