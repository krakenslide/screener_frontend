import React from 'react';
import { Routes, Route } from "react-router-dom";  // Corrected from Routers to Routes
import HomePage from "./Pages/HomePage.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default App;
