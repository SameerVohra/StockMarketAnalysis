import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface TableProps {
  exchange: string;
  url: string;
}

interface StockData {
  company: string;
  Current_Price: string;
  Previous_Price: string;
  Change: string;
}

const Table: React.FC<TableProps> = ({ url, exchange }) => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const stocksPerPage = 100;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        const data = response.data;

        let combinedData: StockData[] = [];
        for (const key in data) {
          if (Array.isArray(data[key])) {
            combinedData = combinedData.concat(data[key]);
          }
        }

        setStocks(combinedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const handleDetails = (company: string) => {
    navigate(`/${company}/${exchange}/details`);
  };

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(stocks.length / stocksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          <p className="ml-4 text-lg">Loading...</p>
        </div>
      ) : (
        <>
          <div className="m-4 flex justify-center space-x-2 flex-wrap gap-4">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 border rounded ${
                  number === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500 border-blue-500"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-200">
                    Sr. No.
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">
                    Company Name
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">
                    Current Price
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">
                    Previous Price
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200">
                    Percentage Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStocks.map((stock, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border-b border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <button
                        onClick={() => handleDetails(stock.company)}
                        className="text-blue-500 hover:underline"
                      >
                        {stock.company}
                      </button>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {stock.Current_Price}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {stock.Previous_Price}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {stock.Change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="m-4 flex justify-center space-x-2 flex-wrap gap-4">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border rounded ${
                    number === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 border-blue-500"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
