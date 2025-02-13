import { Button} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const fechaLimiteEntregaPlani = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  const paso = fechaLimiteEntregaPlani < new Date()
  const fecha = new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))
  fecha.setDate(fecha.getDate() + 1);
  const navigate = useNavigate()
  return (
    <CardGeneral
        titulo = "Segumiento Entregables Sprint"
        info = {<>
        </>}
        buttons={<> 
        {!paso&&<>
          <p>Se habilitara cuando pase la fecha de entrega planificacion: {fecha.toISOString().split('T')[0]}</p>
        </>}
        <Button 
        variant="contained" 
        color="primary" 
        fullWidth disabled={!paso}
        onClick={()=>navigate("/visualizarSprint")}
        >
            VISUALIZAR  SPRINT
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          onClick = {() => navigate("/homeDocente/listaEmpresaCalificarSprints")}
          disabled={!paso}
        >
            34_CALIFICAR SPRINT
        </Button>
        </>}
    />
  );
}

export default CardResumen;