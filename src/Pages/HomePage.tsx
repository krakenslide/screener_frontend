import React, { useState, useEffect } from 'react';

const HomePage = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [serverUp, setServerUp] = useState(false);
    const [healthMessage, setHealthMessage] = useState('Checking server status...');

    // Function to check server health
    const checkServerHealth = async () => {
        try {
            const response = await fetch('https://screener-apis.onrender.com/health');
            if (response.ok) {
                setServerUp(true);
                setHealthMessage('Server is up');
                return true;
            } else {
                setServerUp(false);
                setHealthMessage('Server is down, Booting up server');
                return false;
            }
        } catch (error) {
            setServerUp(false);
            setHealthMessage('Server is down, Booting up server');
            return false;
        }
    };

    // Run health check on mount and set up polling if necessary
    useEffect(() => {
        let intervalId;

        const initiateHealthCheck = async () => {
            const success = await checkServerHealth();
            if (!success) {
                // Poll every 30 seconds until the server is up
                intervalId = setInterval(async () => {
                    const pollSuccess = await checkServerHealth();
                    if (pollSuccess) {
                        clearInterval(intervalId);
                    }
                }, 30000);
            }
        };

        initiateHealthCheck();

        return () => {
            if (intervalId) clearInterval(intervalId);
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

    return (
        <div className="min-h-screen bg-gray-800 text-gray-200 flex flex-col">
            {/* Header */}
            <header className="py-16 text-center px-4">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
                    Screener Export
                </h1>
                <p className="text-lg sm:text-2xl font-light text-gray-400">
                    Export your curated data in one seamless click.
                </p>
            </header>

            {/* Server Health Message */}
            <div className="text-center mb-4">
                <p className={`text-lg ${serverUp ? 'text-green-500' : 'text-red-500'}`}>
                    {healthMessage}
                </p>
            </div>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
                    {/* Step 1: Visit URL & Login */}
                    <div className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-700">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Step 1</h2>
                        <p className="text-base sm:text-lg text-gray-400 mb-2">
                            Visit the following URL:
                        </p>
                        <a
                            href="https://www.screener.in/watchlist/7934514/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:underline break-all"
                        >
                            https://www.screener.in/watchlist/7934514/
                        </a>
                        <p className="text-base sm:text-lg text-gray-400 mt-4">
                            Please log in using the developer's email and password.
                        </p>
                    </div>

                    {/* Step 2: Choose companies */}
                    <div className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-700">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Step 2</h2>
                        <p className="text-base sm:text-lg text-gray-400">
                            Select your preferred companies and set your criteria.
                        </p>
                    </div>

                    {/* Step 3: Download Excel */}
                    <div className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-700">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Step 3</h2>
                        <p className="text-base sm:text-lg text-gray-400">
                            Instantly download your customized Excel file.
                        </p>
                    </div>
                </section>

                {/* Download Button */}
                <div className="text-center mb-12">
                    <button
                        onClick={handleDownload}
                        disabled={!serverUp || isDownloading}
                        className={`bg-indigo-700 hover:bg-indigo-600 transition-colors py-3 px-10 rounded-full text-lg font-medium focus:outline-none ${
                            (!serverUp || isDownloading) && 'opacity-50 cursor-not-allowed'
                        }`}
                    >
                        {isDownloading ? 'Downloading...' : 'Download Excel'}
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-500 border-t border-gray-700">
                &copy; {new Date().getFullYear()} Screener Export. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
