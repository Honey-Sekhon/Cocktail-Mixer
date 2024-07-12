import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CocktailsPage from './pages/CocktailsPage';
import PreparationPage from './pages/PreparationPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cocktails" element={<CocktailsPage />} />
        <Route path="/preparation" element={<PreparationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
