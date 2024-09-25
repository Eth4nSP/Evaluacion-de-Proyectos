import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Box,
  CircularProgress
} from "@mui/material";
import Header from "../../../components/Header/header.jsx";
import Footer from "../../../components/Footer/footer.jsx";
import BackButtonAndTitle from "../../../components/Buttons/BackButtonAndTitle.jsx";

import TablaPlanificacion from "../../../components/tablaPlanificacionDeDesarollo/tablaPlanificacion.jsx";
import { getEmpresaData } from "../../../api/getEmpresa.jsx";
import { getPlanificacion } from "../../../api/getPlanificacion.jsx";

function ValidarPlanificacion() {
  const [openValidateDialog, setOpenValidateDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [groupComment, setGroupComment] = useState("");
  const [privateComment, setPrivateComment] = useState("");

  let { idEmpresa } = useParams();
  const [empresaData, setEmpresaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planificacionData, setPlanificacionData] = useState({
    aceptada: false,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empresa, planificacion] = await Promise.all([
          getEmpresaData(idEmpresa),
          getPlanificacion(idEmpresa),
        ]);
        setEmpresaData(empresa);
        setPlanificacionData(planificacion);
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
        setError(`Error en la solicitud: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idEmpresa]);

  const handleValidate = () => {
    setOpenValidateDialog(true);
  };

  const handleReject = () => {
    setOpenRejectDialog(true);
  };

  const confirmValidate = async () => {
    setOpenValidateDialog(false);
    try {
      const data = {
        idPlanificacion: 1,
        nota: 32,
        comentario: "groupComment",
        idDocente: 2  // Asume que tienes una forma de obtener el ID del docente actual
      };
      const response = await fetch('http://127.0.0.1:8000/api/addRevision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setSnackbar({ open: true, message: result.message });
        setPlanificacionData(prevState => ({...prevState, aceptada: true}));
      } else {
        throw new Error(result.message || 'Error al procesar la solicitud.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({ open: true, message: error.message });
    }
  };

  const confirmReject = () => {
    setOpenRejectDialog(false);
    setSnackbar({ open: true, message: "Planificación rechazada" });
    // Here you would typically send the rejection and comments to your backend
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <p>Error: {error}</p>;
  return (
    <Fragment>
      <Header />

      <Box className="box">
        <Box className="container">
          <BackButtonAndTitle title="Validar Planificación" />
          <Box
            className="pageBorder"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 3,
              minHeight: "calc(74vh)",
              border: "0.3rem solid black",
              borderRadius: "0.3rem",
              marginBottom: "1rem",
            }}
          >
            <TablaPlanificacion sprints={planificacionData.sprints} />

            <TextField
              label="Comentarios para el grupo"
              multiline
              rows={4}
              value={groupComment}
              onChange={(e) => setGroupComment(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Comentarios privados"
              multiline
              rows={4}
              value={privateComment}
              onChange={(e) => setPrivateComment(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Box
              sx={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleValidate}
              >
                Validar Planificación
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReject}
              >
                Rechazar Planificación
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openValidateDialog}
        onClose={() => setOpenValidateDialog(false)}
      >
        <DialogTitle>Confirmar Validación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea validar esta planificación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenValidateDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmValidate} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRejectDialog}
        onClose={() => setOpenRejectDialog(false)}
      >
        <DialogTitle>Confirmar Rechazo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea rechazar esta planificación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmReject} color="secondary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      <Footer />
    </Fragment>
  );
}

export default ValidarPlanificacion;
