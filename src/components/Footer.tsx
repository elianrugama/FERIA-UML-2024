

const Footer = () => {
    return (
        <>
            <footer className="footer section" id="footer">
                <div className="footer__container container grid">
                    <div className="footer__content">
                        <a href="#" className="footer__logo">
                            <i className="ri-leaf-line footer__logo-icon" /> ECOUML
                        </a>
                        <h3 className="footer__title">
                            Suscríbete a nuestro boletín <br /> para estar al día
                        </h3>
                        <div className="footer__subscribe">
                            
                            <input
                                type="email"
                                placeholder="Ingresa tu correo"
                                className="footer__input"
                            />
                            <a className="button button--flex footer__button"
                                href="/">
                                Suscribirse
                                <i className="ri-arrow-right-up-line button__icon" />
                            </a>
                        </div>
                    </div>
                    <div className="footer__content">
                        <h3 className="footer__title">Nuestra dirección</h3>
                        <ul className="footer__data">
                            <li className="footer__information">Km 10.8 Carretera vieja a León, 200 mts al norte. </li>
                            <li className="footer__information">200 mts al norte.</li>
                            <li className="footer__information">Managua, Nicaragua</li>
                            
                        </ul>
                    </div>
                    <div className="footer__content">
                        <h3 className="footer__title">Contáctanos</h3>
                        <ul className="footer__data">
                            <li className="footer__information">+505 2265 4938</li>
                            <div className="footer__social">
                                <a href="https://www.facebook.com/"
                                 className="footer__social-link">
                                    <i className="ri-facebook-fill" />
                                </a>
                                <a href="http://www.uml.edu.ni/"
                                
                                 className="footer__social-link">
                                    <i className="ri-global-line" />
                                </a>
                                <a href="mailto:mercadeo@uml.edu.ni"
                                target="_blank"
                                className="footer__social-link">
                                    <i className="ri-mail-line" />
                                </a>
                            </div>
                        </ul>
                    </div>
                    <div className="footer__content">
                        <h3 className="footer__title">Horario de Atención</h3>
                        <ul className="footer__data">
                            <li className="footer__information">Lunes a Viernes: 9am - 5pm</li>
                            <li className="footer__information">Sábado: 8am - 4pm</li>
                            <li className="footer__information">Domingo: Cerrado</li>
                        </ul>
                    </div>
                </div>
                <p className="footer__copy">© ECOUML. Todos los derechos reservados</p>
            </footer>
        </>
    );
};

export default Footer;
