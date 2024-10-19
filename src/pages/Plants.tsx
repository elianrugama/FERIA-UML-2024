import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../db/config';

interface Caracteristica {
    nombre: string;
    valor: string;
}

interface Planta {
    id: string;
    nombre: string;
    imagenes: string[];
    caracteristicas: Caracteristica[];
}

const Plants = () => {
    const [search, setSearch] = useState('');

    const [plantas, setPlantas] = useState<Planta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener plantas
    const obtenerPlantas = async () => {
        try {
            const plantasCollection = collection(db, 'plantas'); // Reemplaza 'plantas' con el nombre de tu colección
            const plantasSnapshot = await getDocs(plantasCollection);
            const plantasList: Planta[] = plantasSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Planta[];
            setPlantas(plantasList);
            
        } catch (error) {
            setError('Error al cargar las plantas');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerPlantas();
    }, []);
    useEffect(() => {
        const plantasection = document.getElementById('plantasection');
        if (plantasection) {
          plantasection.scrollIntoView();
        }
      }, []);

    // Filtrar plantas según la búsqueda
    const filteredPlantas = plantas.filter((planta) =>
        planta.nombre.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <p>Cargando plantas...</p>;
    }
    if (error) {
        return <p className="text-danger">{error}</p>;
    }
    
    return (

        <section className="plantas section container" id='plantasection'>
            <h2 className="section__title-center">Nuestras Plantas</h2>
            <div className="plantas__search">
                <input
                    type="text"
                    placeholder="Buscar plantas"
                    className="plantas__input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="plantas__container grid">
                {filteredPlantas.length > 0 ? (
                    filteredPlantas.map((planta, index) => (
                        <Link to={`/plantas/${planta.id}`} key={index}>
                            <article className="plantas__card" key={index}>
                                <div className="plantas__circle" />
                                <img
                                    src={planta.imagenes.length > 0 ? planta.imagenes[0] : '/src/assets/img/product1.png'}
                                    alt={planta.nombre}
                                    className="plantas__img"
                                />
                                <h3 className="plantas__title">{planta.nombre}</h3>
                                <p className="plantas__genero">{planta.caracteristicas.length > 0 ? planta.caracteristicas[0].nombre : 'Sin características'}</p>
                                
                            </article>
                        </Link>
                    ))
                ) : (
                    <p className="plantas__not-found">No se encontraron plantas.</p>
                )}
            </div>

            {/* Estilos CSS */}
            <style>{`
                .plantas__search {
                    margin: 1rem 0;
                    text-align: center;
                }

                .plantas__input {
                    padding: 0.5rem 1rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 100%;
                    max-width: 300px;
                }

                .plantas__container {
                    display: grid;
                    gap: 1.5rem;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                }

                .plantas__card {
                    padding: 1rem;
                    
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .plantas__img {
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                }

                .plantas__title {
                    font-size: 1.2rem;
                    margin-top: 0.5rem;
                }

                .plantas__genero {
                    color: #666;
                    font-size: 1rem;
                }

                .plantas__not-found {
                    text-align: center;
                    font-size: 1.2rem;
                    color: #888;
                }
            `}</style>
        </section>
    );
};

export default Plants;
