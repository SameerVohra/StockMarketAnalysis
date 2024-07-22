import React, { useState } from "react";
import Table from "./Table";

const GainLost = () => {
  const [type, setType] = useState<string>("daily");
  const [heading, setHeading] = useState<string>("LOSERS");
  const [exchange, setExchange] = useState<string>("NSE");

  const head: string = heading.toLowerCase();
  const exc: string = exchange.toLowerCase();
  const url: string = `https://stock-analysis-api.vercel.app/${type}-${head}/${exc}`;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              setExchange("NSE");
            }}
            className={`px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
              exchange === "NSE" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-blue-600 border border-blue-600"
            } transition-colors duration-300 transform hover:scale-105`}
          >
            NSE
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setExchange("BSE");
            }}
            className={`px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
              exchange === "BSE" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-blue-600 border border-blue-600"
            } transition-colors duration-300 transform hover:scale-105`}
          >
            BSE
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              setHeading("LOSERS");
            }}
            className={`px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
              heading === "LOSERS" ? "bg-red-600 text-white shadow-lg" : "bg-gray-200 text-red-600 border border-red-600"
            } transition-colors duration-300 transform hover:scale-105`}
          >
            LOSERS
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setHeading("GAINERS");
            }}
            className={`px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
              heading === "GAINERS" ? "bg-green-600 text-white shadow-lg" : "bg-gray-200 text-green-600 border border-green-600"
            } transition-colors duration-300 transform hover:scale-105`}
          >
            GAINERS
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-lg flex justify-center items-center space-x-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setType("daily");
            }}
            className={`px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
              type === "daily"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-blue-500 border border-blue-500"
            } transition-colors duration-300 transform hover:scale-105`}
          >
            Daily
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setType("weekly");
            }}
            className={`px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
              type === "weekly"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-blue-500 border border-blue-500"
            } transition-colors duration-300 transform hover:scale-105`}
          >
            Weekly
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setType("monthly");
            }}
            className={`px-6 py-3 rounded-lg font-medium text-sm sm:text-base ${
              type === "monthly"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-blue-500 border border-blue-500"
            } transition-colors duration-300 transform hover:scale-105`}
          >
            Monthly
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        {exchange} | {heading} | {type}
      </h2>

      <Table url={url} />
    </div>
  );
};

export default GainLost;
