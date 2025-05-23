import React from 'react';
import { Bar } from 'react-chartjs-2';

function EconomicImpactChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="flex justify-center items-center h-full bg-gray-100 rounded">No data available</div>;
  }

  // Sort data chronologically by the first year in each period
  const sortedData = [...data].sort((a, b) => {
    try {
      const yearA = parseInt(a.period.split('–')[0]);
      const yearB = parseInt(b.period.split('–')[0]);
      return yearA - yearB;
    } catch (e) {
      return 0;
    }
  });

  // Extract GDP effects and convert to numbers
  const gdpEffects = sortedData.map(item => {
    // Handle different formats of gdpEffect
    try {
      const gdpStr = item.gdpEffect || '';
      const match = gdpStr.match(/(-?\d+(\.\d+)?)/);
      return match ? parseFloat(match[0]) : 0;
    } catch (e) {
      return 0;
    }
  });

  // Determine colors based on tariff trend
  const barColors = sortedData.map(item => {
    if (!item.tariffTrend) return 'rgba(59, 130, 246, 0.7)'; // Default blue
    return item.tariffTrend.includes('increas') ? 'rgba(239, 68, 68, 0.7)' : 'rgba(34, 197, 94, 0.7)';
  });

  const barBorderColors = sortedData.map(item => {
    if (!item.tariffTrend) return 'rgb(29, 78, 216)'; // Default dark blue
    return item.tariffTrend.includes('increas') ? 'rgb(220, 38, 38)' : 'rgb(22, 163, 74)';
  });

  // Prepare chart data
  const chartData = {
    labels: sortedData.map((item, index) => item.period || `Period ${index + 1}`),
    datasets: [
      {
        label: 'GDP Growth/Decline (%)',
        data: gdpEffects,
        backgroundColor: barColors,
        borderColor: barBorderColors,
        borderWidth: 1,
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
          label: (context) => {
            const item = sortedData[context.dataIndex];
            if (!item) return ['No data available'];
            
            const labels = [];
            if (item.gdpEffect) labels.push(`GDP Effect: ${item.gdpEffect}`);
            if (item.tariffTrend) labels.push(`Tariff Trend: ${item.tariffTrend}`);
            if (item.employmentEffect) labels.push(`Employment: ${item.employmentEffect}`);
            if (item.priceEffect) labels.push(`Prices: ${item.priceEffect}`);
            
            return labels.length > 0 ? labels : ['No details available'];
          }
        }
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Economic Impact of Tariff Policies',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Period'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'GDP Effect (%)'
        }
      }
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', maxHeight: '400px' }}>
      <Bar data={chartData} options={options} />
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
          <span className="text-sm">Increasing Tariffs</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
          <span className="text-sm">Decreasing Tariffs</span>
        </div>
      </div>
    </div>
  );
}

export default EconomicImpactChart;
