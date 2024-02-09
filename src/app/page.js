// pages/Dashboard.js
"use client"
import React from 'react';
import LapTimeComparison from './components/LapTimeComparisonGraph';
import Image from 'next/image'


const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gradient-to-bl from-slate-900 to bg-red-400">
            <main className="flex-grow  p-5">
                <div className='pt-10'>
                    <div className='bg-black bg-opacity-60 rounded-3xl w-full'>
                        <LapTimeComparison />   
                    </div>
                </div>
                
               
            </main>
            <aside className="w-1/5 overflow-y-auto pt-3">
                <div className='pr-8'>
                
                <Image
                    src="/images/FormulaWon.png"
                    width={600}
                    height={300}
                    alt="Picture of the author"
                    className="rounded-image"
                    />
                </div>
               
                    
                <div className='p-4 justify-center items-center '>
 
                   
                </div>
            </aside>
        </div>
    );
};

export default Dashboard;
