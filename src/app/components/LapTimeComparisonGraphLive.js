import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables, Interaction } from "chart.js";
import { fetchData, dynamicBorderColor } from "../utils/api";
import { CrosshairPlugin, Interpolate } from "chartjs-plugin-crosshair";
import Image from "next/image";
// Register chart.js components and plugins
Chart.register(...registerables, CrosshairPlugin);
Interaction.modes.interpolate = Interpolate;

const LapTimeComparisonGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true); // New state to explicitly track loading
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true); // Set loading state
      await fetchCurrentRaceSession();
      setIsLoading(false); // Unset loading state after fetching
    };

    fetchInitialData();
  }, []);

  const fetchCurrentRaceSession = async () => {
    const response = await fetchData("/currentRace");
    console.log(response);
    if (response && response.length > 0) {
      setCurrentSession(response[0]);
    }
  };

  const fetchLapDataAndUpdateChart = async () => {
    if (currentSession) {
      const lapData = await fetchData(
        `/laps?session_key=${currentSession.session_key}`
      );
      const driversInfo = await fetchDriversInfo();
      updateChartData(lapData, driversInfo);
    }
  };

  const fetchDriversInfo = async () => {
    const response = await fetchData("/drivers");
    return response.reduce((acc, driver) => {
      acc[driver.driver_number] = driver.last_name;
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchCurrentRaceSession();
  }, []);

  useEffect(() => {
    if (currentSession) {
      fetchLapDataAndUpdateChart();
      const intervalId = setInterval(() => {
        fetchLapDataAndUpdateChart();
      }, 30000); // Update lap data every 30 seconds

      return () => clearInterval(intervalId);
    }
  }, [currentSession]);

  const updateChartData = (lapData, driversInfo) => {
    const labels = lapData.map((lap) => `Lap ${lap.lap_number}`);
    const datasets = lapData.reduce((acc, lap) => {
      if (!acc[lap.driver_number]) {
        acc[lap.driver_number] = {
          label:
            driversInfo[lap.driver_number] || `Driver ${lap.driver_number}`,
          data: [],
          borderColor: dynamicBorderColor(lap.driver_number),
          tension: 0.4,
        };
      }
      acc[lap.driver_number].data.push(lap.lap_duration);
      return acc;
    }, {});

    setChartData({
      labels,
      datasets: Object.values(datasets),
    });
  };

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
        caretSize: 5,
        xAlign: "right",
        yAlign: "center",
      },
      crosshair: {
        line: {
          color: "#F66",
          width: 1,
        },
        sync: {
          enabled: true,
          group: 1,
          suppressTooltips: false,
        },
        zoom: {
          enabled: true,
          zoomboxBackgroundColor: "rgba(66,133,244,0.2)",
          zoomboxBorderColor: "#48F",
          zoomButtonText: "Reset Zoom",
          zoomButtonClass: "reset-zoom",
        },
        callbacks: {
          beforeZoom: () =>
            function (start, end) {
              return true;
            },
          afterZoom: () => function (start, end) {},
        },
        pan: {
          incrementer: 3,
        },
      },
    },
  };

  if (!currentSession) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-black bg-opacity-60 p-8 rounded-3xl max-w-3xl w-11/12 m-4">
          <h1 className="text-stone-100 text-4xl text-center mb-4">
            🔴 No Live Race 🔴
          </h1>

          <div className="flex justify-center pt-14">
            <Image
              src="/images/Won.png"
              width={250}
              height={150}
              alt="Formula Won"
            />
          </div>
          <h2 className="text-stone-100 text-2xl text-center mb-8">
            🏁 Check Back During Sunday Racetime 🏁
          </h2>
        </div>
      </div>
    );
  }

  return <p>Waiting for the next race to start. Please check back later.</p>;
};
export default LapTimeComparisonGraph;
