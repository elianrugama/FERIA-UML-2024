import { useEffect, useState } from 'react'
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
                                En la Universidad Martín Lutero, ofrecemos una educación integral basada en la innovación, el compromiso social y el desarrollo personal.
                            </p>
                            <a href="#about" className="button button--flex">
                                Explorar <i className="ri-arrow-right-down-line button__icon"></i>
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
                                style={{ borderRadius: '2%', width: '100%', height: 'auto' }}
                            />

                        </div>


                        <div className="about__data">
                            <h2 className="section__title about__title">
                                ¿Quiénes somos? <br /> ¿Por qué elegirnos?
                            </h2>
                            <p className="about__description">
                                En la Universidad Martín Lutero, ofrecemos una educación de calidad basada en principios de innovación, colaboración y compromiso con la sociedad.
                            </p>
                            <div className="about__details">
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon"></i>
                                    Contamos con un equipo docente altamente calificado.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon"></i>
                                    Fomentamos el aprendizaje práctico y la investigación.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon"></i>
                                    Desarrollamos programas académicos que responden a las necesidades actuales.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon"></i>
                                    Promovemos el trabajo en equipo y el liderazgo entre nuestros estudiantes.
                                </p>
                                <p className="about__details-description">
                                    <i className="ri-checkbox-fill about__details-icon"></i>
                                    Nos comprometemos con el cuidado del medio ambiente a través de iniciativas sostenibles.
                                </p>
                            </div>
                            <a href="#steps" className="button--link button--flex">
                                Conoce Más <i className="ri-arrow-right-down-line button__icon"></i>
                            </a>
                        </div>

                    </div>
                </section>

                {/*==================== PASOS ====================*/}
                <section className="steps section container" id="steps">
                    <div className="steps__bg">
                        <h2 className="section__title-center steps__title">
                            Pasos para comenzar <br /> con nosotros
                        </h2>
                        <div className="steps__container grid">
                            <div className="steps__card">
                                <div className="steps__card-number">01</div>
                                <h3 className="steps__card-title">Descubre nuestras oportunidades</h3>
                                <p className="steps__card-description">
                                    Explora nuestros programas académicos, proyectos de investigación y oportunidades de crecimiento personal.
                                </p>
                            </div>
                            <div className="steps__card">
                                <div className="steps__card-number">02</div>
                                <h3 className="steps__card-title">Participa activamente</h3>
                                <p className="steps__card-description">
                                    Únete a nuestras iniciativas, ya sea a través de clubes, investigaciones, o proyectos colaborativos.
                                </p>
                            </div>
                            <div className="steps__card">
                                <div className="steps__card-number">03</div>
                                <h3 className="steps__card-title">Contribuye al futuro</h3>
                                <p className="steps__card-description">
                                    Aplica tus conocimientos y habilidades para crear un impacto positivo en la comunidad y más allá.
                                </p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </section>


                {/*==================== PRODUCTOS ====================*/}
                <section className="product section container" id="plants">

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