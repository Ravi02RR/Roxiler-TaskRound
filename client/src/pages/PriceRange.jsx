import { useState } from 'react';
import { useFetch } from "../Hooks/useFetch";
import { Calendar, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';

const PriceRange = () => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(2022);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [yearError, setYearError] = useState('');

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
    ];

    const { data, loading, error } = useFetch(`/get-price-range-stats?month=${selectedMonth}&year=${selectedYear}`, [selectedMonth, selectedYear]);

    const handleYearChange = (e) => {
        const inputYear = e.target.value;


        const numericYear = inputYear.replace(/\D/g, '');
        setSelectedYear(numericYear);


        if (numericYear === '') {
            setYearError('Year cannot be empty');
        } else if (numericYear.length > 4) {
            setYearError('Year must be 4 digits');
            setSelectedYear(numericYear.slice(0, 4));
        } else if (parseInt(numericYear) < 1900 || parseInt(numericYear) > currentYear) {
            setYearError(`Year must be between 1900 and ${currentYear}`);
        } else {
            setYearError('');
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                <span className="ml-3 text-gray-600">Loading chart...</span>
            </div>
        );
    }


    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-500 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error.message}</span>
            </div>
        );
    }


    const priceRangeData = data?.priceRangeCounts || [];

    return (
        <div className=" p-6">

            <div className="grid grid-cols-2 gap-4 mb-6">

                <div>
                    <label
                        htmlFor="year-input"
                        className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                    >
                        <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                        Year
                    </label>
                    <input
                        id="year-input"
                        type="text"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${yearError
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        placeholder="Enter year"
                        maxLength={4}
                    />
                    {yearError && (
                        <div className="mt-1 flex items-center text-red-500 text-sm">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            {yearError}
                        </div>
                    )}
                </div>


                <div>
                    <label
                        htmlFor="month-select"
                        className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                    >
                        <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                        Month
                    </label>
                    <select
                        id="month-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {months.map((monthOption) => (
                            <option key={monthOption.value} value={monthOption.value}>
                                {monthOption.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Price Range </h2>
                <span className="text-sm text-gray-500">
                    {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
                </span>
            </div>

            {priceRangeData.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-300 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7 20l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        />
                    </svg>
                    No data available for {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={650}>
                    <BarChart
                        data={priceRangeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                        />
                        <XAxis
                            dataKey="range"
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={10}
                            stroke="#888888"
                        />
                        <YAxis
                            label={{
                                value: 'Number of Items',
                                angle: -90,
                                position: 'insideLeft',
                                offset: -10,
                                fill: "#888888"
                            }}
                            stroke="#888888"
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                            contentStyle={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Bar
                            dataKey="count"
                            fill="#3B82F6"
                            barSize={40}
                            radius={[4, 4, 0, 0]}
                        >
                            <LabelList
                                dataKey="count"
                                position="top"
                                fill="#555"
                                fontSize={10}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default PriceRange;