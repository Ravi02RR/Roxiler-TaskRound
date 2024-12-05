import { useFetch } from "../Hooks/useFetch";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

const MonthlyStats = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [yearInput, setYearInput] = useState(new Date().getFullYear().toString());

    const { data, loading, error } = useFetch(`/get-stats?month=${selectedMonth}&year=${selectedYear}`);
    useEffect(() => { }, [selectedMonth, selectedYear]);

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        const inputYear = e.target.value;
        setYearInput(inputYear);


        const parsedYear = parseInt(inputYear);
        if (!isNaN(parsedYear) && parsedYear > 0) {
            setSelectedYear(parsedYear);
        }
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="container mx-auto py-8">
            <div className="  rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Monthly Stats</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative flex items-center space-x-2">

                            <select
                                className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={index + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>


                            <input
                                type="text"
                                className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={yearInput}
                                onChange={handleYearChange}
                                placeholder="Year"
                            />

                            <div className="absolute right-2 pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 font-medium">
                        Error: {error.message}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h2 className="text-lg font-bold mb-2">Total Sale Amount</h2>
                            <p className="text-4xl font-bold text-blue-500">
                                ${data?.totalSaleAmount.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h2 className="text-lg font-bold mb-2">Total Sold Items</h2>
                            <p className="text-4xl font-bold text-green-500">
                                {data?.totalSoldItems.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h2 className="text-lg font-bold mb-2">Total Not Sold Items</h2>
                            <p className="text-4xl font-bold text-red-500">
                                {data?.totalNotSoldItems.toLocaleString()}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonthlyStats;