"use client";
import React, { useState, useEffect } from "react";
import LapTimeComparison from "./components/LapTimeComparisonGraph";
import LapTimeComparisonLive from "./components/LapTimeComparisonGraphLive";
import PitStopStrategyChart from "./components/PitStopStrategyChart";
import TrackOverview from "./components/TrackOverview";
import Usage from "./components/Usage";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  FaSearch,
  FaHome,
  FaMusic,
  FaFilm,
  FaBook,
  FaCog,
  FaHeadset,
  FaUser,
  FaPen,
  FaCircle,
  FaChartLine,
} from "react-icons/fa";
import Divider from "@mui/material/Divider";
import OverviewContent from "./components/OverviewContent";
const Dashboard = () => {
  const [selectedButton, setSelectedButton] = useState("Overview");

  const buttonClass = (graphName) =>
    `flex items-center p-3 w-full text-sm transition duration-300 ease-in-out text-slate-300 ${
      selectedButton === graphName
        ? "text-yellow-500 border-s-4 border-yellow-500" // Active button
        : " hover:bg-slate-600 hover:bg-opacity-35" // Inactive button
    }`;

  const sidebarOption = () => {
    switch (selectedButton) {
      case "Features":
        return <Usage />;
      case "LiveData1":
        return <LapTimeComparisonLive />;
      case "LiveData2":
        return <TrackOverview />;

      case "Historic1":
        return <LapTimeComparison />;
      case "Historic2":
        return <PitStopStrategyChart />;
      default:
        return <Usage />;
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
          <FaBook className="text-current mr-2" />{" "}
          <h1 className="text-left">Guide and Usage</h1>
        </div>

        <Divider className="bg-white m-2" />

        <button
          onClick={() => setSelectedButton("Features")}
          className={buttonClass("Features")}
        >
          Features & Updates
        </button>

        <div className="flex items-center pl-2 pt-5">
          <h1 className="text-left">🎥 Interactive Live Data </h1>
        </div>

        <Divider className="bg-white m-2" />
        <button
          onClick={() => setSelectedButton("LiveData1")}
          className={buttonClass("LiveData1")}
        >
          Race Progress
        </button>
        <button
          onClick={() => setSelectedButton("LiveData2")}
          className={`${buttonClass("LiveData2")}`}
        >
          Track Overview
        </button>

        <div className="flex items-center pl-2 pt-5">
          <h1 className="text-left"> 📊 Historical Data</h1>
        </div>

        <Divider className="bg-white m-2" />
        <button
          onClick={() => setSelectedButton("Historic1")}
          className={buttonClass("Historic1")}
        >
          Lap Time Comparison
        </button>
        <button
          onClick={() => setSelectedButton("Historic2")}
          className={`${buttonClass("Historic2")}`}
        >
          Pit Stop Comparison
        </button>

        <p className="fixed bottom-0 w-full text-left text-xs z-50">
          © 2024 | Created by{" "}
          <a
            href="https://www.linkedin.com/in/jaxon-hornsey/"
            className="text-blue-400 "
          >
            {" "}
            Jaxon Hornsey
          </a>
        </p>
      </aside>
      <p className="fixed bottom-0 w-full text-center pl-52 text-xs">
        Not Affiliated with Official F1
      </p>
      <main className="flex-grow pl-1  pr-5">
        <div
          className={` rounded-3xl max-h-full ${
            selectedButton === "Overview" ||
            selectedButton === "Features" ||
            selectedButton === "LiveData1" ||
            selectedButton === "LiveData2"
              ? "bg-opacity-0"
              : "bg-black bg-opacity-60"
          }`}
          style={{ width: "95%", margin: "0 auto" }}
        >
          {sidebarOption()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
