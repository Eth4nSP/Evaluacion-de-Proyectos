import{c as t,j as e,u as p,B as h,T as x,L as l,a as d,b as g,d as u,C as f,G as j}from"./index-DGKVFY4k.js";import{D as L,A as E,S as I}from"./Star-b7jzIi6U.js";const D=t(e.jsx("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"}),"People"),S=t(e.jsx("path",{d:"M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3m1-4.3h-2V7h2z"}),"Report");function P({open:s,toggleDrawer:o}){const n=p(),i=new Date(localStorage.getItem("fechaLimiteEntregaEmpresa"))<new Date,c=new Date(localStorage.getItem("fechaLimiteEntregaPlanificacion"))<new Date,r=[...i?[{text:"Visualizar Planificaciones",icon:e.jsx(E,{}),path:"/noTieneNada"}]:[],...c?[{text:"Visualizar Seguimiento Semanal",icon:e.jsx(f,{}),path:"/homeDocente/listaEmpresaCalificaciones"}]:[],{text:"Lista de Estudiantes",icon:e.jsx(D,{}),path:"/homeDocente/listaEstudiantes"},{text:"Lista de Grupo-Empresas",icon:e.jsx(j,{}),path:"/homeDocente/listaEmpresas"},{text:"Calificaciones",icon:e.jsx(I,{}),path:"/calificaciones"},{text:"Reportes",icon:e.jsx(S,{}),path:"/reportes"}];return e.jsx(L,{anchor:"left",open:s,onClose:()=>o(!1),children:e.jsxs(h,{sx:{width:250},children:[e.jsx(x,{variant:"h6",sx:{padding:"16px",backgroundColor:"#114093",color:"white"},children:"Herramientas"}),e.jsx(l,{children:r.map((a,m)=>e.jsxs(d,{button:!0,onClick:()=>n(a.path),sx:{borderBottom:"solid 0.01rem grey",borderRadius:"0.8rem",boxShadow:"0 4px 2px -2px rgba(0, 0, 0, 0.3)"},children:[e.jsx(g,{children:a.icon}),e.jsx(u,{primary:a.text})]},m))})]})})}export{P as default};