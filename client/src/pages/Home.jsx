import { useFetch } from "../Hooks/useFetch";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, BarChart, ShoppingCart, Tag } from 'lucide-react';

const Home = () => {
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const { data, loading } = useFetch(`/get-products?page=${page}&searchText=${searchText}`);

    const handlePageChange = (direction) => {
        if (direction === 'prev' && page > 1) {
            setPage(page - 1);
        } else if (direction === 'next' && data?.totalPages > page) {
            setPage(page + 1);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="  rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <BarChart className="h-8 w-8 text-gray-500" />
                        <h1 className="text-2xl font-bold">Transaction Dashboard</h1>
                    </div>
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search transactions"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {data?.data.length > 0 ? (
                            data?.data.map((product) => (
                                <div key={product._id} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col">
                                    <div className="flex-1">
                                        <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                                        <div className="flex justify-center items-center ">
                                            <img className="h-60 w-60 object-contain" src={product.image} alt={product.title} />
                                        </div>
                                        <p className="text-gray-600 mb-4">{product.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-blue-500 font-bold">
                                            <ShoppingCart className="h-5 w-5" />
                                            <span>${product.price}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-500">
                                            <Tag className="h-5 w-5" />
                                            <span>{product.category}</span>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-gray-500">No products found.</p>
                            </div>
                        )}
                    </div>
                )}

                {data?.totalPages > 1 && (
                    <div className="flex justify-center gap-3 mt-6 items-center ">
                        <button
                            className={`bg-gray-100 hover:bg-gray-200 rounded-full p-2 mr-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handlePageChange('prev')}
                            disabled={page === 1}
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-500" />
                        </button>
                        <span className="text-gray-500">{page} of {data?.totalPages}</span>
                        <button
                            className={`bg-gray-100 hover:bg-gray-200 rounded-full p-2 ${page === data.totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handlePageChange('next')}
                            disabled={page === data.totalPages}
                        >
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;