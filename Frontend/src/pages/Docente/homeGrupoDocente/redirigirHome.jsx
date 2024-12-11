const apiHost = import.meta.env.VITE_HOST;
import { useEffect } from 'react';
import Loading from '../../../components/loading/loading';
import { useNavigate } from 'react-router-dom';
function RedirigirHome() {
    const navigate =useNavigate()
    useEffect(()=>{
      const getOriginDocente= async () =>{
        const url = `${apiHost}/docente/getGrupo`;
        const bodyFetch = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        }
  
        fetch(url, bodyFetch)
          .then((res) => {
            res.json().then((response)=>{
              console.log(response)
              const idGrupo = response.idGrupo
              localStorage.setItem('idGrupo', response.idGrupo);
              localStorage.setItem('nombreCompleto', response.nombreCompleto);
              if(idGrupo === -1){
                navigate("/homeDocente")
              }else{
                navigate("/homeDocente");
              }
              
            })
          })
          .catch((error) => {
            console.error("Error:", error)
          })
      }
      getOriginDocente()
    },[]) 
  return (
        <Loading></Loading>
  );
}

export default RedirigirHome;