import {Button, Typography} from "@mui/material";
import CardGeneral from '../cardGeneral'
import { useNavigate } from "react-router-dom";
function CardResumen() {
  const fechaFinPlanificacion = new Date(`{localStorage.getItem("fechaFinPlanificacion")}T23:59:59`)
  const paso = new Date()>fechaFinPlanificacion
  const empresa = localStorage.getItem("idEmpresa");
  const fechaLimiteEntregaPlanificacion = new Date(`${localStorage.getItem("fechaLimiteEntregaPlanificacion")}T23:59:58`)
  const inicio = fechaLimiteEntregaPlanificacion < new Date()
  const navigate = useNavigate();
  return (
    <CardGeneral
        titulo = "Progreso del Proyecto"
        info = {<>
        {inicio?
          <>
            <Typography>El Sprint Inicio el: {localStorage.getItem('fechaIniSprint')} a las 23:59.59</Typography>
            <Typography>El Sprint actual termina el: {localStorage.getItem('fechaLimiteSprint')} a las 23:59</Typography>
          </>
          :
          <Typography>El seguimiento iniciara: {localStorage.getItem('fechaLimiteEntregaPlanificacion')} a las 23:59</Typography>
        }
        </>}
        buttons={<> 
        {!paso && inicio?<Button variant="contained" color="primary" fullWidth >
          SUBIR ENTREGABLES SPRINTS
        </Button>:<></>}
        <Button variant="outlined" color="primary" fullWidth 
          onClick={() => navigate(`/visualizarSprint/empresa/${empresa}`)}
        >
          VISUALIZAR SPRINTS
        </Button>
        </>}
    />
  );
}

export default CardResumen;
  