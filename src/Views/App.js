import React from "react";
import "../Styles/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import InformacionLuz from './HomeAdmin/Luz/InformacionLuz'
import TemporizadorLuz from './HomeAdmin/Luz/TemporizadorLuz'
import AlertasLuz from './HomeAdmin/Luz/AlertasLuz'
import NotificacionesLuz from './HomeAdmin/Luz/NotificacionesLuz'
import InformacionAire from './HomeAdmin/Aire/InformacionAire'
import AlertasAire from './HomeAdmin/Aire/AlertasAire'
import Homepage from './HomeAdmin/Homepage'
import Usuarios from './HomeAdmin/Usuarios'
import Empresas from './HomeAdmin/Empresas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/informacionluz" element={<InformacionLuz />} />
        <Route path="/temporizadorluz" element={<TemporizadorLuz/>} />
        <Route path="/alertasluz" element={<AlertasLuz/>} />
        <Route path="/notificacionesluz" element={<NotificacionesLuz/>} />
        <Route path="/informacionaire" element={<InformacionAire/>} />
        <Route path="/alertasaire" element={<AlertasAire/>} />
        <Route path="/homepage" element={<Homepage/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/empresas" element={<Empresas/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
