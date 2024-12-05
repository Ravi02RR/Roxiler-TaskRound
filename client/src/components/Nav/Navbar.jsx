import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X, ChartSpline, ChartColumnBig, ChartPie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const NavLinks = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/MonthlyStats', icon: ChartSpline, label: 'MonthlyStats' },
        { to: '/price-range', icon: ChartColumnBig, label: 'PriceRange' },
        { to: '/pieChart', icon: ChartPie, label: 'Chart' }
    ];

    return (
        <>

            <header className="hidden sm:block  w-full bg-white shadow-md z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="font-bold text-2xl text-gray-800 hover:text-blue-600 transition-colors">
                        TaskRound
                    </Link>
                    <nav className="flex space-x-6">
                        {NavLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-2"
                            >
                                <link.icon className="h-5 w-5" />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>


            <div className="sm:hidden fixed bottom-0 left-0 w-full z-50">
               
                <AnimatePresence>
                    {isDrawerOpen && (
                        <motion.div
                            className="fixed inset-x-0 top-0 bg-white/90 backdrop-blur-md h-screen"
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '100%' }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                onClick={toggleDrawer}
                                className="absolute top-6 right-6 text-gray-600 hover:text-gray-900"
                            >
                                <X className="h-8 w-8" />
                            </button>
                            <div className="flex flex-col items-center justify-center h-full space-y-8">
                                {NavLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={toggleDrawer}
                                        className="text-2xl text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-4"
                                    >
                                        <link.icon className="h-7 w-7" />
                                        <span>{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                <motion.div
                    className="container mx-auto px-4 pb-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-white shadow-2xl rounded-full p-2 flex justify-around items-center">
                        {NavLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full"
                            >
                                <link.icon className="h-6 w-6" />
                            </Link>
                        ))}
                        <button
                            onClick={toggleDrawer}
                            className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Navbar;