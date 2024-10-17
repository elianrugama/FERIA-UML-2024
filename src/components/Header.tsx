
import { useState } from 'react'
import { Link } from 'react-router-dom'
//props: theme, setTheme
type HeaderProps = {
    theme: string,
    setTheme: (theme: string) => void
    }
export default function Header({theme, setTheme}: HeaderProps) {
    const toggleTheme = () => {
        const newTheme = theme === 'dark-theme' ? '' : 'dark-theme'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
      }
      //show menu
      const [showMenu, setShowMenu] = useState('')
  return (
    <>
    <header className="header" id="header">
  <nav className="nav container">
    <Link className="nav__logo"
      to="/">
      <i className="ri-leaf-line nav__logo-icon" /> ECOUML
    </Link>
    <div className={'nav__menu '+showMenu}
     id="nav-menu">
      <ul className="nav__list">
        <li className="nav__item">
          <a href="#home" 
          className="nav__link active-link">
            Inicio
          </a>
        </li>
        <li className="nav__item">
          <a href="#about" className="nav__link">
            Nosotros
          </a>
        </li>
        <li className="nav__item">
          <a href="#products" className="nav__link">
            Nuestras Plantas
          </a>
        </li>
        <li className="nav__item">
          <a href="#faqs" className="nav__link">
            Preguntas Frecuentes
          </a>
        </li>
        <li className="nav__item">
          <a href="#contact" className="nav__link">
            Contáctanos
          </a>
        </li>
      </ul>
      <div className="nav__close" id="nav-close"
         onClick={() => setShowMenu('')}>
        <i className="ri-close-line" />
      </div>
    </div>
    <div className="nav__btns">
      {/* Botón para cambiar el tema */}
      {/* Agregar la clase dark-theme si el tema es dark */}
      
      <i className={`change-theme ${theme === 'dark-theme' ? 'ri-sun-line' : 'ri-moon-line'}`}
       id="theme-button" onClick={toggleTheme} />

      <div className="nav__toggle" id="nav-toggle"
         onClick={() => setShowMenu(showMenu === '' ? 'show-menu' : '')}>
        <i className="ri-menu-line" />
      </div>
    </div>
  </nav>
</header>
</>
  )
}
