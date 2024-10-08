import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Search from "./Search";

interface CompanyData {
    "52WeekH/L(in Lacs.)": string;
    "Company_Name": string;
    "CurrentPrice": string;
    "DayH/L": string;
    "PercentageChange": string;
    "Previous_Close": string;
    "PriceChange": string;
    "Stock_Exchange": string;
    "Volume": string;
}

const CompanyDashboard = () => {
    const { companyname, exchange } = useParams<{ companyname: string; exchange: string }>();
    const [exc, setExc] = useState<string>(exchange || "NSE");
    const [compData, setCompData] = useState<CompanyData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (url: string, showLoader: boolean) => {
        setLoading(showLoader);
        try {
            const response = await axios.get(url);
            setCompData(response.data.data[0]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const url = `https://stock-analysis-api.vercel.app/company-details/${companyname}/${exc.toLowerCase()}`;

        if (companyname) {
            fetchData(url, true);
        }

        const interval = setInterval(() => {
            if (companyname) {
                console.log(exc.toLowerCase())
                fetchData(url, false);
            }
        }, 3000); 

        return () => clearInterval(interval); 
    }, [companyname, exc]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
                    <p className="ml-4 text-lg">Loading...</p>
                </div>
            ) : (
                <>
                    <Search />
                    <h1 className="text-3xl font-bold mb-4">{compData?.Company_Name}</h1>
                    <div className="m-4">
                        <label htmlFor="exchange" className="block text-lg font-medium mb-2">Select Stock Exchange:</label>
                        <select
                            id="exchange"
                            value={exc}
                            onChange={(e) => setExc(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 text-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                        >
                            <option>--EXCHANGE--</option>
                            <option value="NSE">NSE</option>
                            <option value="BSE">BSE</option>
                        </select>
                    </div>

                    {compData ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
                                <thead>
                                    <tr className="bg-gray-200 border-b border-gray-300">
                                        <th className="py-3 px-6 text-left text-gray-700">Attribute</th>
                                        <th className="py-3 px-6 text-left text-gray-700">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-300">
                                        <td className="py-3 px-6 font-medium text-gray-700">Current Price</td>
                                        <td className="py-3 px-6 text-gray-800">{compData.CurrentPrice}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="py-3 px-6 font-medium text-gray-700">Percentage Change</td>
                                        <td className={`py-3 px-6 ${parseFloat(compData.PercentageChange) < 0 ? 'text-red-500' : 'text-green-400'}`}>{compData.PercentageChange}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="py-3 px-6 font-medium text-gray-700">Previous Close</td>
                                        <td className="py-3 px-6 text-gray-800">{compData.Previous_Close}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="py-3 px-6 font-medium text-gray-700">Price Change</td>
                                        <td className={`py-3 px-6 ${parseFloat(compData.PriceChange) < 0 ? 'text-red-500' : 'text-green-400'}`}>{compData.PriceChange}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="py-3 px-6 font-medium text-gray-700">Stock Exchange</td>
                                        <td className="py-3 px-6 text-gray-800">{compData.Stock_Exchange}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="py-3 px-6 font-medium text-gray-700">Volume</td>
                                        <td className="py-3 px-6 text-gray-800">{compData.Volume}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-700">No data available.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default CompanyDashboard;
