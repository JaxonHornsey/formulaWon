// pages/Dashboard.js
"use client"
import React, { useState, useEffect } from 'react';
import LapTimeComparison from './components/LapTimeComparisonGraph';
import Image from 'next/image'
import dynamic from 'next/dynamic';
const Dashboard = () => {

    const [selectedButton, setSelectedButton] = useState('Overview');
    
    

    const buttonClass = (graphName) =>
    `p-2 w-full text-sm  hover:bg-slate-600 transition duration-300 ease-in-out  bg-opacity-40 border-opacity-70 ${
        selectedButton === graphName ? 'bg-gradient-to-r from-red-800 to bg-orange-700 hover:bg-orange-700' : 'bg-gradient-to-r from-red-950 to bg-red-900 hover:bg-orange-400 '
    }`;

    const sidebarOption = () => {
        switch (selectedButton) {
            case 'Overview':
                return <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">Project Overview</h2>
                    <br></br>
                    <p >
                        Formula Won Dashboard is a dynamic platform providing real-time and 
                        historical data visualization for Formula 1 races. It offers users the ability to compare lap times, analyze driver performance, and explore various statistics through interactive charts.
                    </p>
                    <br></br>
                    <img src="/images/Won.png" alt="Dashboard Screenshot" className="mb-4" />
                    <h3 className="text-md font-semibold mb-2">How to Use:</h3>
                    <ul className="list-disc list-inside">
                        <li>Select a year to view the available race sessions.</li>
                        <li>Choose a session to display the lap time comparison chart.</li>
                        <li>Hover over the chart data points to see detailed lap times.</li>
                    </ul>
                {/* Add more images or content as needed */}
                </div>
            case 'secondGraph':
                return <h1>Sorry</h1>;
            case 'thirdGraph':
                return <h1>Sorry</h1>;
            case 'lapTimeComparison':
            default:
                return <LapTimeComparison />;
        }
    };

    return (
        
        <div className="flex min-h-screen bg-gradient-to-bl from-slate-900 to bg-red-400">

            <aside className=" text-white flex-none w-72 flex-col items-center bg-black bg-opacity-40 border-r-2 border-opacity-30 border-black ">
                <div className=" p-4 h-44">
                    <Image
                        src="/images/Won.png"
                        width={250}
                        height={150}
                        alt="Formula Won"
                    />
                </div>

                <button 
                    onClick={() => setSelectedButton('Overview')}
                    className={buttonClass('Overview')}
                >
                    <div>
                    Overview
                    </div>
                </button>
                
                <button
                    onClick={() => setSelectedButton('lapTimeComparison')}
                    className={buttonClass('lapTimeComparison')}
                >
                    Lap Time Comparison
                </button>
                <button
                    onClick={() => setSelectedButton('secondGraph')}
                    className={buttonClass('secondGraph')}
                >
                    Second Graph
                </button>
                <button
                    onClick={() => setSelectedButton('thirdGraph')}
                    className={buttonClass('thirdGraph')}
                >
                    Third Graph
                </button>

            </aside>

            <main className="flex-grow pl-1 pt-4 pr-5">

            <div className={`w-11/12 rounded-3xl ${
                selectedButton === 'Overview' ? 'bg-opacity-0' : 'bg-black bg-opacity-60'
            }`}>
                {sidebarOption()}
            </div>
                
            </main>
            
        </div>
    );
};

export default Dashboard;
