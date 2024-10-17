// src/App.tsx
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './components/Layout';
import Plant from './pages/Plant';
import Plants from './pages/Plants';
import CrearPlanta from './pages/crud/CrearPlanta';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || '');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout theme={theme} setTheme={setTheme} />}>
          <Route index element={<Home />} />
          <Route path="/plantas" element={<Plants />} />
          <Route path="/plantas/:id" element={<Plant />} />
        </Route>
        <Route path="/plantas/crear" element={<CrearPlanta />} />
        <Route path="*" element={<MainLayout theme={theme} setTheme={setTheme} />}>
          <Route path='*' element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;

