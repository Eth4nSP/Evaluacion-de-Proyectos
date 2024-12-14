const apiHost = import.meta.env.VITE_HOST;
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Box,
    Typography,
    Grid,
    Button,
    MenuItem
} from '@mui/material';
import BaseUI from '../../../components/baseUI/baseUI';
import InfoSnackbar from '../../../components/infoSnackbar/infoSnackbar';

const FormularioCrearGrupo = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
        autoHide: 6000,
    });

    const currentYear = new Date().getFullYear();
    const gestionesDisponibles = [`${currentYear}-1`, `${currentYear}-2`];

    const datosIniciales = {
        numGrupo: '',
        gestionGrupo: gestionesDisponibles[0],
        codigoAcceso: '',
        descripcion: '',
        fechaIniGestion: '',
        fechaLimiteEntregaEmpresa: '',
        fechaLimiteEntregaPlanificacion: '',
        fechaFinPlanificacion: '',
        fechaFinGestion: '',
    };

    const esquemaValidacion = Yup.object().shape({
        numGrupo: Yup.number().required('Requerido'),
        gestionGrupo: Yup.string().required('Requerido'),
        codigoAcceso: Yup.string().required('Requerido'),
        descripcion: Yup.string(),
        fechaIniGestion: Yup.date().required('Requerido'),
        fechaLimiteEntregaEmpresa: Yup.date()
            .required('Requerido')
            .min(Yup.ref('fechaIniGestion'), 'Debe ser mayor o igual a la fecha de inicio de gestión.')
            .test('intervalo-7-dias', 'Debe haber al menos 7 días entre la fecha de inicio de gestión y esta fecha.', function (value) {
                const fechaIniGestion = this.resolve(Yup.ref('fechaIniGestion'));
                return (
                    value && fechaIniGestion &&
                    new Date(value).getTime() >= new Date(fechaIniGestion).getTime() + 7 * 24 * 60 * 60 * 1000
                );
            }),
        fechaLimiteEntregaPlanificacion: Yup.date()
            .required('Requerido')
            .min(Yup.ref('fechaLimiteEntregaEmpresa'), 'Debe ser mayor o igual a la fecha inicial de entrega de planificación.')
            .test('intervalo-7-dias', 'Debe haber al menos 7 días entre la fecha inicial de entrega de planificación y esta fecha.', function (value) {
                const fechaLimiteEntregaEmpresa = this.resolve(Yup.ref('fechaLimiteEntregaEmpresa'));
                return (
                    value && fechaLimiteEntregaEmpresa &&
                    new Date(value).getTime() >= new Date(fechaLimiteEntregaEmpresa).getTime() + 7 * 24 * 60 * 60 * 1000
                );
            }),
        fechaFinPlanificacion: Yup.date()
            .required('Requerido')
            .min(Yup.ref('fechaLimiteEntregaPlanificacion'), 'Debe ser mayor o igual a la fecha inicial planificación.')
            .max(Yup.ref('fechaFinGestion'), 'Debe ser menor o igual a la fecha final de gestión.')
            .test('intervalo-30-dias', 'Debe haber al menos 30 días entre la fecha inicial de la planificación y esta fecha.', function (value) {
                const fechaLimiteEntregaPlanificacion = this.resolve(Yup.ref('fechaLimiteEntregaPlanificacion'));
                return (
                    value && fechaLimiteEntregaPlanificacion &&
                    new Date(value).getTime() >= new Date(fechaLimiteEntregaPlanificacion).getTime() + 30 * 24 * 60 * 60 * 1000
                );
            }),
        fechaFinGestion: Yup.date()
            .required('Requerido')
            .min(Yup.ref('fechaFinPlanificacion'), 'Debe ser mayor o igual a la fecha final de planificación.')
            .test('intervalo-7-dias', 'Debe haber al menos 7 días entre la fecha final de planificación y esta fecha.', function (value) {
                const fechaFinPlanificacion = this.resolve(Yup.ref('fechaFinPlanificacion'));
                return (
                    value && fechaFinPlanificacion &&
                    new Date(value).getTime() >= new Date(fechaFinPlanificacion).getTime() + 7 * 24 * 60 * 60 * 1000
                );
            }),
    });

    const manejarSubmit = async (valores) => {
        try {
            const response = await fetch(`${apiHost}}/crearGrupo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(valores),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el grupo.');
            }

            const responseData = await response.json();

            setSnackbar({
                open: true,
                message: responseData.message,
                severity: 'success',
                autoHide: 6000,
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Error al crear el grupo.',
                severity: 'error',
                autoHide: 6000,
            });
        }
    };

    return (
        <BaseUI
            titulo={`CREAR GRUPO`}
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack={`/`}
            loading={false}
            error={{ error: false }}
        >
            <Formik
                initialValues={datosIniciales}
                enableReinitialize={true}
                validationSchema={esquemaValidacion}
                onSubmit={(valores) => manejarSubmit(valores)}
            >
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Crear Grupo
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Número de Grupo"
                                        name="numGrupo"
                                        value={values.numGrupo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.numGrupo && Boolean(errors.numGrupo)}
                                        helperText={touched.numGrupo && errors.numGrupo}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Gestión"
                                        name="gestionGrupo"
                                        value={values.gestionGrupo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.gestionGrupo && Boolean(errors.gestionGrupo)}
                                        helperText={touched.gestionGrupo && errors.gestionGrupo}
                                    >
                                        {gestionesDisponibles.map((gestion) => (
                                            <MenuItem key={gestion} value={gestion}>
                                                {gestion}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Código de Acceso"
                                        name="codigoAcceso"
                                        value={values.codigoAcceso}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.codigoAcceso && Boolean(errors.codigoAcceso)}
                                        helperText={touched.codigoAcceso && errors.codigoAcceso}
                                    />
                                </Grid>
                                <Grid item xs={12}> 
                                    <Typography color='blue' textAlign='center'>*Cuando termina una fase inmediatamente comienza la proxima   </Typography>
                                    <Typography color='blue'textAlign='center'>*todas las fechas terminan en 23:59  </Typography>
                                </Grid>
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
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Fecha Inicial de Entrega de Empresas"
                                        type="date"
                                        value={values.fechaIniGestion}
                                        onBlur={handleBlur}
                                        InputLabelProps={{ shrink: true }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Fecha Inicial de Entrega de Planificación"
                                        type="date"
                                        value={values.fechaLimiteEntregaEmpresa}
                                        onBlur={handleBlur}
                                        InputLabelProps={{ shrink: true }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Fecha Inicial de Planificación"
                                        type="date"
                                        value={values.fechaLimiteEntregaPlanificacion}
                                        onBlur={handleBlur}
                                        InputLabelProps={{ shrink: true }}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                    />
                                </Grid>
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size='medium'
                                        multiline
                                        rows={10}
                                        maxRows={10}
                                        label="Descripción"
                                        name="descripcion"
                                        value={values.descripcion}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.descripcion && Boolean(errors.descripcion)}
                                        helperText={touched.descripcion && errors.descripcion}
                                        inputProps={{ maxLength: 1000 }}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => window.location.reload()}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginLeft: '1rem' }}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </Box>
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

export default FormularioCrearGrupo;
