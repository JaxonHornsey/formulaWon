// pages/Dashboard.js
"use client"
import React, { useState, useEffect } from 'react';
import LapTimeComparison from './components/LapTimeComparisonGraph';
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { FaSearch, FaHome, FaMusic, FaFilm, FaBook, FaCog, FaHeadset, FaUser, FaPen, FaCircle, FaChartLine } from 'react-icons/fa';
import Divider from '@mui/material/Divider';
import OverviewContent from './components/OverviewContent';
const Dashboard = () => {

    const [selectedButton, setSelectedButton] = useState('Overview');
    
    

    const buttonClass = (graphName) =>
    `flex items-center p-3 w-full text-sm transition duration-300 ease-in-out text-slate-300 ${
        selectedButton === graphName 
            ? 'text-yellow-500 border-s-4 border-yellow-500' // Active button text turns yellow
            : ' hover:bg-slate-600 hover:bg-opacity-35' // Inactive button with gray text
    }`;


    const sidebarOption = () => {
        switch (selectedButton) {
            case 'Overview':
                return <OverviewContent />;
            case 'Features':
                return ;
            case 'LiveData1':
                return ;
            case 'LiveData2':
                return ;
            case 'LiveData3':
                return ;
            case 'Historic1':
                return <LapTimeComparison />;
            case 'Historic2':
                return ;
            case 'Historic3':
                return ;

            default:
                return <LapTimeComparison />;
        }
    };

    return (
        
        <div className="flex min-h-screen bg-gradient-to-bl from-slate-900 to bg-red-400">

            <aside className=" text-white flex-none w-56 flex-col items-center bg-black bg-opacity-80">
                <div className=" p-8 h-44">
                    <Image
                        src="/images/Won.png"
                        width={250}
                        height={150}
                        alt="Formula Won"
                    />
                </div>

                
                <div className="flex items-center pl-2">
                    <FaBook className="text-current mr-2" /> {/* Adjust the size, color, and margins as needed */}
                    <h1 className="text-left">Guide and Usage</h1>
                </div>

                <Divider className='bg-white m-2'/>

                <button 
                    onClick={() => setSelectedButton('Overview')}
                    className={buttonClass('Overview')}
                >

                <FaHome className="mr-2" /> How to use
                </button>
                
                <button 
                    onClick={() => setSelectedButton('Features')}
                    className={buttonClass('Features')}
                >
                    <FaPen className="mr-2" /> Features & Updates
                </button>
                
                <div className="flex items-center pl-2 pt-10">
                    <FaHeadset className="text-current mr-2" /> {/* Adjust the size, color, and margins as needed */}
                    <h1 className="text-left">Interactive Live Data</h1>
                </div>

                <Divider className='bg-white m-2'/>
                <button
                    onClick={() => setSelectedButton('LiveData1')}
                    className={buttonClass('LiveData1')}
                >
                      First Graph
                </button>
                <button
                    onClick={() => setSelectedButton('LiveData2')}
                    className={`${buttonClass('LiveData2')}`}
                >
                     Second Graph
                </button>
                <button
                    onClick={() => setSelectedButton('LiveData3')}
                    className={buttonClass('LiveData3')}
                >
                    Third Graph
                </button>


                <div className="flex items-center pl-2 pt-10">
                    <FaSearch className="text-current mr-2" /> {/* Adjust the size, color, and margins as needed */}
                    <h1 className="text-left">Historical Data</h1>
                </div>

                <Divider className='bg-white m-2'/>
                <button
                    onClick={() => setSelectedButton('Historic1')}
                    className={buttonClass('Historic1')}
                >
                      Lap Time Comparison
                </button>
                <button
                    onClick={() => setSelectedButton('Historic2')}
                    className={`${buttonClass('Historic2')}`}
                >
                     Second Graph
                </button>
                <button
                    onClick={() => setSelectedButton('Historic3')}
                    className={buttonClass('Historic3')}
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