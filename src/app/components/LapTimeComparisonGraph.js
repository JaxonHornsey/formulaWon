import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables,Interaction  } from 'chart.js';
import { fetchData, dynamicBorderColor } from '../utils/api'; // Ensure the path is correct
import {CrosshairPlugin,Interpolate} from 'chartjs-plugin-crosshair';


// Register chart.js components and plugins
Chart.register(...registerables,CrosshairPlugin);
Interaction.modes.interpolate = Interpolate
    
    


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

    const orderedDriverNumbers = [1,11,44,63,16,55,4,81,31,10,14,18,,21,3,22,77,24,23,2,20,27];

    useEffect(() => {
        if (selectedSession) {
            Promise.all([
                fetchData(`/laps?session_key=${selectedSession}`),
                fetchDriversInfo()
            ])
            .then(([lapData, driversInfo]) => {
                const maxLapNumber = Math.max(...lapData.map(lap => lap.lap_number));
                const labels = Array.from({ length: maxLapNumber }, (_, i) => `Lap ${i + 1}`);
    
                // Get unique list of driver numbers
                const driverNumbers = [...new Set(lapData.map(lap => lap.driver_number))];
    
                // Sort driver numbers based on predefined order
                driverNumbers.sort((a, b) => {
                    return orderedDriverNumbers.indexOf(a) - orderedDriverNumbers.indexOf(b);
                });
    
                // Map sorted driver numbers to datasets
                const datasets = driverNumbers.map(driverNumber => {
                    const driverLaps = lapData.filter(lap => lap.driver_number === driverNumber);
    
                    // Create data array with nulls for missing laps
                    const data = labels.map((_, index) => {
                        const lap = driverLaps.find(l => l.lap_number === index + 1);
                        return lap ? lap.lap_duration : null;
                    });
    
                    return {
                        label: driversInfo[driverNumber] || `Driver ${driverNumber}`,
                        data,
                        borderColor: dynamicBorderColor(driverNumber),
                        tension: 0.4,
                        hidden: true, // Set to false if you want to show the dataset by default
                    };
                });
    
                setChartData({
                    labels,
                    datasets,
                });
            })
            .catch(error => console.error("Error fetching lap times or driver info:", error));
        }
    }, [selectedSession, orderedDriverNumbers]); 

    const chartOptions = {
        responsive: true,
        hidden: true,
        tooltip: {
            enabled: true,
            mode: 'interpolate',
            intersect: true,
            position: 'average'
        },
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
                rtl: true,
                labels: {
                    boxWidth: 20,
                    padding: 20
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index', // 'index' or 'nearest' may work depending on your needs
                intersect: false,
                position: 'nearest', // Can help with displaying the tooltip when multiple points are close together
                caretSize: 5, // Size of the caret on the tooltip
                 xAlign: 'center', // This can be 'left', 'center', or 'right'
                yAlign: 'center'
            },
            crosshair: {
                line: {
                    color: '#F11',  // Customize crosshair line color
                    width: 0.1        // Customize crosshair line width
                },
                sync: {
                    enabled: false,  // Sync if using multiple charts, disable otherwise
                    group: 1,       // Group index if syncing
                    suppressTooltips: false, // Do not suppress tooltips when syncing
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: false,
            },
            zoom: {
                enabled: false,                                      // enable zooming
                zoomboxBackgroundColor: 'rgba(66,133,244,0.2)',     // background color of zoom box 
                zoomboxBorderColor: '#48F',                         // border color of zoom box
                zoomButtonText: 'Reset Zoom',                       // reset zoom button text
                zoomButtonClass: 'reset-zoom',                      // reset zoom button class
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
