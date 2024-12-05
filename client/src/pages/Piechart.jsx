/* eslint-disable react/prop-types */

import { useFetch } from "../Hooks/useFetch";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Piechart = () => {
    const currentYear = new Date().getFullYear();
   

 
    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
        '#8884D8', '#FF6384', '#36A2EB', '#FFCE56'
    ];

    
    const { data, loading, error } = useFetch(
        `/get-unique-categories`,
        {}
    );

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <p className="font-bold">{payload[0].name}</p>

                    <p>Items: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                <span className="ml-3 text-gray-600">Loading categories...</span>
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

    return (
        <div className="p-6">
           

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Category </h2>
               
            </div>

            {(!data || data.length === 0) ? (
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
                    No category data available for  {currentYear}
                </div>
            ) : (
                <div className="w-full h-[400px] ">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="count"
                                nameKey="category"
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                         key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            
                        </PieChart>
                        
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default Piechart;