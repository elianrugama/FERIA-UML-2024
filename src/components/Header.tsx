import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

type HeaderProps = {
  theme: string,
  setTheme: (theme: string) => void
}

export default function Header({ theme, setTheme }: HeaderProps) {
  const toggleTheme = () => {
    const newTheme = theme === 'dark-theme' ? '' : 'dark-theme'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Show menu state
  const [showMenu, setShowMenu] = useState('')
  const location = useLocation()

  // State to track the active link
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    // Set the active link based on the hash
    setActiveLink(location.pathname)
    console.log(location.pathname)
  }, [location])

  return (
    <>
      <header className="header" id="header">
        <nav className="nav container">
         
          <Link className="nav__logo" to="/">
            <img src="/src/assets/img/Logotipo horizonta/Logotipo horizontal/Original PNG.png" alt="Logo"
              style={{ maxWidth: '100px' }}
            />
          </Link>
          {/*
          <Link className="nav__logo" to="/">
            <i className="ri-leaf-line nav__logo-icon" /> ECOUML
          </Link>
           */}
          

          <div className={`nav__menu ${showMenu}`} id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home"
                  className={`nav__link ${activeLink === '/' || activeLink === '/home' ? 'active-link' : ''}`}
                >
                  Inicio
                </a>


              </li>
              <li className="nav__item">
                <a href="#about" className={`nav__link ${activeLink === '/about' ? 'active-link' : ''}`}>
                  Nosotros
                </a>
              </li>
              <li className="nav__item">
                <a href="#plants" className={`nav__link ${activeLink === '/plants' ? 'active-link' : ''}`}>
                  Nuestras Plantas
                </a>
              </li>
              <li className="nav__item">
                <a href="#faqs" className={`nav__link ${activeLink === '/faqs' ? 'active-link' : ''}`}>
                  Preguntas Frecuentes
                </a>
              </li>
              <li className="nav__item">
                <a href="#footer" className={`nav__link ${activeLink === '/footer' ? 'active-link' : ''}`}>
                  Contáctanos
                </a>
              </li>
            </ul>

            <div className="nav__close" id="nav-close" onClick={() => setShowMenu('')}>
              <i className="ri-close-line" />
            </div>
          </div>

          <div className="nav__btns">
            {/* Botón para cambiar el tema */}
            <i
              className={`change-theme ${theme === 'dark-theme' ? 'ri-sun-line' : 'ri-moon-line'}`}
              id="theme-button"
              onClick={toggleTheme}
            />

            <div className="nav__toggle" id="nav-toggle" onClick={() => setShowMenu(showMenu === '' ? 'show-menu' : '')}>
              <i className="ri-menu-line" />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
