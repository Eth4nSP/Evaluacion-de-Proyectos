import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    MenuItem,
} from '@mui/material';
import BaseUI from '../../../components/baseUI/baseUI';

const CrearFechasGestion = () => {
    const [fechas, setFechas] = useState({
        gestionSeleccionada: '',
        fechaIniGestion: '',
        fechaFinGestion: '',
        fechaLimiteEntregaEmpresa: '',
        fechaLimiteEntregaPlanificacion: '',
        fechaFinPlanificacion: ''
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const gestionesDisponibles = ['2024-1', '2024-2', '2025-1', '2025-2'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFechas((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleSubmit = async () => {
        if (Object.values(fechas).some((fecha) => !fecha)) {
            setSnackbar({
                open: true,
                message: 'Todos los campos son obligatorios.',
                severity: 'warning',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/crear-fechas-gestion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(fechas),
            });

            if (!response.ok) {
                throw new Error('Error al crear las fechas de gestión.');
            }

            //const data = await response.json();
            setSnackbar({
                open: true,
                message: 'Fechas de gestión creadas correctamente.',
                severity: 'success',
            });
            setFechas({
                gestionSeleccionada: '',
                fechaIniGestion: '',
                fechaFinGestion: '',
                fechaLimiteEntregaEmpresa: '',
                fechaLimiteEntregaPlanificacion: '',
                fechaFinPlanificacion: ''
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Ocurrió un error al crear las fechas.',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseUI
            titulo="CREAR FECHAS DE GESTIÓN"
            ocultarAtras={false}
            confirmarAtras={false}
            dirBack="/"
            loading={loading}
            error={{ error: false }}
        >
            <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Crear Fechas de Gestión
                </Typography>
                <TextField
                    fullWidth
                    select
                    label="Seleccionar Gestión"
                    name="gestionSeleccionada"
                    value={fechas.gestionSeleccionada}
                    onChange={handleChange}
                    margin="normal"
                >
                    {gestionesDisponibles.map((gestion) => (
                        <MenuItem key={gestion} value={gestion}>
                            {gestion}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Fecha de Inicio de Gestión"
                    type="date"
                    name="fechaIniGestion"
                    value={fechas.fechaIniGestion}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label="Fecha Final de Gestión"
                    type="date"
                    name="fechaFinGestion"
                    value={fechas.fechaFinGestion}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label="Fecha Límite de Entrega de Empresas"
                    type="date"
                    name="fechaLimiteEntregaEmpresa"
                    value={fechas.fechaLimiteEntregaEmpresa}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label="Fecha Límite de Entrega de Planificación"
                    type="date"
                    name="fechaLimiteEntregaPlanificacion"
                    value={fechas.fechaLimiteEntregaPlanificacion}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label="Fecha Final de Planificación"
                    type="date"
                    name="fechaFinPlanificacion"
                    value={fechas.fechaFinPlanificacion}
                    onChange={handleChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{ mt: 3 }}
                >
                    {loading ? 'Creando...' : 'Crear Fechas'}
                </Button>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </BaseUI>
    );
};

export default CrearFechasGestion;
