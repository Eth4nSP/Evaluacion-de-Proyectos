import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate();

  const fechaLimiteEntregaEmpresa = new Date(localStorage.getItem("fechaLimiteEntregaEmpresa"))
  const paso = fechaLimiteEntregaEmpresa < new Date()
  const fecha = new Date(localStorage.getItem("fechaLimiteEntregaEmpresa"))
  fecha.setDate(fecha.getDate() + 1);
  return (
    <CardGeneral
        titulo = "Planificacion"
        info = {<></>}
        buttons={<> 
        {!paso&&<p>Se habilitara cuando pase la fecha de entrega de empresas: {fecha.toISOString().split('T')[0]}</p>}
        
        <Button variant="contained" color="primary" fullWidth disabled={!paso} onClick={() => navigate("/visualizarPlanificacion")} >
          VISUALIZAR PLANIFICACIONES
        </Button>
        <Button variant="contained" color="primary" fullWidth disabled={!paso} onClick={() => navigate("/validarPlanificacion")}>
          VALIDAR PLANIFICACIONES
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  