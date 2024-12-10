import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const navigate = useNavigate();
  const fechaLimiteEntregaPlani = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  const paso = fechaLimiteEntregaPlani < new Date()
  const fecha = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  fecha.setDate(fecha.getDate() + 1);
  return (
    <CardGeneral
        titulo = "Lista y Datos"
        info = {<>
        </>}
        buttons={<> 
        {!paso&&<p>Se habilitara cuando pase la fecha de entrega planificacion: {fecha.toISOString().split('T')[0]}</p>}
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          onClick={() => navigate("/homeDocente/listaEmpresaCalificaciones")}
          disabled={!paso}
        >
            18_RECUPERAR CALIFICACIONES SPRINTS PREVIOS
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={() => navigate("/homeDocente/listaEmpresaVerCalificacionesSemanal")}
          disabled={!paso}
        >
            77_RECUPERAR SEGUIMIENTO SEMANALES PREVIOS
        </Button>
        </>}
    />
  );
}

export default CardResumen;