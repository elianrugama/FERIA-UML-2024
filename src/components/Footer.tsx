

const Footer = () => {
    return (
        <>
            <footer className="footer section">
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
                            <button className="button button--flex footer__button">
                                Suscribirse
                                <i className="ri-arrow-right-up-line button__icon" />
                            </button>
                        </div>
                    </div>
                    <div className="footer__content">
                        <h3 className="footer__title">Nuestra dirección</h3>
                        <ul className="footer__data">
                            <li className="footer__information">1234 - Nicaragua</li>
                            <li className="footer__information">Ocotal - 43210</li>
                            <li className="footer__information">123-456-789</li>
                        </ul>
                    </div>
                    <div className="footer__content">
                        <h3 className="footer__title">Contáctanos</h3>
                        <ul className="footer__data">
                            <li className="footer__information">+999 888 777</li>
                            <div className="footer__social">
                                <a href="https://www.facebook.com/" className="footer__social-link">
                                    <i className="ri-facebook-fill" />
                                </a>
                                <a href="https://www.instagram.com/" className="footer__social-link">
                                    <i className="ri-instagram-line" />
                                </a>
                                <a href="https://twitter.com/" className="footer__social-link">
                                    <i className="ri-twitter-fill" />
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
