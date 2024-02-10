import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { fetchData, dynamicBorderColor } from '../utils/api'; // Ensure the path is correct

// Register chart.js components and plugins
Chart.register(...registerables);

    
    


const LapTimeComparisonGraph = () => {

    
    const [year, setYear] = useState('2023');
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const fetchDriversInfo = async () => {1
        const response = await fetchData('/drivers');
        return response.reduce((acc, driver) => {
            acc[driver.driver_number] = driver.last_name;
            return acc;
        }, {});
    };

    useEffect(() => {
        fetchData(`/sessions?year=${year}&session_type=Race`)
            .then(response => {
                setSessions(response);
                if (response.length > 0) {
                    setSelectedSession(response[0].session_key);
                }
            })
            .catch(error => console.error("Error fetching sessions:", error));
    }, [year]);

    useEffect(() => {
        if (selectedSession) {
            Promise.all([
                fetchData(`/laps?session_key=${selectedSession}`),
                fetchDriversInfo()
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
                        label: driversInfo[driverNumber] || `Driver ${driverNumber}`,
                        data,
                        borderColor: dynamicBorderColor(driverNumber),
                        tension: 0.4,
                         hidden: true,
                        
                    };
                });
    
                setChartData({
                    labels,
                    datasets,
                    hidden: true,
                });
            })
            .catch(error => console.error("Error fetching lap times or driver info:", error));
        }
    }, [selectedSession]);

    const chartOptions = {
        responsive: true,
        hidden: true,
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
                position: 'right',
                align : 'start',
                hidden: true,
                labels: {
                    boxWidth: 10,
                    padding: 20
                }
            },
            
        },
    };

    const selectorClass = "mb-3 block w-full p-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500";


    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-center items-center gap-4">
                <div className='flex items-center'>
                    <label htmlFor="yearSelector" className="mr-2 text-sm font-medium text-slate-300 pb-2"> Year:</label>
                    <select id="yearSelector" value={year} onChange={(e) => setYear(e.target.value)} className={selectorClass}>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        {/* Add more years as needed */}
                    </select> 
                </div>
                <div className='flex items-center'>
                    <label htmlFor="sessionSelector" className="mr-2 text-sm font-medium text-slate-300 pb-2">Session:</label>
                    <select id="sessionSelector" value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)} disabled={!year} className={selectorClass}>
                        {sessions.map(session => (
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
