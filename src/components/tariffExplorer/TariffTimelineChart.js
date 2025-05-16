import React from 'react';
import { Line } from 'react-chartjs-2';

function TariffTimelineChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="flex justify-center items-center h-full bg-gray-100 rounded">No data available</div>;
  }

  // Sort data by year
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  // Prepare chart data
  const chartData = {
    labels: sortedData.map(item => item.year),
    datasets: [
      {
        label: 'Tariff Rate (%)',
        data: sortedData.map(item => item.rate),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 1
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const year = sortedData[index].year;
            return `Year: ${year}`;
          },
          label: (context) => {
            const item = sortedData[context.dataIndex];
            let label = `Rate: ${item.rate}%`;
            return [
              label,
              `Administration: ${item.administration}`,
              `${item.keyEvent}`
            ];
          }
        }
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historical U.S. Tariff Rates',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tariff Rate (%)'
        }
      }
    },
    // Add annotations for significant events
    annotation: {
      annotations: sortedData
        .filter((_, index) => index % Math.ceil(sortedData.length / 5) === 0) // Add annotations for every ~5th data point
        .map((item, index) => ({
          type: 'line',
          scaleID: 'x',
          value: item.year,
          borderColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1,
          label: {
            content: item.year.toString(),
            enabled: true,
            position: index % 2 === 0 ? 'top' : 'bottom'
          }
        }))
    }
  };

  return <Line data={chartData} options={options} />;
}

export default TariffTimelineChart;
