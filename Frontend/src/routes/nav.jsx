import { Routes, Route, Navigate } from 'react-router-dom';
import VerPlanificacionDeDesarollo from "../pages/VisualizacionCompartida/HU36_verPlanificacionDeDesarollo/VerPlanifacionDeDesarollo.jsx";
import SeleccionarSprintVisualizar from "../pages/VisualizacionCompartida/HU37_visualizarSprint/seleccionarSprintVisualizar/seleccionarSprintVisualizar.jsx";
import VisualizarSprint from "../pages/VisualizacionCompartida/HU37_visualizarSprint/visualizarSprint.jsx";
import ModificarPlanificacion from "../pages/Estudiante/HU4_editarPlanificacion/editarPlanificacion.jsx";
import PublicarPlanificacion from "../pages/Estudiante/publicarPlanificacion/publicarPlanificacion.jsx";
import IniciarSesion from "../pages/Home/iniciarSesion.jsx";
import CrearCuentaEstudiante from '../pages/Home/crearCuentaEstudiante.jsx';
import IniciarSesionAdmin from '../pages/Home/iniciarSesionAdmin.jsx';
import RecuperarContraseña from '../pages/Home/recuperarContraseña.jsx'
function Nav() {
  return (
    <Routes>
      
      <Route path="/crearCuentaEstudiante" element={<CrearCuentaEstudiante />} />
      <Route path="/" element={<IniciarSesion />} />
      <Route path="/estoTieneQueSerUnLinkRandomSuperLargo" element={<IniciarSesionAdmin />} />  
      <Route path='/RecuperarContraseña'element={<RecuperarContraseña />}/>


      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Nav;
