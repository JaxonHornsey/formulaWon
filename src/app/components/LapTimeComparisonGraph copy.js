import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchData, dynamicBorderColor } from '../utils/api'; // Ensure the path is correct
import 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';
Chart.register(zoomPlugin);


const LapTimeComparisonGraph = () => {
    const [year, setYear] = useState('2023');
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

const fetchDriversInfo = async () => {
    // Example: Fetch driver info from an API or return a static mapping
    const response = await fetchData('/drivers');
    return response.reduce((acc, driver) => {
        acc[driver.driver_number] = driver.last_name; // Assuming response includes 'driver_number' and 'full_name'
        return acc;
    }, {});
};

    useEffect(() => {
        fetchData(`/sessions?year=${year}&session_type=Race`)
            .then(response => {
                setSessions(response);

                console.log(response[0].session_key)
                if (response.length > 0) {
                    const defaultSession = response[0].session_key; // Assuming the first session is the default
                    setSelectedSession(defaultSession);
                    
                }
            })
            
            .catch(error => console.error("Error fetching sessions:", error));
    }, [year]);

    useEffect(() => {
        if (selectedSession) {
            Promise.all([
                fetchData(`/laps?session_key=${selectedSession}`),
                fetchDriversInfo() // Fetch driver names mapped by their numbers
            ])
            .then(([lapData, driversInfo]) => {
                const maxLapNumber = Math.max(...lapData.map(lap => lap.lap_number));
                const labels = Array.from({ length: maxLapNumber }, (_, i) => `Lap ${i + 1}`);
    
                const drivers = [...new Set(lapData.map(lap => lap.driver_number))];
                const datasets = drivers.map(driverNumber => {
                    const driverLaps = lapData.filter(lap => lap.driver_number === driverNumber);
                    const data = Array.from({ length: maxLapNumber }, (_, i) => {
                        const lap = driverLaps.find(l => l.lap_number === i + 1);
                        return lap ? lap.lap_duration : null;
                    });
    
                    return {
                        label: driversInfo[driverNumber] || `Driver ${driverNumber}`, // Use driver name if available
                        data,
                        borderColor: dynamicBorderColor(driverNumber),
                        tension: 0.4,
                    };
                });
    
                setChartData({
                    labels,
                    datasets,
                });
            })
            .catch(error => console.error("Error fetching lap times or driver info:", error));
        }
    }, [selectedSession]);



    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Lap Time (seconds)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Lap Number'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'right', // Change legend position to the right
                labels: {
                    boxWidth: 10,
                    padding: 20 // Adjust for better spacing and readability
                }
            },

            zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'xy',
                }
              },

              
              
        }
    };


    return (
        <div>
            <div className="mb-4 p-4">

                <div>
                    <label htmlFor="yearSelector">Select :</label>
                    <select id="yearSelector" value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    {/* Add more years as needed */}
                    </select> 
                </div>
               

                <div className='float-child'>
                    <label htmlFor="sessionSelector">Select :</label>
                    <select id="sessionSelector" value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)} disabled={!year}>
                    <option value="">Session</option>
                    {sessions.map(session => (
                        <option key={session.session_key} value={session.session_key}>
                            {session.location} - {session.session_name}
                        </option>
                    ))}
                </select>
                </div>
                
            </div>
           
            {chartData.datasets.length > 0 && (
                <Line data={chartData} options={chartOptions}/>
            )}
        </div>
    );
};

export default LapTimeComparisonGraph;
