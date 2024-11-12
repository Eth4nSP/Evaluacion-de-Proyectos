import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/loading/loading';
import Error from '../../../components/error/error';
import ListaDefinitivaN from '../../../components/listaDefinitiva/listaDefinitivaN';

const columns = [
  { field: 'nombreEmpresa', headerName: 'Nombre Empresa', type: 'string', flex: 2 },
  { field: 'nombreLargo', headerName: 'Nombre Empresa largo', type: 'string', flex: 2 },
  { field: 'totalEstudiantes', headerName: 'Numero de Integrantes', type: 'string', flex: 2 },
];

function EmpresasParaTareas() {
  const {idGrupo, idEstudiante, idEmpresa} = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
    errorDetails: "",
  });

  const idDocente = 1;
  const gestionGrupo = '2024-2'

  useEffect(() => {
    setLoading(true);
    const fetchEmpresas = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/docente/obtenerEmpresasPorGrupoYDocente?` +
          new URLSearchParams({ idDocente, gestionGrupo })
        );

        if (!response.ok) throw new Error('Error fetching data');

        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (err) {
        setError({
          error: true,
          errorMessage: err.message,
          errorDetails: err,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, []);

  if (loading) return <Loading />;
  if (error.error) return <Error errorMessage={error.errorMessage} errorDetails={error.errorDetails} />;

  return (
    <ListaDefinitivaN
      titulo="SELECCIONE UNA EMPRESA PARA VISUALIZAR SUS TAREAS"
      cabezeraTitulo={null}
      cabezeras={columns}
      datosTabla={data}
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/"
      dirForward= {`/${idEstudiante}/homeGrupoE/${idGrupo}/empresas/`}
      mensajeSearch="Buscar Empresa"
      nombreContador="Empresas"
    />
  );
}

export default EmpresasParaTareas;