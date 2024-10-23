import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, storage } from '../../db/config';
import { doc, getDoc, updateDoc,getDocs,collection,deleteDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { query, orderBy } from 'firebase/firestore';

interface Caracteristica {
  nombre: string;
}

interface Planta {
  id: string;
  nombre: string;
  descripcion: string;
  caracteristicas: Caracteristica[];
  imagenes: string[];
}

const EditItem: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el id de los parámetros de la URL
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const [nombre, setNombre] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [imagenes, setImagenes] = useState<{ file: File; url: string; esNueva: boolean }[]>([]);

  const [imagenesPreview, setImagenesPreview] = useState<string[]>([]);
  const [imagenesAEliminar, setImagenesAEliminar] = useState<string[]>([]);
  const [caracteristicas, setCaracteristicas] = useState<Caracteristica[]>([]);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState<Caracteristica>({ nombre: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [items, setItems] = useState<Planta[]>([]);

  const obtenerItems = async () => {
    const q = query(collection(db, 'plantas'), orderBy('fecha', 'desc')); // Ordenar por fechaCreacion, descendente
    const querySnapshot = await getDocs(q);
    const elementos: Planta[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Planta[];
    setItems(elementos);
  };

  const eliminarPlanta = async (id: string) => {
    try {
      //confirmar si se desea eliminar la planta
      if (!window.confirm('¿Estás seguro de eliminar esta planta?')) {
        return;
      }
      // Eliminar planta de la base de datos
      await deleteDoc(doc(db, 'plantas', id));

      // Filtrar la planta eliminada de la lista local de items
      const nuevasPlantas = items.filter((item) => item.id !== id);
      setItems(nuevasPlantas);
      navigate('/plantas/crear');
      console.log('Planta eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la planta:', error);
      setError('Hubo un error al eliminar la planta.');
    }
  };

  useEffect(() => {
    if (id) {
      obtenerPlanta(id); // Cargar los datos de la planta existente si hay un id
    }
    obtenerItems();

  }, [id]);
  useEffect(() => {
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    bootstrapLink.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
    bootstrapLink.crossOrigin = 'anonymous';
    document.head.appendChild(bootstrapLink);

    return () => {
      document.head.removeChild(bootstrapLink);
    };
  }, []);

  const manejarCambioImagenes = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const archivos = Array.from(e.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        esNueva: true, // Marcar todas las nuevas imágenes como "nuevas"
      }));
      setImagenes((prev) => [...prev, ...archivos]); // Agregar nuevas imágenes
      const archivosPreview = archivos.map((archivo) => archivo.url);
      setImagenesPreview((prev) => [...prev, ...archivosPreview]); // Mantener las previas
    }
  };
  

  const eliminarImagenExistente = (url: string) => {
    if (!url.startsWith('blob:')) { // Solo elimina imágenes de Firebase
      setImagenesAEliminar((prev) => [...prev, url]);
      setImagenes((prev) => prev.filter((imagen) => imagen.url !== url));
      setImagenesPreview((prev) => prev.filter((imagen) => imagen !== url));
      console.log('Imágenes a eliminar:', imagenesAEliminar);
    }
  
    // Eliminar también de la vista previa local
    setImagenesPreview((prev) => prev.filter((imagen) => imagen !== url));
  
    // Filtrar las imágenes del estado
    const nuevasImagenes = imagenes.filter((imagen) => imagen.url !== url);
    setImagenes(nuevasImagenes);
  
    console.log('Imágenes restantes:', imagenesPreview);
  };
  

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.nombre.trim() !== '') {
      setCaracteristicas([...caracteristicas, nuevaCaracteristica]);
      setNuevaCaracteristica({ nombre: '' });
    }
  };

  const obtenerPlanta = async (id: string) => {
    try {
      const docRef = doc(db, 'plantas', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const planta = docSnap.data() as Planta;
        setNombre(planta.nombre);
        setDescripcion(planta.descripcion);
        setCaracteristicas(planta.caracteristicas);
        setImagenesPreview(planta.imagenes);
        // Agregar las imágenes al estado con la URL y el archivo
        const imagenes = planta.imagenes.map((url) => ({ url, file: new File([], url), esNueva: false }));
        setImagenes(imagenes);
        console.log('Planta cargada:', planta);
      } else {
        console.error("No se encontró la planta");
      }
    } catch (error) {
      console.error('Error al cargar la planta:', error);
      setError('Error al cargar la planta');
    }
  };

  const subirImagenes = async () => {
    const urls: string[] = [];
  
    for (const { file } of imagenes) { // Usar el nuevo estado que incluye el archivo y la URL
      const imagenRef = ref(storage, `imagenes/${file.name}`);
      const snapshot = await uploadBytes(imagenRef, file);
      const url = await getDownloadURL(snapshot.ref);
      urls.push(url);
    }
  
    return urls;
  };

  const eliminarImagenesFirebase = async () => {
    for (const url of imagenesAEliminar) {
      const imagenRef = ref(storage, url);
      try {
        await deleteObject(imagenRef);
      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
      }

    }
    console.log('Imágenes eliminadas:', imagenes);
    console.log('Imágenes a eliminar:', imagenesAEliminar);
    
  };

  const actualizarDatos = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Primero eliminar las imágenes seleccionadas para eliminar
      await eliminarImagenesFirebase();
  
      // Luego subir las nuevas imágenes si las hay
      let imagenesURLs = imagenesPreview.filter(url => !imagenesAEliminar.includes(url)); // Mantener solo las URLs que no están en la lista de eliminadas
      

      if (imagenes.length > 0 && imagenes.some((imagen) => imagen.esNueva)) {
        const nuevasImagenesURLs = await subirImagenes();
        console.log('Nuevas imágenes:', nuevasImagenesURLs);
        imagenesURLs = [...imagenesURLs, ...nuevasImagenesURLs]; // Agregar las nuevas URLs
        //eliminar las url de tipo blob
        imagenesURLs = imagenesURLs.filter(url => !url.startsWith('blob:'));
      }

      console.log('Imágenes urls:', imagenesURLs);
      const plantaRef = doc(db, 'plantas', id!);
      await updateDoc(plantaRef, {
        nombre,
        descripcion,
        caracteristicas,
        imagenes: imagenesURLs,
        fecha: new Date(),
      });
  
      setError(null);
      alert('Datos actualizados correctamente');
      navigate('/plantas/crear');
    } catch (err) {
      setError('Error al actualizar los datos. Inténtalo de nuevo.');
    }
  
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4 text-success">Editar Planta 🌿</h1>

              <form onSubmit={actualizarDatos}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="nombre"
                    value={nombre}
                    placeholder="Nombre de la planta"
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción:</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    value={descripcion}
                    placeholder="Descripción de la planta"
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="imagenes" className="form-label">Subir Imágenes:</label>
                  <input
                    className="form-control"
                    type="file"
                    id="imagenes"
                    multiple
                    accept="image/*"
                    onChange={manejarCambioImagenes}
                  />
                </div>

                {imagenes.length > 0 && (
  <div className="mb-3">
    <h5>Imágenes actuales:</h5>
    <div className="d-flex flex-wrap">
      {imagenes.map((imagen, index) => (
        <div key={index} className="position-relative me-2">
          <img
            src={imagen.url}
            alt={`Vista previa ${index}`}
            className="img-thumbnail"
            style={{ width: "75px", height: "75px" }}
          />
          <button
            type="button"
            className="btn btn-sm btn-danger position-absolute top-0 end-0"
            onClick={() => eliminarImagenExistente(imagen.url)}
          >
            &times;
          </button>
          <span className="badge bg-secondary position-absolute top-0 start-0">
            {imagen.esNueva ? "Nueva" : "Vieja"}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

                <div className="mb-3">
                  <label htmlFor="caracteristicas" className="form-label">Agregar Características:</label>
                  <div className="d-flex">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Ej. Resistente a la sequía, Nombre científico: ..."
                      value={nuevaCaracteristica.nombre}
                      onChange={(e) => setNuevaCaracteristica({ ...nuevaCaracteristica, nombre: e.target.value })}
                    />
                    <button type="button" className="btn btn-success" onClick={agregarCaracteristica}>Agregar</button>
                  </div>
                </div>

                {caracteristicas.length > 0 && (
                  <ul className="list-group mb-3">
                    {caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {caracteristica.nombre}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            const nuevasCaracteristicas = caracteristicas.filter((_, i) => i !== index);
                            setCaracteristicas(nuevasCaracteristicas);
                          }}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="d-grid">
                  <button className="btn btn-success" type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </div>

                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
            <h2 className="card-title text-center">Lista de Plantas <span role="img" aria-label="planta">{items.length > 0 ? items.length : '🌱'}</span></h2>
              <div className="table-responsive mt-4">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Características</th>
                      <th>Imágenes</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center">No hay plantas registradas.</td>
                      </tr>
                    ) : (
                      items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.nombre}</td>
                          <td>{item.descripcion}</td>
                          <td>
                            <ul className="list-unstyled">
                              {item.caracteristicas.map((caracteristica, index) => (
                                <li key={index}>{caracteristica.nombre}</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            {item.imagenes.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`Imagen ${index}`}
                                className="img-thumbnail"
                                style={{ width: "50px", height: "50px", marginRight: "5px" }}
                              />
                            ))}
                          </td>
                          <td className='d-flex justify-content-center'>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarPlanta(item.id)}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                            <Link to={`/plantas/editar/${item.id}`} className="btn btn-warning btn-sm ms-2">
                              <i className="ri-pencil-line"></i>
                            </Link>
                            
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
