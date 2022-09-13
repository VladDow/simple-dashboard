import Chart from 'chart.js/auto';

let chartWeather = null;

// eslint-disable-next-line require-jsdoc
export default function chartRender(header, label, data, min, max, element) {
  const dataChart = {
    labels: label.filter((item, index) => index % 8 === 0),
    datasets: [
      {
        label: header,
        data: data,
        borderColor: '#6f6ab9',
        lineWidth: 2,
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: 'line',
    data: dataChart,
    options: {
      responsive: true,
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: {
          labels: {
            color: '#bbc6ce',
            font: {
              size: 18,
            },
          },
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
          },
          ticks: {
            color: '#bbc6ce',
            font: {
              size: 14,
            },
          },
          grid: {
            color: '#5c646a',
            borderColor: '#5c646a',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
          },
          ticks: {
            color: '#bbc6ce',
            font: {
              size: 14,
            },
          },
          grid: {
            color: '#5c646a',
            borderColor: '#5c646a',
          },
          suggestedMin: min,
          suggestedMax: max,
        },
      },
    },
  };

  if (chartWeather !== null) {
    chartWeather.destroy();
  }

  chartWeather = new Chart(element, config);
}
