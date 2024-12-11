const apiHost = import.meta.env.VITE_HOST;
import { Fragment, useEffect, useState } from 'react';
import Header from '../../../components/baseUI/Header/header.jsx';
import Footer from '../../../components/baseUI/Footer/footer.jsx';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function ListaGruposDocente() {
  const [gruposEnCurso, setGruposEnCurso] = useState([]);
  const [gruposPasados, setGruposPasados] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await fetch(apiHost+'/docente/visualizarSemestres',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        });
        const data = await response.json();
        console.log(data)
        const fechaActual = new Date();

        const enCurso = data.filter((grupo) => {
          const fechaFin = new Date(grupo.fechaFinGestion);
          return fechaFin >= fechaActual;
        });

        const pasados = data.filter((grupo) => {
          const fechaFin = new Date(grupo.fechaFinGestion);
          return fechaFin < fechaActual;
        });

        setGruposEnCurso(enCurso);
        setGruposPasados(pasados);
        console.log(window.location.pathname)
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
      }
    };

    fetchGrupos();
  }, []);

  const handleClick = (idGrupo) => {
    localStorage.setItem('idGrupo', idGrupo)
    navigate("/homeDocente")
  };

  return (
    <Fragment>
      <Header />
      <Container maxWidth="lg" sx={{ paddingTop: 4, marginTop:'5rem', minHeight:'72.9vh' }}>
        <Typography variant="h4" gutterBottom color='blue'>
          Lista de Grupos
        </Typography>

        <Typography variant="h5" gutterBottom>
          Grupos en Curso
        </Typography>
        <Grid container spacing={3}>
          {gruposEnCurso.length > 0 ? (
            gruposEnCurso.map((grupo) => (
              <Grid item xs={12} sm={6} md={4} key={grupo.id}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">{grupo.gestionGrupo} / Grupo: {grupo.numGrupo}</Typography>
                    <Typography variant="body2">
                      Fecha de Inicio: {grupo.fechaIniGestion}
                    </Typography>
                    <Typography variant="body2">
                      Fecha de Fin: {grupo.fechaFinGestion}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClick(grupo.id)}
                      sx={{ marginTop: 2 }}
                    >
                      Seleccionar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" marginTop={'1rem'} color='red'>No hay grupos en curso.</Typography>
          )}
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
          Grupos Pasados
        </Typography>
        <Grid container spacing={3}>
          {gruposPasados.length > 0 ? (
            gruposPasados.map((grupo) => (
              <Grid item xs={12} sm={6} md={4} key={grupo.id}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">{grupo.gestionGrupo}</Typography>
                    <Typography variant="body2">
                      Fecha de Inicio: {grupo.fechaIniGestion}
                    </Typography>
                    <Typography variant="body2">
                      Fecha de Fin: {grupo.fechaFinGestion}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleClick(grupo.id)}
                      sx={{ marginTop: 2 }}
                    >
                      Seleccionar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" marginTop={'1rem'} color='red'>No hay grupos pasados.</Typography>
          )}
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default ListaGruposDocente;
