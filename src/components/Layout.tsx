
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import '../App.css';
const MainLayout: React.FC<{ theme: string; setTheme: (theme: string) => void; }> = ({ theme, setTheme }) => {
  return (
    <body className={theme}>
      <Header theme={theme} setTheme={setTheme} />
      <Outlet /> {/* Rutas anidadas se renderizan aquí */}
      <Footer />
    </body>
  );
};

export default MainLayout;
