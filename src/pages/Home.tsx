import{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PlantasList from '../components/PlantasList';

function Home() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // Controla qué pregunta está abierta

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index); // Alterna entre abrir y cerrar
    };

    const questions = [
        {
            title: '¿Por qué mis flores se están cayendo o muriendo?',
            description: 'Las plantas son una manera fácil de agregar color y energía a tu espacio, pero debes elegir la adecuada.',
        },
        {
            title: '¿Cuánto sol necesita mi planta?',
            description: 'La mayoría de las plantas necesitan luz solar directa, pero algunas prosperan en sombra parcial.',
        },
        {
            title: '¿Con qué frecuencia debo regar mis plantas?',
            description: 'Es mejor dejar que la capa superior del suelo se seque antes de volver a regar.',
        },
        // Puedes agregar más preguntas aquí
    ];
    const images = [
        
        '/src/assets/img/home2.jpg', // Corrige la extensión aquí
        '/src/assets/img/home3.jpg', // Corrige la extensión aquí
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Cambia cada 3 segundos
        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [images.length]);
    return (
        <>
            <main className="main">
                {/*==================== INICIO ====================*/}
                <section className="home" id="home">
                    <div className="home__container container grid">
                        <img src="/src/assets/img/home.png" alt="" className="home__img" />
                        <div className="home__data">
                            <h1 className="home__title">
                                Bienvenidos a la <br />Universidad Martín Lutero
                            </h1>
                            <p className="home__description">
                                En la Universidad Martín Lutero, estamos comprometidos con la educación integral y el cuidado del medio ambiente.


                                <br />
                            </p>
                            <a href="#about" className="button button--flex">
                                Explorar <i className="ri-arrow-right-down-line button__icon" />
                            </a>
                        </div>
                        <div className="home__social">
                            <span className="home__social-follow">Síguenos</span>
                            <div className="home__social-links">
                                <a
                                    href="https://www.facebook.com/UMLNicaragua"
                                    target="_blank"
                                    className="home__social-link"
                                >
                                    <i className="ri-facebook-fill" />
                                </a>
                                <a
                                    href="http://www.uml.edu.ni/"
                                    target="_blank"
                                    className="home__social-link"
                                >
                                    <i className="ri-global-line" />
                                </a>
                                {/* mercadeo@uml.edu.ni */}
                                <a
                                    href="mailto:mercadeo@uml.edu.ni"
                                    target="_blank"
                                    className="home__social-link"
                                >
                                    <i className="ri-mail-line" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/*==================== NOSOTROS ====================*/}
                <section className="about section container" id="about">
                    <div className="about__container grid">
                        <div className="image-container" style={{ position: 'relative', width: '100', height: 'auto' }}>
                            <img
                                src={images[currentIndex]}
                                alt=""
                                className="about__img"
                                style={{borderRadius: '2%', width: '100%', height: 'auto' }}
                            />
                            
                        </div>


                        <div className="about__data">
                            <h2 className="section__title about__title">
                                ¿Quiénes somos realmente? <br /> ¿Por qué elegirnos?
                            </h2>
                            <p className="about__description">
                                En la Universidad Martín Lutero, nos dedicamos a la educación integral, con un fuerte enfoque en la sostenibilidad y el respeto por la naturaleza.
                                Contamos con más de 500 especies de plantas que forman parte activa de nuestra enseñanza e investigación.
                            </p>
                            <div className="about__details">
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon" />
                                    Ofrecemos un entorno único donde la biodiversidad es clave.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon" />
                                    Participamos en proyectos de conservación y sostenibilidad.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon" />
                                    Investigamos plantas medicinales y especies en peligro.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon" />
                                    Colaboramos con la comunidad para proteger el medio ambiente.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon" />
                                    Nuestro objetivo es formar ciudadanos comprometidos con la naturaleza.
                                </p>
                            </div>
                            <a href="#steps"
                                className="button--link button--flex">
                                Conoce Más <i className="ri-arrow-right-down-line button__icon" />
                            </a>
                        </div>
                    </div>
                </section>

                {/*==================== PASOS ====================*/}
                <section className="steps section container" id="steps">
                    <div className="steps__bg">
                        <h2 className="section__title-center steps__title">
                            Pasos para comenzar <br /> con nuestras plantas
                        </h2>
                        <div className="steps__container grid">
                            <div className="steps__card">
                                <div className="steps__card-number">01</div>
                                <h3 className="steps__card-title">Explora nuestra biodiversidad</h3>
                                <p className="steps__card-description">
                                    Descubre las más de 500 especies de plantas que tenemos, desde plantas medicinales hasta especies en peligro de extinción.
                                </p>
                            </div>
                            <div className="steps__card">
                                <div className="steps__card-number">02</div>
                                <h3 className="steps__card-title">Participa en proyectos</h3>
                                <p className="steps__card-description">
                                    Únete a nuestros proyectos de investigación y conservación, o toma cursos para aprender más sobre botánica y ecología.
                                </p>
                            </div>
                            <div className="steps__card">
                                <div className="steps__card-number">03</div>
                                <h3 className="steps__card-title">Cuida y protege</h3>
                                <p className="steps__card-description">
                                    Aplica lo aprendido para proteger las plantas y su ecosistema, contribuyendo a la conservación y sostenibilidad.
                                </p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />

                </section>

                {/*==================== PRODUCTOS ====================*/}
                <section className="product section container" id="products">

                    <h2 className="section__title-center">
                        Descubre nuestras <br /> plantas
                    </h2>
                    <p className="product__description">
                        Algunas de las plantas más emblemáticas que forman parte de nuestros proyectos de investigación y conservación.
                    </p>
                    <div className="product__container grid">
                        <PlantasList cantidad={6} />
                        {/* Resto de los artículos de producto */}

                        {/* Resto de los artículos de producto */}
                        <Link to="/plantas"
                            className="button--link button--flex">
                            Ver Más <i className="ri-arrow-right-line button__icon" />
                        </Link>
                    </div>

                </section>
                {/*==================== PREGUNTAS FRECUENTES ====================*/}
                <section className="questions section" id="faqs">
                    <h2 className="section__title-center questions__title container">
                        Algunas preguntas comunes <br /> que nos suelen hacer
                    </h2>
                    <div className="questions__container container">
                        <div className="questions__group">
                            {questions.map((question, index) => (
                                <div className={`questions__item ${activeIndex === index ? 'accordion-open' : ''}`} key={index}>
                                    <header className="questions__header" onClick={() => toggleAccordion(index)}>
                                        <i className="ri-add-line questions__icon" />
                                        <h3 className="questions__item-title">{question.title}</h3>
                                    </header>
                                    <div
                                        className="questions__content"
                                        style={{ height: activeIndex === index ? 'auto' : '0', overflow: 'hidden' }} // Ajusta la altura
                                    >
                                        <p className="questions__description">{question.description}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Resto de las preguntas */}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home