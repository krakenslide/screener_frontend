import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Download, ExternalLink, Server, CheckCircle, XCircle } from 'lucide-react';

const HomePage = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'online', 'offline'
    const [serverCheckCount, setServerCheckCount] = useState(0);

    // Function to check server health
    const checkServerHealth = async () => {
        try {
            setServerStatus('checking');
            const response = await fetch('https://screener-apis.onrender.com/health');
            if (response.ok) {
                setServerStatus('online');
                return true;
            } else {
                setServerStatus('offline');
                setServerCheckCount(prev => prev + 1);
                return false;
            }
        } catch (error) {
            if (error instanceof Error) {
                setServerStatus('offline');
                setServerCheckCount(prev => prev + 1);
                return false;
            } else {
                // Handle cases where the error is not an instance of Error
                console.error('An unknown error occurred');
                return false;
            }
        }

    };

    // Run health check on mount and set up polling if necessary
    useEffect(() => {
        let intervalId: number | null = null;
        const initiateHealthCheck = async () => {
            const success = await checkServerHealth();
            if (!success) {
                // Poll every 30 seconds until the server is up
                intervalId = setInterval(async () => {
                    const pollSuccess = await checkServerHealth();
                    if (pollSuccess) {
                        if (intervalId !== null) clearInterval(intervalId);
                    }
                }, 30000);
            }
        };

        initiateHealthCheck();

        return () => {
            if (intervalId !== null) clearInterval(intervalId);
        };
    }, []);

    // Download handler
    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const response = await fetch('https://screener-apis.onrender.com/export-excel');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'screener-data.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    const serverStatusDisplay = () => {
        switch (serverStatus) {
            case 'checking':
                return (
                    <div className="flex items-center space-x-2 text-blue-400">
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        <span className="text-sm md:text-base">Checking server status...</span>
                    </div>
                );
            case 'online':
                return (
                    <div className="flex items-center space-x-2 text-green-400">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">Server is online</span>
                    </div>
                );
            case 'offline':
                return (
                    <div className="flex items-center space-x-2 text-red-400">
                        <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">
                            Server is starting up
                            {serverCheckCount > 0 && ` (Check ${serverCheckCount})`}
                        </span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid slice"
                        className="w-full h-full"
                    >
                        <defs>
                            <radialGradient
                                id="Gradient1"
                                cx="50%"
                                cy="50%"
                                fx="0.441602%"
                                fy="50%"
                                r=".5"
                            >
                                <animate
                                    attributeName="fx"
                                    dur="34s"
                                    values="0%;3%;0%"
                                    repeatCount="indefinite"
                                />
                                <stop offset="0%" stopColor="rgba(255, 0, 255, 1)" />
                                <stop offset="100%" stopColor="rgba(255, 0, 255, 0)" />
                            </radialGradient>
                            <radialGradient
                                id="Gradient2"
                                cx="50%"
                                cy="50%"
                                fx="2.68147%"
                                fy="50%"
                                r=".5"
                            >
                                <animate
                                    attributeName="fx"
                                    dur="23.5s"
                                    values="0%;3%;0%"
                                    repeatCount="indefinite"
                                />
                                <stop offset="0%" stopColor="rgba(255, 255, 0, 1)" />
                                <stop offset="100%" stopColor="rgba(255, 255, 0, 0)" />
                            </radialGradient>
                            <radialGradient
                                id="Gradient3"
                                cx="50%"
                                cy="50%"
                                fx="0.836536%"
                                fy="50%"
                                r=".5"
                            >
                                <animate
                                    attributeName="fx"
                                    dur="21.5s"
                                    values="0%;3%;0%"
                                    repeatCount="indefinite"
                                />
                                <stop offset="0%" stopColor="rgba(0, 255, 255, 1)" />
                                <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
                            </radialGradient>
                        </defs>
                        <rect
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            fill="url(#Gradient1)"
                        >
                            <animate
                                attributeName="x"
                                dur="20s"
                                values="25;0;25"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="y"
                                dur="21s"
                                values="0;25;0"
                                repeatCount="indefinite"
                            />
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 50 50"
                                to="360 50 50"
                                dur="17s"
                                repeatCount="indefinite"
                            />
                        </rect>
                        <rect
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            fill="url(#Gradient2)"
                        >
                            <animate
                                attributeName="x"
                                dur="23s"
                                values="0;-25;0"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="y"
                                dur="24s"
                                values="25;-25;25"
                                repeatCount="indefinite"
                            />
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 50 50"
                                to="360 50 50"
                                dur="18s"
                                repeatCount="indefinite"
                            />
                        </rect>
                        <rect
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            fill="url(#Gradient3)"
                        >
                            <animate
                                attributeName="x"
                                dur="25s"
                                values="-25;0;-25"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="y"
                                dur="26s"
                                values="0;-25;0"
                                repeatCount="indefinite"
                            />
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="360 50 50"
                                to="0 50 50"
                                dur="19s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </svg>
                </div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="pt-12 md:pt-20 pb-8 md:pb-12 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Screener Export
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl font-light text-gray-300 max-w-2xl mx-auto px-2">
                            Export your curated financial data into beautiful, ready-to-analyze spreadsheets.
                        </p>
                    </motion.div>
                </header>

                {/* Server Status Display */}
                <div className="flex justify-center mb-6 md:mb-8">
                    <motion.div
                        className="bg-gray-800/50 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-gray-700/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {serverStatusDisplay()}
                    </motion.div>
                </div>

                {/* Main Content */}
                <main className="container mx-auto px-4 mb-12 md:mb-16">
                    {/* Key change: Grid is 1 column on mobile, 3 columns on medium screens and up */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    >
                        {/* Step Cards */}
                        {[
                            {
                                step: 1,
                                title: "Login to Screener",
                                icon: <ExternalLink className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4" />,
                                description: "Visit the following URL and log in with your credentials:",
                                action: (
                                    <a
                                        href="https://www.screener.in/watchlist/7934514/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 md:mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group text-sm md:text-base"
                                    >
                                        <span className="truncate">screener.in/watchlist/7934514</span>
                                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                )
                            },
                            {
                                step: 2,
                                title: "Select Companies",
                                icon: <Server className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4" />,
                                description: "Customize the watchlist by setting your preferred criteria and selecting companies of interest."
                            },
                            {
                                step: 3,
                                title: "Export Data",
                                icon: <Download className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4" />,
                                description: "Click the download button below to get your data in a formatted Excel spreadsheet."
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl md:rounded-2xl p-5 md:p-6 overflow-hidden relative group"
                                whileHover={{ y: -3 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Background accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                                {/* Content */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="text-indigo-400">{step.icon}</div>
                                    <div className="flex items-center mb-2 md:mb-3">
                                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-500 flex items-center justify-center mr-2 text-xs font-medium">
                                            {step.step}
                                        </div>
                                        <h2 className="text-lg md:text-xl font-semibold">{step.title}</h2>
                                    </div>
                                    <p className="text-sm md:text-base text-gray-400">{step.description}</p>
                                    {step.action}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Download Button */}
                    <motion.div
                        className="text-center mt-8 md:mt-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            {serverStatus === 'online' ? (
                                <motion.button
                                    key="download-button"
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className={`relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 
                  py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 
                  focus:ring-opacity-50 shadow-lg shadow-indigo-900/30 
                  overflow-hidden transition-all duration-300 transform hover:scale-105 
                  ${isDownloading ? 'opacity-90' : 'opacity-100'}`}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className={`flex items-center justify-center space-x-2 ${isDownloading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                                        <Download className="w-4 h-4 md:w-5 md:h-5" />
                                        <span>Download Excel</span>
                                    </span>

                                    {isDownloading && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                                            <span>Downloading...</span>
                                        </span>
                                    )}
                                </motion.button>
                            ) : (
                                <motion.button
                                    key="disabled-button"
                                    disabled
                                    className="bg-gray-700 py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl text-base md:text-lg font-medium focus:outline-none shadow-lg opacity-70 cursor-not-allowed"
                                >
                                    <span className="flex items-center justify-center space-x-2">
                                        <Server className="w-4 h-4 md:w-5 md:h-5" />
                                        <span>Waiting for server...</span>
                                    </span>
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {serverStatus === 'offline' && (
                            <motion.p
                                className="text-gray-400 mt-3 md:mt-4 text-xs md:text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                The server is starting up. This may take up to 60 seconds.
                            </motion.p>
                        )}
                    </motion.div>
                </main>

                {/* Footer */}
                <footer className="py-4 md:py-6 text-center text-gray-500 border-t border-gray-800/50 text-xs md:text-sm">
                    <div className="container mx-auto px-4">
                        <p>&copy; {new Date().getFullYear()} Screener Export. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;