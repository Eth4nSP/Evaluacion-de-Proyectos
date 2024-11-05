import { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, TextField, Paper, Grid, Link, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import BaseUI from '../../../components/baseUI/baseUI';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DecisionButtons from '../../../components/Buttons/decisionButtons';
import InfoSnackbar from '../../../components/infoSnackbar/infoSnackbar';
import CuadroDialogo from '../../../components/cuadroDialogo/cuadroDialogo';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/loading/loading'
import Error from "../../../components/error/error";
import { getSprintsEntregables } from "../../../api/getEmpresa"
import { actualizarSprint } from '../../../api/sprintApi';            
function CalificarSprintU() {
    const { idEmpresa, idSprint } = useParams();
    const [sprints, setSprints] = useState([])
    const [datosSprint, setDatosSprint] = useState(
        {
            idSprint: "2",
            numeroSprint: 2,
            nota: 70,
            comentario : 'LO HICIERON BASTANTE BIEN ESTE SPRINT',
            entregables: [
                { descripcionEntregable: "Manual técnico", archivoEntregable: "url/manual_tecnico.pdf" }
            ]
        }
    )
    const [notaSprint, setNotaSprint] = useState("");
    const [comentario, setComentario] = useState("")
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
        autoHide: 6000,
    });
    const [cuadroDialogo, setCuadroDialogo] = useState({
        open: false,
        onConfirm: () => {},
        title: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState({
        error: false,
        errorMessage: "",
        errorDetails: "",
    });
   
    useEffect(()=>{
        const fetchSprints = async ()=>{
            try {
                const [sprintData] = await Promise.all ([
                    getSprintsEntregables(idEmpresa),
                ])
                console.log(sprintData.sprints)
                const newSprints = sprintData.sprints;
                setSprints(newSprints)
                const newSprint = newSprints.filter((sprint) => {
                    const es = sprint.idSprint === Number(idSprint);
                    console.log(es)
                    return es
                })
                console.log(...newSprint);
                setDatosSprint(...newSprint)
                const nota = newSprint[0].nota;
                setNotaSprint( nota=== null? '' : nota)
                const comentarioNew = newSprint[0].comentario
                setComentario(comentarioNew===null? "Comentario para el grupo (máximo 200 caracteres)":comentarioNew)
            } catch (error) {
                setError({
                    error: true,
                    errorMessage: "Ha ocurrido un error",
                    errorDetails: error.message,
                });
                console.error("Error al cargar la tarea:", error);
            }finally {
                setLoading(false);
            }
        }
        fetchSprints();
    },[])
    const handleComentarioChange = (event) => {
        const value = event.target.value;
        setComentario(value);
    };
    const handleNotaChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && (Number(value)<=100 && Number(value)>=0)) {
            setNotaSprint(value);
        }
    };
    const handleCancel = () => {
        setCuadroDialogo({
            open: true,
            title: "Descartar",
            description:
            "Esta acción no se puede deshacer. Todos los cambios realizados se perderán.  ¿Está seguro?",
            onConfirm: () => window.location.reload(),
        });
    };
    const handleSave = () => {
        setCuadroDialogo({
            open: true,
            title: "Guardar",
            description:
            "Esta acción guardará todos los cambios realizados en la tarea. ¿Está seguro?",
            onConfirm: handleSubmit,  
        });
    };
    const handleSubmit = async () =>{
        if(comentario.length < 20) {
            console.log('hola   ') 
            return
        }
        try {
            const response = await actualizarSprint(idSprint, comentario, notaSprint);
            if (response) { 
                setSnackbar({
                open: true,
                message: "Se subió correctamente todo",
                severity: "success",
                autoHide: 6000,
                });
            }
        } catch (error) {
        console.error("Error al actualizar la tarea:", error);
            setSnackbar({
                open: true,
                message: `Hubo un error al momento de subir, error: ${error}`,
                severity: "error",
                autoHide: 60000,
            });
        }
    }
    
    if (loading) return <Loading></Loading>
    if(!error){
        return <Error errorMessage={error.errorMessage} errorDetails={error.errorDetails}></Error>
    }
    return (
        <BaseUI
            titulo={'MODIFICAR TAREA'}
            ocultarAtras={false}
            confirmarAtras={true}
            dirBack={`/${idEmpresa}/calificarSprints`}
        >
        <Container>
            
            <Typography variant="h4" className="titulo">
                SPRINT {datosSprint.numeroSprint}
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper className="entregables">
                    <Typography variant="h6">Entregables</Typography>
                    {datosSprint.entregables.map((entregable, index) => (
                        <Box key={index} className="entregableItem">
                        <Checkbox
                            checked={entregable.archivoEntregable !== null}
                        />
                        <Typography>{entregable.descripcionEntregable}</Typography>
                        </Box>
                    ))}
                </Paper>
            </Grid>

            <Grid item xs={6}>
                <Paper className="archivos">
                    <Typography variant="h6">Archivos</Typography>
                    {datosSprint.entregables.map((entregable, index) => (
                        <Box key={index} className="archivoItem">
                            <PictureAsPdfIcon></PictureAsPdfIcon>
                            <div className='archivosTexto'>
                                <Link href={entregable.archivoEntregable} target="_blank" className="archivoLink">
                                    {entregable.descripcionEntregable}.pdf
                                </Link>
                                <Typography className={`estadoArchivo`}>
                                    {entregable.archivoEntregable ? 'Entregado' : 'Pendiente'}
                                </Typography>
                            </div>
                        </Box>
                    ))}
                </Paper>
            </Grid>
            </Grid>

            <Paper className="comentarioNota">            
            <form autoComplete="off" onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <Typography variant="subtitle1"></Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={comentario}
                    onChange={handleComentarioChange}
                    variant="outlined"
                    placeholder='Comentario para el grupo (máximo 200 caracteres)'
                    inputProps={{ maxLength: 200 }}
                    className="inputComentario"
                    error = {comentario.length < 20}
                    helperText = {comentario.length < 20 && "Debe tener un minimo de 20 caracteres"}
                />
                <Box className="notaField">
                    <Typography variant="h6" className="notaLabel">NOTA:</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={notaSprint}
                        onChange={handleNotaChange}
                        inputProps={{
                            type: 'number'
                        }}
                        className="notaInput"
                    />
                </Box>
                <DecisionButtons
                    rejectButtonText="Descartar"
                    validateButtonText="Guardar"
                    onReject={handleCancel}
                    onValidate={handleSave}
                    disabledButton={0}
                />
            </FormControl>
            </form>
            </Paper>
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
                autoHide={snackbar.autoHide}
            />
        </Container>
        </BaseUI>
    );
}

export default CalificarSprintU;

    // Definición de estilos usando styled-components
    const Container = styled('div')`
    padding: 1.5rem;
    
    .titulo {
        margin-bottom: 1rem;
    }
    
    .entregables, .archivos {
        padding: 1rem;
        margin-top: 1rem;
    }
    
    .entregableItem, .archivoItem {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .archivoItem{
        margin-bottom: 0.6rem;
    }
    
    .archivoLink {
        color: #3f51b5;
        text-decoration: none;
    }
    
    .estadoArchivo {
        color: gray;
    }
    .estadoArchivo-red{
        
    }
    .comentarioNota {
        padding: 1rem;
        margin-top: 1rem;
    }
    
    .inputComentario {
        margin-top: 0.5rem;
    }
    
    .notaField {
        display: flex;
        align-items: center;
        margin-top: 1rem;
    
        .notaLabel {
        margin-right: 0.5rem;
        }
    
        .notaInput {
            width: 5rem;
        }
    }
    .archivosTexto{
        margin-left: 1rem;
    }
`;

