import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { db, storage } from '../../db/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


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

const CreateItem: React.FC = () => {
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
  const [nombre, setNombre] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [imagenesPreview, setImagenesPreview] = useState<string[]>([]);
  const [caracteristicas, setCaracteristicas] = useState<Caracteristica[]>([]);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState<Caracteristica>({ nombre: '' });
  const [items, setItems] = useState<Planta[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerItems();
  }, []);

  const manejarCambioImagenes = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const archivos = Array.from(e.target.files);
      setImagenes(archivos);

      // Mostrar las imágenes seleccionadas como vista previa
      const archivosPreview = archivos.map((archivo) => URL.createObjectURL(archivo));
      setImagenesPreview(archivosPreview);
    }
  };

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.nombre.trim() !== '') {
      setCaracteristicas([...caracteristicas, nuevaCaracteristica]);
      setNuevaCaracteristica({ nombre: '' });
    }
  };

  const subirImagenes = async () => {
    const urls: string[] = [];

    for (const imagen of imagenes) {
      const imagenRef = ref(storage, `imagenes/${imagen.name}`);
      const snapshot = await uploadBytes(imagenRef, imagen);
      const url = await getDownloadURL(snapshot.ref);
      urls.push(url);
    }

    return urls;
  };

  const subirDatos = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imagenesURLs = await subirImagenes();
      await addDoc(collection(db, 'plantas'), {
        nombre,
        descripcion,
        caracteristicas,
        imagenes: imagenesURLs,
      });
      setNombre('');
      setDescripcion('');
      setImagenes([]);
      setImagenesPreview([]);
      setCaracteristicas([]);
      setError(null);
      obtenerItems();
    } catch (err) {
      setError('Error al subir los datos. Inténtalo de nuevo.');
    }

    setLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  const obtenerItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'plantas'));
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

      console.log('Planta eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la planta:', error);
      setError('Hubo un error al eliminar la planta.');
    }
  };
  return (
    <div className="container-fluid">
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        {/* Tarjeta para crear nueva planta */}
        <div className="col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4 text-success">Crear Nueva Planta <span role="img" aria-label="planta">🌿</span></h1>
  
              <form onSubmit={subirDatos}>
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
                    required
                  />
                </div>
  
                {imagenesPreview.length > 0 && (
                  <div className="mb-3">
                    <h5>Vista previa de imágenes:</h5>
                    <div className="d-flex">
                      {imagenesPreview.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Vista previa ${index}`}
                          className="img-thumbnail me-2"
                          style={{ width: "75px", height: "75px" }}
                        />
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
                    {loading ? "Subiendo..." : "Agregar Planta"}
                  </button>
                  <button className="btn btn-primary mt-2"
                   type="submit">
                    Voler a la página principal
                  </button>
                </div>
  
                {error && <p className="text-danger mt-3 text-center">{error}</p>}
              </form>
            </div>
          </div>
        </div>
  
        {/* Tarjeta para la lista de plantas */}
        <div className="col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Lista de Plantas</h2>
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
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarPlanta(item.id)}
                            >
                              Eliminar
                            </button>
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

export default CreateItem;
