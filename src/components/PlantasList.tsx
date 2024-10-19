import React, { useEffect, useState } from 'react';
import { db } from '../db/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

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

interface PlantasListProps {
  cantidad: number; // Prop para definir cuántas plantas se mostrarán
}

const PlantasList: React.FC<PlantasListProps> = ({ cantidad }) => {
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

      // Limitar la cantidad de plantas a mostrar
      if (cantidad == 6) {
        setPlantas(plantasList.slice(0, cantidad));
      }else{
        setPlantas(plantasList);
      }
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

  if (loading) {
    return <p>Cargando plantas...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }
  return (
    <>
        {plantas.map((planta) => (
          <article className="product__card" key={planta.id}>
            
            {/* Mostrar solo la primera imagen */}
            {planta.imagenes.length > 0 ? (
              <img src={planta.imagenes[0]} alt={planta.nombre} className="product__img" style={{ width: '100px',height:'100px',borderRadius:'10%' }} />
            ) : (
              <img src="/ruta/a/imagen/default.jpg" alt="Sin imagen" className="product__img" style={{ width: '100px',height:'100px',borderRadius:'10%' }} />
            )}
            <h3 className="product__title">{planta.nombre}</h3>
            <span className="product__price">
              {planta.caracteristicas.length > 0 ? planta.caracteristicas[0].nombre : 'Sin características'}
            </span>
            <Link to={`/plantas/${planta.id}`} className="button--flex product__button">
              <i className="ri-information-line" />
            </Link>
          </article>
        ))}
    </>
  );
};

export default PlantasList;
