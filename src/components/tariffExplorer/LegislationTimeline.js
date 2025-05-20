import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function LegislationTimeline({ data }) {
  if (!data || data.length === 0) {
    return <div className="flex justify-center items-center h-full bg-gray-100 rounded">No data available</div>;
  }

  // Sort data by year
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  // Create years array for x-axis
  const firstYear = sortedData[0].year;
  const lastYear = sortedData[sortedData.length - 1].year;
  const years = [];
  for (let year = firstYear; year <= lastYear; year += Math.ceil((lastYear - firstYear) / 20)) {
    years.push(year);
  }
  
  // Ensure the last year is included
  if (years[years.length - 1] !== lastYear) {
    years.push(lastYear);
  }

  // Create dataset with legislation years marked
  const legislationYears = sortedData.map(item => item.year);
  const dataPoints = years.map(year => legislationYears.includes(year) ? 1 : null);

  // Prepare chart data
  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Major Legislation',
        data: dataPoints,
        fill: false,
        showLine: false,
        pointRadius: 10,
        pointHoverRadius: 12,
        pointBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
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
            const year = tooltipItems[0].label;
            const legislation = sortedData.find(item => item.year === parseInt(year));
            return legislation ? `${legislation.name} (${legislation.year})` : year;
          },
          label: (context) => {
            const year = parseInt(context.label);
            const legislation = sortedData.find(item => item.year === year);
            if (!legislation) return '';
            
            return [
              `Description: ${legislation.description}`,
              `Impact: ${legislation.impact}`
            ];
          },
          footer: () => 'Click a point for details'
        }
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Key Tariff Legislation Timeline',
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
        }
      },
      y: {
        display: false,
        min: 0,
        max: 2
      }
    },
    elements: {
      line: {
        tension: 0
      }
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const year = parseInt(years[index]);
        const legislation = sortedData.find(item => item.year === year);
        if (legislation) {
          console.log('Legislation clicked:', legislation);
          // In a real app, you might want to set some state or trigger a modal
        }
      }
    }
  };

  // Custom rendering with annotations
  return (
    <div className="relative">
      <Line data={chartData} options={options} />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {sortedData.map((item, index) => {
          // Calculate position on the timeline
          const range = lastYear - firstYear;
          const position = ((item.year - firstYear) / range) * 100;
          
          // Only show annotations for every nth item to avoid overcrowding
          if (index % Math.ceil(sortedData.length / 10) !== 0) return null;
          
          return (
            <div 
              key={index}
              className="absolute"
              style={{ 
                left: `${position}%`, 
                top: index % 2 === 0 ? '30%' : '60%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="bg-green-100 border border-green-500 rounded px-2 py-1 text-xs shadow-sm">
                {item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LegislationTimeline;
