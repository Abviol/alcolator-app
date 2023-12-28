import React, { useEffect, useState } from 'react';
import CalculatorPage from './pages/CalculatorPage';
import { ResultsPage } from './pages/ResultsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ResultsProvider } from './ResultsContext';

function App() {
   return(
      <ResultsProvider>
         <Router>
            <Routes>
               <Route path='/' element={<CalculatorPage />} />
               <Route path='/results' element={<ResultsPage />} />
            </Routes>
         </Router>
      </ResultsProvider>
   )
}

export default App;