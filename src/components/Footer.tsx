import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <>
            <footer className="footer section" id="footer">
                <div className="footer__container container grid">

                    <div className="footer__content">
                        <a href="#" className="footer__logo">
                            <i className="ri-leaf-line footer__logo-icon"></i> ECOUML
                        </a>
                        <h3 className="footer__title">
                            Apoya nuestro proyecto <br /> agregando contenido a nuestra plataforma
                        </h3>
                        
                            <Link className="button button--flex footer__button" 
                                to="/plantas/crear">
                                Agregar contenido
                                <i className="ri-arrow-right-up-line button__icon"></i>
                            </Link>
                    </div>


                    <div className="footer__content">
                        <h3 className="footer__title">Nuestra dirección</h3>
                        <ul className="footer__data">
                            <li className="footer__information">Universidad Martín Lutero Sede Ocotal Planta de ENACAL,</li>
                            <li className="footer__information">200 mts al norte.</li>

                        </ul>
                    </div>
                    <div className="footer__content">
                        <h3 className="footer__title">Contáctanos</h3>
                        <ul className="footer__data">
                            <li className="footer__information">+505 83334096</li>
                            <div className="footer__social">
                                <a href="https://www.facebook.com/umlocotal"
                                    className="footer__social-link">
                                    <i className="ri-facebook-fill" />
                                </a>
                                <a href="https://ocotal.uml.edu.ni/"

                                    className="footer__social-link">
                                    <i className="ri-global-line" />
                                </a>
                                <a href="mailto:info.ocotal0201@uml.edu.ni"
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
                            <li className="footer__information">Lunes a Viernes: 8am - 5pm</li>
                            <li className="footer__information">Sábado: 8am - 5pm</li>
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
