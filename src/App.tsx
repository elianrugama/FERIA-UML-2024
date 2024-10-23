// src/App.tsx
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Plant from './pages/Plant';
import Plants from './pages/Plants';
import CrearPlanta from './pages/crud/CrearPlanta';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import EditarPlanta from './pages/crud/EditarPlanta';
const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || '');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <HashRouter>
      <body className={theme}>
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        
        <Route index element={<Home />} />
        <Route path="/plantas" element={<Plants />} />
        <Route path="/plantas/:id" element={<Plant />} />

        <Route path="/plantas/crear" element={<CrearPlanta />} />
        <Route path="/plantas/editar/:id" element={<EditarPlanta />} />

        <Route path='*' element={<Home />} />
        

      </Routes>
      <Footer />
      </body>
    </HashRouter>
  );
};

export default App;

