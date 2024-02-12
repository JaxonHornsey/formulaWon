// pages/Dashboard.js
"use client"
import React, { useState, useEffect } from 'react';
import LapTimeComparison from './components/LapTimeComparisonGraph';
import Image from 'next/image'
import dynamic from 'next/dynamic';
const Dashboard = () => {

    const [selectedGraph, setSelectedGraph] = useState('lapTimeComparison');
    
    

    const buttonClass = (graphName) =>
    `mb-2 p-2 w-full text-sm bg-gradient-to-r from-red-900 to bg-red-700 rounded hover:bg-slate-600 transition duration-300 ease-in-out ${
        selectedGraph === graphName ? 'bg-gradient-to-r from-green-900 to bg-green-700 hover:bg-green-600' : 'bg-gradient-to-r from-red-950 to bg-red-700 hover:bg-green-300'
    }`;

    <button
                    onClick={() => setSelectedGraph('lapTimeComparison')}
                    className="mb-2 p-2 w-full text-sm bg-gradient-to-r from-red-900 to bg-red-700 rounded hover:bg-slate-600 transition duration-300 ease-in-out"
                >
                    Lap Time Comparison
                </button>



    const renderGraph = () => {
        switch (selectedGraph) {
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

            <aside className=" p-4 text-white flex flex-col items-center">
                <div className="h-44">
                    <Image
                        src="/images/Won.png"
                        width={250}
                        height={150}
                        alt="Formula Won"
                    />
                </div>

                <button
                    onClick={() => setSelectedGraph('lapTimeComparison')}
                    className={buttonClass('lapTimeComparison')}
                >
                    Lap Time Comparison
                </button>
                <button
                    onClick={() => setSelectedGraph('secondGraph')}
                    className={buttonClass('secondGraph')}
                >
                    Second Graph
                </button>
                <button
                    onClick={() => setSelectedGraph('thirdGraph')}
                    className={buttonClass('thirdGraph')}
                >
                    Third Graph
                </button>

            </aside>

            <main className="flex-grow pl-3 pt-4 pr-5">

                <div className='w-full'>
                    <div className='bg-black bg-opacity-60 rounded-3xl w-full'>
                        {renderGraph()}   
                    </div>
                </div>
                
            </main>
            
        </div>
    );
};

export default Dashboard;
