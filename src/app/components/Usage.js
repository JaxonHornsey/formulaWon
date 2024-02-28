// Usage.js
import React from "react";
import Image from "next/image";

const Usage = () => {
  return (
    <div className="flex justify-center items-center pt-40 ">
      <div class="flex justify-between space-x-4">
        <div class="flex-1 bg-black bg-opacity-60 p-8 rounded-lg max-w-3xl text-gray-200">
          <h1 class="text-3xl font-bold mb-4">Features</h1>
          <ul class="list-disc pl-5">
            <li className="text-white">
              Race Progress (Live){" "}
              <p className="text-xs text-gray-300">
                {" "}
                Real-time tracking of race progress with dynamic updates.
              </p>
            </li>
            <li className="text-white">
              Live Track Overview (Live){" "}
              <p className="text-xs text-gray-300">
                A live overview of the track showing the current positions and
                movements of drivers.
              </p>
            </li>

            <li className="text-white">
              Lap Time Comparison{" "}
              <p className="text-xs text-gray-300">
                Analyze and compare lap times between drivers to gauge
                performance.
              </p>
            </li>
            <li className="text-white">
              Pit Stop Comparison{" "}
              <p className="text-xs text-gray-300">
                {" "}
                Detailed comparisons of pit stop strategies and execution times.
              </p>
            </li>
            <br />

            <p className="text-xs text-gray-300">
              {" "}
              Graph features include zoom, pan, and legend with driver selection
            </p>
            <br />
            <li className="text-white">
              Qualifying Prediction (Soon){" "}
              <p className="text-xs text-gray-300">
                Predictive analytics for qualifying sessions, offering insights
                into potential qualifying outcomes.{" "}
              </p>
            </li>
            <li className="text-white">
              Race Prediction (Soon)
              <p className="text-xs text-gray-300">
                Advanced models to forecast race outcomes based on current and
                historical data.{" "}
              </p>{" "}
            </li>
          </ul>
        </div>

        <div class="flex-1 bg-black bg-opacity-60 p-8 rounded-lg max-w-3xl text-white">
          <h1 class="text-3xl font-bold mb-4">Updates</h1>
          <ul class="list-disc pl-5 pt-3">
            <li>
              More Infographics{" "}
              <p className="text-xs text-gray-300">
                {" "}
                <li>Enhanced Charting Capabilities</li>
                <li>New Data Visualization Tools</li>
                <li>Expanded Live Tracking Features</li>
                <li>Historical Data Comparisons </li>
              </p>
            </li>
            <br />
            <li>
              AI Model Enhancements{" "}
              <p className="text-xs text-gray-300">
                {" "}
                <li>Implement new prediction models</li>
                <li>Add to Live Tracking Features</li>
              </p>
            </li>
            <br />
            <li>
              User Interface Improvements{" "}
              <p className="text-xs text-gray-300">
                {" "}
                <li>Enhanced Responsiveness</li>
                <li>
                  Continual enhancements to the user experience and design.
                </li>
              </p>
            </li>
          </ul>
        </div>

        <div class="flex-1 bg-black bg-opacity-60 p-8 rounded-lg max-w-3xl text-white">
          <h1 class="text-2xl font-bold mb-4">Inspiration & Acknowledgments</h1>
          <p class="mb-4 text-sm pt-6">
            Formula Won is an open-source project for formula 1 fans to view and
            analyze data about current and previous sessions.
            <br /> <br />
            Formula Won offers live infographics and race prediction analysis
            for both live and historic sessions, providing fans with insights
            and data that enrich the Formula One viewing experience.
            <br /> <br />
            Special thanks to the{" "}
            <a href="https://openf1.org/" className="text-blue-300">
              openf1{" "}
            </a>{" "}
            api for providing the data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Usage;
