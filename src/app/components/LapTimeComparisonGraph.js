import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables, Interaction } from "chart.js";
import { fetchData, dynamicBorderColor } from "../utils/api"; // Ensure the path is correct
import { CrosshairPlugin, Interpolate } from "chartjs-plugin-crosshair";

// Register chart.js components and plugins
Chart.register(...registerables, CrosshairPlugin);
Interaction.modes.interpolate = Interpolate;

const LapTimeComparisonGraph = () => {
  const [year, setYear] = useState("2023");
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const fetchDriversInfo = async () => {
    1;
    const response = await fetchData("/drivers");
    return response.reduce((acc, driver) => {
      acc[driver.driver_number] = driver.last_name;
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchData(`/sessions?year=${year}&session_type=Race`)
      .then((response) => {
        setSessions(response);
        if (response.length > 0) {
          setSelectedSession(response[0].session_key);
        }
      })
      .catch((error) => console.error("Error fetching sessions:", error));
  }, [year]);

  const orderedDriverNumbers = [
    1,
    11,
    44,
    63,
    16,
    55,
    4,
    81,
    31,
    10,
    14,
    18,
    ,
    21,
    3,
    22,
    77,
    24,
    23,
    2,
    20,
    27,
  ];

  useEffect(() => {
    if (selectedSession) {
      Promise.all([
        fetchData(`/laps?session_key=${selectedSession}`),
        fetchDriversInfo(),
      ])
        .then(([lapData, driversInfo]) => {
          const maxLapNumber = Math.max(
            ...lapData.map((lap) => lap.lap_number)
          );
          const labels = Array.from(
            { length: maxLapNumber },
            (_, i) => `Lap ${i + 1}`
          );

          // Get unique list of driver numbers
          const driverNumbers = [
            ...new Set(lapData.map((lap) => lap.driver_number)),
          ];

          // Sort driver numbers based on predefined order
          driverNumbers.sort((a, b) => {
            return (
              orderedDriverNumbers.indexOf(a) - orderedDriverNumbers.indexOf(b)
            );
          });

          // Map sorted driver numbers to datasets
          const datasets = driverNumbers.map((driverNumber) => {
            const driverLaps = lapData.filter(
              (lap) => lap.driver_number === driverNumber
            );

            // Create data array with nulls for missing laps
            const data = labels.map((_, index) => {
              const lap = driverLaps.find((l) => l.lap_number === index + 1);
              return lap ? lap.lap_duration : null;
            });

            const shouldBeVisible = [44, 1, 16].includes(driverNumber);
            return {
              label: driversInfo[driverNumber] || `Driver ${driverNumber}`,
              data,
              borderColor: dynamicBorderColor(driverNumber),
              tension: 0.4,
              hidden: !shouldBeVisible, // Set to false if you want to show the dataset by default
            };
          });

          setChartData({
            labels,
            datasets,
          });
        })
        .catch((error) =>
          console.error("Error fetching lap times or driver info:", error)
        );
    }
  }, [selectedSession, orderedDriverNumbers]);

  const chartOptions = {
    responsive: true,
    tooltip: {
      enabled: true,
      mode: "interpolate",
      intersect: true,
      position: "average",
    },

    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "start",
        rtl: true,
        labels: {
          color: "#bbbbbbcc",
          boxWidth: 20,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        mode: "interpolate",
        intersect: false,
        position: "nearest",
        caretSize: 5, // Size of the caret on the tooltip
        xAlign: "right", // This can be 'left', 'center', or 'right'
        yAlign: "center",
      },
      crosshair: {
        line: {
          color: "#F66", // crosshair line color
          width: 1, // crosshair line width
        },
        sync: {
          enabled: true, // enable trace line syncing with other charts
          group: 1, // chart group
          suppressTooltips: false, // suppress tooltips when showing a synced tracer
        },
        zoom: {
          enabled: true, // enable zooming
          zoomboxBackgroundColor: "rgba(66,133,244,0.2)", // background color of zoom box
          zoomboxBorderColor: "#48F", // border color of zoom box
          zoomButtonText: "Reset Zoom", // reset zoom button text
          zoomButtonClass: "reset-zoom", // reset zoom button class
        },
        callbacks: {
          beforeZoom: () =>
            function (start, end) {
              // called before zoom, return false to prevent zoom
              return true;
            },
          afterZoom: () =>
            function (start, end) {
              // called after zoom
            },
        },
        pan: {
          incrementer: 3, // Defaults to 5 if not included.
        },
      },
    },
  };

  var panZoom = function (e) {
    if (e.keyCode === 37) {
      $Chart.panZoom(-5);
    } else if (e.keyCode === 39) {
      $Chart.panZoom(5);
    }
  };

  window.addEventListener("keydown", panZoom);

  const selectorClass =
    "mb-3 block w-full p-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500";

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center">
          <select
            id="yearSelector"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={selectorClass}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            {/* Add more years as needed */}
          </select>
        </div>
        <div className="flex items-center">
          <select
            id="sessionSelector"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            disabled={!year}
            className={selectorClass}
          >
            {sessions.map((session) => (
              <option key={session.session_key} value={session.session_key}>
                {session.location} - {session.session_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {chartData.datasets.length > 0 && (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default LapTimeComparisonGraph;
