import { useEffect, useState } from 'react';
import { getPlant } from '../db/data';
import { useParams, Link } from 'react-router-dom';
import PlantasList from '../components/PlantasList';

const Plant = () => {
  const [plantaData, setPlantaData] = useState<any>({});
 
  const { id } = useParams();

  

  useEffect(() => {
    const getPlantaData = async () => {
      if (id) {
        const data = await getPlant(id);
        if (!data) {
          window.location.href = '/';
        }
        setPlantaData(data);
         
      }
    };
    getPlantaData();
  
  }, [id]);

  useEffect(() => {
    const plantasection = document.getElementById('plant');
    if (plantasection) {
      plantasection.scrollIntoView();
    }
  }, [id]);

  return (
    <>
      {/*==================== PLANTA ====================*/}
      <section className="home" id="plant">
        <div className="home__container container grid">
          <img src={plantaData.imagenes && plantaData.imagenes.length > 0 ? plantaData.imagenes[0] : ''} alt={plantaData.nombre || 'Planta'} className="home__img"
          style={{borderRadius:'5%',width:'100%'}} />
           
          <div className="home__data">
            <h1 className="home__title">{plantaData.nombre || 'Nombre de la Planta'}</h1>
            <p className="home__description">
              {plantaData.descripcion || 'Descripción de la planta.'}
              <br />
            </p>
            <a 
            style={{cursor:'pointer'}}
            onClick={
              () => {
                document.getElementById('about')?.scrollIntoView()
              }
            }
             className="button button--flex">
              Más información
              <i className="ri-arrow-right-down-line button__icon" />
            </a>
          </div>
        </div>
      </section>

      <section className="about section container" id="about">
  <h2 className="section__title">
   Información de la Planta
  </h2>
  <div className="about__details">
    {/* Características */}
    {plantaData.caracteristicas && plantaData.caracteristicas.length > 0 && (
      <>
        <h3>Características</h3>
        {plantaData.caracteristicas.map((caracteristica: { nombre: string }, index: number) => (
          <p className="about__details-description" key={index}>
            <i className="ri-checkbox-fill about__details-icon" />
            {caracteristica.nombre}
          </p>
        ))}
      </>
    )}

    {/* Cuidados */}
    {plantaData.cuidados && plantaData.cuidados.length > 0 && (
      <>
        <h3>Cuidados</h3>
        {plantaData.cuidados.map((cuidado: { nombre: string }, index: number) => (
          <p className="about__details-description" key={index}>
            <i className="ri-checkbox-fill about__details-icon" />
            {cuidado.nombre}
          </p>
        ))}
      </>
    )}

    {/* Usos */}
    {plantaData.usos && plantaData.usos.length > 0 && (
      <>
        <h3>Usos</h3>
        {plantaData.usos.map((uso: { nombre: string }, index: number) => (
          <p className="about__details-description" key={index}>
            <i className="ri-checkbox-fill about__details-icon" />
            {uso.nombre}
          </p>
        ))}
      </>
    )}

    {/* Cantidad */}
    {plantaData.cantidad && plantaData.cantidad > 0 && (
      <>
        <h3>Cantidad</h3>
        <p className="about__details-description">
          <i className="ri-leaf-fill about__details-icon" />
          {plantaData.cantidad} planta(s) disponibles
        </p>
      </>
     
    )}

    {/* Mensaje si no hay detalles disponibles */}
    {(!plantaData.caracteristicas || plantaData.caracteristicas.length === 0) &&
     (!plantaData.cuidados || plantaData.cuidados.length === 0) &&
     (!plantaData.usos || plantaData.usos.length === 0) &&
     (!plantaData.cantidad || plantaData.cantidad === 0) && (
      <p className="about__details-description">No hay detalles disponibles para esta planta.</p>
    )}
  </div>
</section>

      

      {/*==================== IMÁGENES ====================*/}
      <section className="images section container" id="images">
        <h2 className="section__title">Galería de Imágenes</h2>
        <div className="images__container grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {plantaData.imagenes && plantaData.imagenes.length > 0 ? (
            plantaData.imagenes.map((url: string, index: number) => (
              <img src={url} alt={`Imagen ${index + 1}`} key={index} className="images__img" />
            ))
          ) : (
            <p>No hay imágenes disponibles.</p>
          )}
        </div>
      </section>

      {/*==================== PRODUCTOS ====================*/}
      <section className="product section container" id="products">
        <h2 className="section__title-center">Otras Plantas de Nuestra Colección</h2>
        <p className="product__description">Explora más plantas similares que podrían interesarte.</p>
        <div className="product__container grid">
        <PlantasList  cantidad={6}/>
        </div>
        <Link to="/plantas" className="button--link button--flex">
          Volver a la página de inicio
          <i className="ri-arrow-right-line button__icon" />
        </Link>
      </section>
    </>
  );
};

export default Plant;
