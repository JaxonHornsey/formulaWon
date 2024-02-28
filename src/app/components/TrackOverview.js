// Usage.js
import React from "react";
import Image from "next/image";

const TrackOverview = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black bg-opacity-60 p-8 rounded-3xl max-w-3xl w-11/12 m-4">
        <h1 className="text-stone-100 text-4xl text-center mb-4">
          🔴 No Live Race 🔴
        </h1>

        <div className="flex justify-center pt-14">
          <Image
            src="/images/Won.png"
            width={250}
            height={150}
            alt="Formula Won"
          />
        </div>
        <h2 className="text-stone-100 text-2xl text-center mb-8">
          🏁 Check Back During Sunday Racetime 🏁
        </h2>
      </div>
    </div>
  );
};

export default TrackOverview;
