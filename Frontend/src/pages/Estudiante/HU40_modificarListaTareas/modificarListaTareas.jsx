import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BaseUI from "../../../components/baseUI/baseUI.jsx";
import CuadroDialogo from "../../../components/cuadroDialogo/cuadroDialogo.jsx";
import DecisionButtons from "../../../components/Buttons/decisionButtons.jsx";
import InfoSnackbar from "../../../components/infoSnackbar/infoSnackbar.jsx";
import {
  getTareasSemana,
  updateTareasSemana,
} from "../../../api/validarTareas/tareas.jsx";

export default function ModificarListaTareas() {
  const { idEmpresa, idSprint, idSemana } = useParams();
  const [tasks, setTasks] = useState([]);
  const [tasksEliminadas, setTasksEliminadas] = useState([]);
  const [numSemana, setNumSemana] = useState(0);
  const [numSprint, setNumSprint] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorTexto, setErrorTexto] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [cuadroDialogo, setCuadroDialogo] = useState({
    open: false,
    onConfirm: () => {},
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      const tareas = await getTareasSemana(idEmpresa, idSprint, idSemana);
      setNumSemana(tareas.numeroSemana);
      setNumSprint(tareas.numeroSprint);
      setTasks(tareas.tareas);
      const tareasV = tareas.tareas
      const newTextos = tareasV.map(()=>false)
      setErrorTexto(newTextos)
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error al obtener las tareas de la semana");
      setSnackbar({
        open: true,
        message: "Error al cargar las tareas",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if(tasks.length > 30) return;
    setTasks([...tasks, { idTarea: null, nombreTarea: `Nueva tarea ${tasks.length+1}` }]);
    setErrorTexto([...errorTexto, false])
  };

  const handleDeleteTask = (index) => {
    setCuadroDialogo({
      open: true,
      title: "Eliminar tarea",
      description: "Esta acción eliminará la tarea seleccionada. ¿Estás seguro?",
      onConfirm: () => {
        const newTasks = tasks.filter((task, i) => i !== index)
        const eliminada = tasks[index];
        setTasksEliminadas([...tasksEliminadas, eliminada])
        setTasks(newTasks);
        setCuadroDialogo({ ...cuadroDialogo, open: false });
      },
    });
  };

  const handleEditTask = (index, newName) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, nombreTarea: newName } : task
    );
    setTasks(newTasks);
    const coincidencias = [];
    console.log('este es el nuevo: '+newName)
    newTasks.forEach((tarea, i) => {
      console.log(tarea.nombreTarea)
      if (tarea.nombreTarea === newName) {
        if(i !== index) coincidencias.push(i);
      }
    });
    if (coincidencias.length > 0) {
      coincidencias.push(index)
      const newTextoError = errorTexto.map((err, i) =>
        coincidencias.includes(i) ? true : err
      );
      setErrorTexto(newTextoError);
    }else{
      const newTextos = newTasks.map(()=>false)
      setErrorTexto(newTextos)
    }
  };
  

  const handleReject = () => {
    setCuadroDialogo({
      open: true,
      title: "Descartar cambios",
      description: "¿Estás seguro de que deseas descartar los cambios?",
      onConfirm: () => window.location.reload(),
    });
  };

  const handleSave = () => {
    setCuadroDialogo({
      open: true,
      title: "Guardar cambios",
      description:"¿Estás seguro de que quieres guardar los cambios?",
      onConfirm: handleConfirmSave,
    });
  };

  const handleConfirmSave = async () => {
    if(errorTexto.includes(true)){
      setSnackbar({
        open: true,
        message: "Debe revisar los nombres de las tareas, hay repeticion de nombres",
        severity: "info",
      });
      return
    }
    try {
      const result = await updateTareasSemana(
        idEmpresa,
        idSprint,
        idSemana,
        tasks
      );
      setSnackbar({ open: true, message: result.message, severity: "success" });
    } catch (error) {
      console.log(error)
      setSnackbar({
        open: true,
        message: "Error al guardar las tareas",
        severity: "error",
      });
    }
    setCuadroDialogo({ ...cuadroDialogo, open: false });
  };

  return (
    <BaseUI
      titulo="MODIFICAR LISTA SEMANAL DE TAREAS"
      ocultarAtras={false}
      confirmarAtras={false}
      dirBack="/"
      loading={loading}
      error={error}
    >
        <Container maxWidth="md" sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            SPRINT {numSprint}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 3 }}
          >
            SEMANA {numSemana}
          </Typography>
          {tasks.length === 0 ? (
            <Typography variant="h4" align="center" sx={{ mb: 5.4, mt: 6 }}>
              No hay tareas aún
            </Typography>
          ) : (
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {tasks.map(
                (task, index) =>(
                    <>
                    <ListItem
                      key={task.idTarea}
                      sx={{ bgcolor: "#CFD4E1", mb: 1, py: 2, px: 3,
                        border: "solid 0.1rem transparent", // Borde inicial transparente
                        ":focus-within": {
                          border: "solid 0.1rem blue", // Cambia a azul cuando el TextField tiene foco
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 1,
                        }}
                      >
                        <TextField
                          autoFocus
                          value={task.nombreTarea}
                          onChange={(e) =>
                            handleEditTask(index, e.target.value)
                          }
                          variant="standard"
                          fullWidth
                          InputProps={{
                            disableUnderline: true,
                            style: {
                              fontSize: "1.25rem",
                              fontWeight: "medium",
                            },
                          }}
                          error={errorTexto[index]}
                          helperText={errorTexto[index] && 'No tiene que ser un nombre similar'}
                        />
                      </Box>
                      
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteTask(index)}
                        sx={{ ml: 2 }}
                      >
                        Eliminar
                      </Button>
                    </ListItem>
                    </>
                  )
              )}
            </List>
          )}
          <Box>
            {tasks.length < 30 &&
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddTask}
              >
                Añadir tarea
              </Button>
            }
          </Box>
          <DecisionButtons
            rejectButtonText="Descartar"
            validateButtonText="Guardar cambios"
            onReject={handleReject}
            onValidate={handleSave}
            disabledButton={0}
          />
          <CuadroDialogo
            open={cuadroDialogo.open}
            onClose={() => setCuadroDialogo({ ...cuadroDialogo, open: false })}
            title={cuadroDialogo.title}
            description={cuadroDialogo.description}
            onConfirm={cuadroDialogo.onConfirm}
          />
          <InfoSnackbar
            openSnackbar={snackbar.open}
            setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
            message={snackbar.message}
            severity={snackbar.severity}
          />
        </Container>
    </BaseUI>
  );
}
