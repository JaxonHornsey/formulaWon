// pages/Dashboard.js
"use client"
import React from 'react';
import LapTimeComparison from './components/LapTimeComparisonGraph';
import Image from 'next/image'
import dynamic from 'next/dynamic';


const Dashboard = () => {

    
    return (
        
        <div className="flex min-h-screen bg-gradient-to-bl from-slate-900 to bg-red-400">

<aside >
                <div className='pt-5'>
                
                <Image
                    src="/images/Won.png"
                    width={250}
                    height={150}
                    alt="Picture of the author"
                    />
                </div>
               
                    
                <div className='p-4 justify-center items-center '>
 
                   
                </div>
            </aside>







            <main className="flex-grow  pt-4">
                <div className=''>
                    <div className='bg-black bg-opacity-60 rounded-3xl w-11/12'>
                        <LapTimeComparison />   
                    </div>
                </div>
                
               
            </main>
            
        </div>
    );
};

export default Dashboard;
