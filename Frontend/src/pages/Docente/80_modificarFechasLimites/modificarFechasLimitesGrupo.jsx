import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Box,
    Typography,
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import BaseUI from '../../../components/baseUI/baseUI';
import Loading from '../../../components/loading/loading';
import Error from '../../../components/error/error';
import { getOriginDocente } from '../../../api/getDatosLogin';
import InfoSnackbar from '../../../components/infoSnackbar/infoSnackbar';
import { fechasSubmit } from '../../../api/subirFechas';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

const StyledDialogTitle = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
}));
// eslint-disable-next-line react/prop-types
const CuadroDialogo = ({ open, onClose, title, description, onSubmit }) => {
    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <StyledDialogTitle>
                <Typography variant="h6" component="h2" id="customized-dialog-title">
                    {title}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.grey[300],
                        '&:hover': {
                            color: (theme) => theme.palette.grey[100],
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </StyledDialogTitle>
            <DialogContent dividers>
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="body1">{description}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button type="submit" color="primary" variant="contained" autoFocus onClick={onSubmit}>
                    Confirmar
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

const FormularioFechas = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
        autoHide: 6000,
    });
    const [cuadroDialogo, setCuadroDialogo] = useState(false);
    const [fechasIniciales, setFechasIniciales] = useState({
        fechaIniGestion: '',
        fechaLimiteEntregaEmpresa: '',
        fechaLimiteEntregaPlanificacion: '',
        fechaFinPlanificacion: '',
        fechaFinGestion: '',
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [err, setErr] = useState(false);

    const obtenerFechas = async () => {
        try {
            await getOriginDocente();
            const datos = {
                fechaIniGestion: localStorage.getItem('fechaIniGestion'),
                fechaFinGestion: localStorage.getItem('fechaFinGestion'),
            };
            setFechasIniciales({
                ...datos,
                fechaLimiteEntregaEmpresa: localStorage.getItem('fechaLimiteEntregaEmpresa'),
                fechaLimiteEntregaPlanificacion: localStorage.getItem('fechaLimiteEntregaPlanificacion'),
                fechaFinPlanificacion: localStorage.getItem('fechaFinPlanificacion'),
            });
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
            setErr(true);
        }
    };

    useEffect(() => {
        obtenerFechas();
    }, []);

    const esquemaValidacion = Yup.object().shape({
        fechaIniGestion: Yup.date()
            .required('Requerido'),
        fechaLimiteEntregaEmpresa: Yup.date()
            .required('Requerido')
            .min(
                Yup.ref('fechaIniGestion'),
                'Debe ser mayor o igual a la fecha de inicio de gestión.'
            )
            .test(
                'intervalo-7-dias',
                'Debe haber al menos 7 días entre la fecha de inicio de gestión y esta fecha.',
                function (value) {
                    const fechaIniGestion = this.resolve(Yup.ref('fechaIniGestion'));
                    return (
                        value && fechaIniGestion && 
                        new Date(value).getTime() >= new Date(fechaIniGestion).getTime() + 7 * 24 * 60 * 60 * 1000
                    );
                }
            ),
        fechaLimiteEntregaPlanificacion: Yup.date()
            .required('Requerido')
            .min(
                Yup.ref('fechaLimiteEntregaEmpresa'),
                'Debe ser mayor o igual a la fecha límite de entrega de empresas.'
            )
            .test(
                'intervalo-7-dias',
                'Debe haber al menos 7 días entre la fecha límite de entrega de empresas y esta fecha.',
                function (value) {
                    const fechaLimiteEntregaEmpresa = this.resolve(Yup.ref('fechaLimiteEntregaEmpresa'));
                    return (
                        value && fechaLimiteEntregaEmpresa && 
                        new Date(value).getTime() >= new Date(fechaLimiteEntregaEmpresa).getTime() + 7 * 24 * 60 * 60 * 1000
                    );
                }
            ),
        fechaFinPlanificacion: Yup.date()
            .required('Requerido')
            .min(
                Yup.ref('fechaLimiteEntregaPlanificacion'),
                'Debe ser mayor o igual a la fecha límite de entrega de planificación.'
            )
            .max(
                Yup.ref('fechaFinGestion'),
                'Debe ser menor o igual a la fecha final de gestión.'
            )
            .test(
                'intervalo-7-dias',
                'Debe haber al menos 7 días entre la fecha límite de entrega de planificación y esta fecha.',
                function (value) {
                    const fechaLimiteEntregaPlanificacion = this.resolve(Yup.ref('fechaLimiteEntregaPlanificacion'));
                    return (
                        value && fechaLimiteEntregaPlanificacion && 
                        new Date(value).getTime() >= new Date(fechaLimiteEntregaPlanificacion).getTime() + 7 * 24 * 60 * 60 * 1000
                    );
                }
            ),
        fechaFinGestion: Yup.date()
            .required('Requerido')
            .min(
                Yup.ref('fechaFinPlanificacion'),
                'Debe ser mayor o igual a la fecha final de planificación.'
            )
            .test(
                'intervalo-7-dias',
                'Debe haber al menos 7 días entre la fecha final de planificación y esta fecha.',
                function (value) {
                    const fechaFinPlanificacion = this.resolve(Yup.ref('fechaFinPlanificacion'));
                    return (
                        value && fechaFinPlanificacion && 
                        new Date(value).getTime() >= new Date(fechaFinPlanificacion).getTime() + 7 * 24 * 60 * 60 * 1000
                    );
                }
            ),
    });
    

    const manejarSubmit = async (valores) => {
        if (!verificarFechasCambiadas(valores)) {
            setSnackbar({
                open: true,
                message: 'Debe cambiar al menos una fecha antes de guardar.',
                severity: 'info',
                autoHide: 6000,
            });
            return;
        }
        try {
            const fechas = {
                idGrupo: Number(localStorage.getItem('idGrupo')),
                ...valores
            };
            console.log('Valores enviados:', fechas);
            const response = await fechasSubmit(fechas);
            console.log(response)
            setSnackbar({
                open: true,
                message: 'Fechas guardadas correctamente.',
                severity: 'success',
                autoHide: 6000,
            });
            obtenerFechas()
            setCuadroDialogo(false);
        } catch (error) {
            setSnackbar({
                open: true,
                message: `Hubo un error al guardar las fechas.${error}`,
                severity: 'error',
                autoHide: 6000,
            });
            console.log('Error al enviar fechas:', error);
        }
    };
    

    const verificarFechasCambiadas = (valores) => {
        const fechasModificadas = Object.keys(valores).some((key) => valores[key] !== fechasIniciales[key]);
        return fechasModificadas;
    };

    if (!isLoaded) return (
        <BaseUI
            titulo={`MODIFICAR FECHAS LIMITES DEL GRUPO`}
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack={`/homeDocente`}
            loading={false}
            error={{ error: false }}
        >
            <Loading />
        </BaseUI>
    );

    if (err) return (
        <BaseUI
            titulo={`MODIFICAR FECHAS LIMITES DEL GRUPO`}
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack={`/homeDocente`}
            loading={false}
            error={{ error: true }}
        >
            <Error />
        </BaseUI>
    );

    return (
        <BaseUI
            titulo={`MODIFICAR FECHAS LIMITES DEL GRUPO`}
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack={`/homeDocente`}
            loading={false}
            error={{ error: false }}
        >
            <Formik
                initialValues={fechasIniciales}
                enableReinitialize={true}
                validationSchema={esquemaValidacion}
                onSubmit={(valores) => manejarSubmit(valores)}
            >
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Gestión de Fechas
                            </Typography>
                            <Typography  align="center" gutterBottom sx={{color:'blue'}}>
                                *La hora de todas las fechas es 23:59
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Fecha de Inicio de Gestión"
                                        type="date"
                                        name="fechaIniGestion"
                                        value={values.fechaIniGestion}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputLabelProps={{ shrink: true }}
                                        error={touched.fechaIniGestion && Boolean(errors.fechaIniGestion)}
                                        helperText={touched.fechaIniGestion && errors.fechaIniGestion}
                                    />
                                </Grid>
                                <Box marginLeft={'1rem'} marginTop={'1rem'} width={'100%'}>
                                    <Box display={'flex'}>
                                        <TextField
                                            fullWidth
                                            label="Fecha inicial de Entrega de Empresas"
                                            type="date"
                                            value={values.fechaIniGestion}
                                            onBlur={handleBlur}
                                            disabled
                                            sx={{flexGrow:'1',}}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Fecha Límite de Entrega de Empresas"
                                            type="date"
                                            name="fechaLimiteEntregaEmpresa"
                                            value={values.fechaLimiteEntregaEmpresa}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.fechaLimiteEntregaEmpresa && Boolean(errors.fechaLimiteEntregaEmpresa)}
                                            helperText={touched.fechaLimiteEntregaEmpresa && errors.fechaLimiteEntregaEmpresa}
                                            sx={{flexGrow:'1'}}
                                        />
                                    </Box>
                                    <Box display={'flex'} marginTop={'1rem'}>
                                        <TextField
                                            fullWidth
                                            label="Fecha inicial de Entrega de planificacion"
                                            type="date"
                                            value={values.fechaLimiteEntregaEmpresa}
                                            onBlur={handleBlur}
                                            disabled
                                            sx={{flexGrow:'1'}}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Fecha Límite de Entrega de Planificación"
                                            type="date"
                                            name="fechaLimiteEntregaPlanificacion"
                                            value={values.fechaLimiteEntregaPlanificacion}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.fechaLimiteEntregaPlanificacion && Boolean(errors.fechaLimiteEntregaPlanificacion)}
                                            helperText={touched.fechaLimiteEntregaPlanificacion && errors.fechaLimiteEntregaPlanificacion}
                                            sx={{flexGrow:'1'}}
                                        />        
                                    </Box>
                                    <Box display={'flex'} marginTop={'1rem'}>  
                                        <TextField
                                            fullWidth
                                            label="Fecha Inicial de planificacion"
                                            type="date"
                                            value={values.fechaLimiteEntregaPlanificacion}
                                            onBlur={handleBlur}
                                            disabled
                                            sx={{flexGrow:'1'}}
                                        />                                    
                                        <TextField
                                            fullWidth
                                            label="Fecha Final de Planificación"
                                            type="date"
                                            name="fechaFinPlanificacion"
                                            value={values.fechaFinPlanificacion}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.fechaFinPlanificacion && Boolean(errors.fechaFinPlanificacion)}
                                            helperText={touched.fechaFinPlanificacion && errors.fechaFinPlanificacion}
                                            sx={{flexGrow:'1'}}
                                        />
                                    </Box>
                                </Box>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Fecha Final de Gestión"
                                        type="date"
                                        name="fechaFinGestion"
                                        value={values.fechaFinGestion}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputLabelProps={{ shrink: true }}
                                        error={touched.fechaFinGestion && Boolean(errors.fechaFinGestion)}
                                        helperText={touched.fechaFinGestion && errors.fechaFinGestion}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 3, display:'flex', justifyContent:'flex-end'}}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => window.location.reload()}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setCuadroDialogo(true)}
                                    sx={{marginLeft:'1rem'}}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </Box>
                        <CuadroDialogo
                            open={cuadroDialogo}
                            onClose={() => setCuadroDialogo(false)}
                            title="Confirmar Guardado"
                            description="¿Está seguro de que desea guardar los cambios realizados?"
                            onSubmit={handleSubmit}
                        />
                        <InfoSnackbar
                            openSnackbar={snackbar.open}
                            setOpenSnackbar={(open) => setSnackbar({ ...snackbar, open })}
                            message={snackbar.message}
                            severity={snackbar.severity}
                            autoHide={snackbar.autoHide}
                        />
                    </Form>
                )}
            </Formik>
        </BaseUI>
    );
};

export default FormularioFechas;
