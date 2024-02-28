import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  fetchData,
  dynamicBorderColor,
  dynamicColorForCompound,
} from "../utils/api";

Chart.register(...registerables);

const PitStopTimelineChart = () => {
  const [year, setYear] = useState("2023");
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const fetchDriverInfo = async () => {
    const driverInfo = await fetchData("/drivers");
    return driverInfo.reduce((acc, driver) => {
      acc[driver.driver_number] = driver.last_name;
      return acc;
    }, {});
  };

  const calculateMedian = (values) => {
    if (values.length === 0) throw new Error("No inputs");

    values.sort((a, b) => a - b);
    var half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];
    return (values[half - 1] + values[half]) / 2.0;
  };

  useEffect(() => {
    fetchData(`/sessions?year=${year}&session_type=Race`)
      .then((response) => {
        let filteredSessions = response;
        if (year === "2023") {
          filteredSessions = response.filter((session, index) => index >= 7);
        }
        setSessions(filteredSessions);
        if (filteredSessions.length > 0) {
          setSelectedSession(filteredSessions[0].session_key);
        }
      })
      .catch((error) => console.error("Error fetching sessions:", error));
  }, [year]);

  useEffect(() => {
    if (selectedSession) {
      fetchData(`/pit?session_key=${selectedSession}`)
        .then(async (pitStopsData) => {
          const driverInfo = await fetchDriverInfo();

          const driverPitStops = pitStopsData.reduce((acc, pitStop) => {
            const driverNumber = pitStop.driver_number;
            const driverName =
              driverInfo[driverNumber] || `Driver ${driverNumber}`;
            const color = dynamicBorderColor(driverNumber);
            const borderColor = pitStop.compound
              ? dynamicColorForCompound(pitStop.compound)
              : "#000000";

            const shouldBeVisible = [44, 63, 1, 11, 55, 16, 4, 81].includes(
              driverNumber
            );

            if (!acc[driverNumber]) {
              acc[driverNumber] = {
                driverNumber: driverNumber,
                label: driverName,
                hidden: !shouldBeVisible,
                data: [],
                backgroundColor: color,
                borderColor: borderColor,
                borderWidth: 4,
                pointRadius: 8,
              };
            }

            acc[driverNumber].data.push({
              x: pitStop.lap_number,
              y: pitStop.pit_duration,
              compound: pitStop.compound || "Unknown",
            });

            return acc;
          }, {});

          let datasets = Object.values(driverPitStops);

          const orderedDriverNumbers = [
            1, 11, 44, 63, 16, 55, 4, 81, 31, 10, 14, 18, 21, 3, 22, 77, 24, 23,
            2, 20, 27,
          ];
          datasets = datasets.sort(
            (a, b) =>
              orderedDriverNumbers.indexOf(a.driverNumber) -
              orderedDriverNumbers.indexOf(b.driverNumber)
          );

          setChartData({ datasets });
        })
        .catch((error) =>
          console.error("Error fetching pit stop data:", error)
        );
    }
  }, [selectedSession]);

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Lap Number",
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Pit Stop Duration (Seconds)",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) =>
            `Driver: ${context.dataset.label}, Lap: ${
              context.raw.x
            }, Duration: ${context.raw.y}s, Compound: ${
              context.raw.compound || "Unknown"
            }`,
        },
      },
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
      zoom: {
        zoom: {
          enabled: false,
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  };

  const selectorClass =
    "mb-3 block w-full p-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500";

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={selectorClass}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="flex items-center">
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className={selectorClass}
            disabled={!sessions || sessions.length === 0}
          >
            {sessions &&
              sessions.map((session) => (
                <option key={session.session_key} value={session.session_key}>
                  {session.location} - {session.session_name}
                </option>
              ))}
          </select>
        </div>
      </div>
      {chartData.datasets && chartData.datasets.length > 0 && (
        <Scatter data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default PitStopTimelineChart;
