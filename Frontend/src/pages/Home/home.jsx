import { Fragment } from "react";
import Footer from "../../components/Footer/footer.jsx";
import Header from "../../components/Header/header.jsx";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const handleNavigateToVerPlanificacion = () => {
    navigate("/homeDocente/homeGrupoDocente/verPlanificacion");
  };
  const handleNavigateToEditarPlanificacion = () => {
    navigate(
      "/homeEstudiante/homeGrupoEstudiante/PlanificacionInicial/Empresa/1"
    );
  };
  const handleNavigateToValidarEmpresas = () => {
    navigate("/homeDocente/homeGrupoDocente/validarPlanificacion/");
  };
  return (
    <Fragment>
      <Header />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)", // Adjust this value based on your header and footer height
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToVerPlanificacion}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
          }}
        >
          Go to Ver Planificacion
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToEditarPlanificacion}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
          }}
        >
          Go to Editar Planificacion
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigateToValidarEmpresas}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
          }}
        >
          Go to ValidarEmpresas
        </Button>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Home;
