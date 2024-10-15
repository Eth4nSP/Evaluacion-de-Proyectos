import React, { useEffect, useState } from 'react';
import Header from '../../../../components/Header/header.jsx';
import Footer from '../../../../components/Footer/footer.jsx';
import ButtonBackAndTitle from '../../../../components/buttonBackAndTitle/buttonBackAndTitle.jsx';

function ObtenerEstudiantesPorGrupo() {
  const idGrupo = 1; // Hardcodeado
  const gestionGrupo = '2024-2'; // Hardcodeado
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const estudiantesPorPagina = 10;

  // Función para obtener estudiantes
  const fetchEstudiantes = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/grupo/estudiantes/${idGrupo}/${gestionGrupo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error de grupo');
      }

      const data = await response.json();
      setEstudiantes(data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, [idGrupo, gestionGrupo]);

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
        if (!searchTerm.trim()) {
        window.location.reload(); // Esto recargará la página y mostrará todos los datos
        return;
    }
    setLoading(true); // Iniciar carga
    try {
      const response = await fetch(`http://localhost:8000/api/grupo/estudiante/barraBusqueda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idGrupo, 
          gestionGrupo, 
          termino: searchTerm 
        }), // Enviar el idGrupo, gestionGrupo y término de búsqueda
      });

      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const result = await response.json();
      setEstudiantes(result); // Actualizar los estudiantes con los resultados de la búsqueda
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError(error.message);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const totalPaginas = Math.ceil(estudiantes.length / estudiantesPorPagina);
  const indexOfLastEstudiante = currentPage * estudiantesPorPagina;
  const indexOfFirstEstudiante = indexOfLastEstudiante - estudiantesPorPagina;
  const estudiantesActuales = estudiantes.slice(indexOfFirstEstudiante, indexOfLastEstudiante);

  const handleNextPage = () => {
    if (currentPage < totalPaginas) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Cargando estudiantes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <React.Fragment>
      <Header />
      <div className='box'>
        <div className='container'>
          <ButtonBackAndTitle 
            datosTitleBack={{ ocultarAtras: false, titulo: 'ESTUDIANTES POR GRUPO' }}
          />
          <h1>LISTA DE ESTUDIANTES</h1>

          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar Estudiante"
              style={{ marginBottom: '20px', padding: '8px', width: '200px' }}
            />
            <button type="submit">Buscar</button>
          </form>

          <div className='pageBorder'>
            <div className='pageBorder_interior'>
              {estudiantesActuales.length === 0 ? (
                <p>No se encontraron estudiantes.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <table className='excelTable'>
                    <thead>
                      <tr>
                        <th>ESTUDIANTE</th>
                        <th>EMPRESA</th>
                        <th>ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estudiantesActuales.map((estudiante) => (
                        <tr key={estudiante.idEstudiante}>
                          <td>
                            {estudiante.nombreEstudiante} {estudiante.apellidoPaternoEstudiante} {estudiante.apellidoMaternoEstudiante}
                          </td>
                          <td>{estudiante.nombreEmpresa}</td>
                          <td>
                            <button onClick={() => handleDarDeBaja(estudiante.idEstudiante)}>Dar de baja</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='pagination' style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPaginas}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPaginas}>Siguiente</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );

  function handleDarDeBaja(id) {
    console.log(`Dar de baja al estudiante con ID: ${id}`);
  }
}

// Estilos para la tabla y demás elementos
const styles = `
  .excelTable {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .excelTable th, .excelTable td {
    border: 1px solid #000;
    padding: 10px;
    text-align: center;
    background-color: #fff;
  }

  .excelTable th {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  .excelTable tr:hover {
    background-color: #f1f1f1;
  }

  .pagination {
    display: flex;
    justify-content: flex-end; /* Alinear a la derecha */
    margin-top: 20px;
  }

  .pagination button {
    margin: 0 5px;
  }
`;

// Insertar estilos en el head del documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ObtenerEstudiantesPorGrupo;
