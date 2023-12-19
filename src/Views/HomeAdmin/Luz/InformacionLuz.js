import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import releImage from "../../../Images/rele.svg"

import "../../../Styles/rele.css";
import Switch from "react-switch";

const InformacionLuz = () => {
  const [releInfo, setReleInfo] = useState({
    nombre: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState({});
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    obtenerDatosRele();
  }, []);

  const obtenerDatosRele = () => {
    Axios.get("https://api.katayaku.xyz/v1/iot/reles/1")
      .then((response) => {
        const { nombre } = response.data;
        setReleInfo({
          nombre,
        });
        setApiData({ nombre});
      })
      .catch((error) => {
        console.error("Error al obtener los datos del Rele:", error);
      });
  };

  const handleEdit = () => {
    setEditInfo({ ...releInfo });
    setEditMode(true);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prevEditInfo) => ({
      ...prevEditInfo,
      [name]: value,
    }));
  };

  const handleUpdateInfo = () => {
    Axios.put("https://api.katayaku.xyz/v1/iot/reles/1", editInfo)
      .then((response) => {
        setReleInfo({ ...editInfo });
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
      });
  };
  const relayId = 1; // Cambia esto según el ID del relay que deseas controlar
  const apiUrl = `https://api.katayaku.xyz/v1/iot/reles/${relayId}/`;

  const [relayStatus, setRelayStatus] = useState(false);
  useEffect(() => {
    // Obtener el estado inicial del relay al cargar el componente
    const fetchRelayStatus = async () => {
      try {
        const response = await fetch(apiUrl);
        const relayData = await response.json();
        setRelayStatus(relayData.status);
      } catch (error) {
        console.error("Error al obtener el estado inicial del relay:", error);
      }
    };

    fetchRelayStatus();
  }, [apiUrl]);
  const toggleRelay = async () => {
    try {
      // Cambiar el estado del relay
      const updatedData = {
        nombre:"rele1",
        topico:"relay/control",
        status: !relayStatus, // Cambiar el estado (invertir el valor actual)
      };

      // Realizar la solicitud para actualizar el estado del relay
      const updateResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (updateResponse.ok) {
        console.log("Estado del relay actualizado con éxito");
        setRelayStatus(!relayStatus); // Actualizar el estado local después de la actualización exitosa
      } else {
        console.error("Error al actualizar el estado del relay");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleEstadoChange = () => {
    Axios.get("https://api.katayaku.xyz/v1/iot/reles/1")
      .then((response) => {
        const nuevoEstado = !response.data.status;

        Axios.put("https://api.katayaku.xyz/v1/iot/reles/1", {
          nombre: "rele",
          topico: "relay/control",
          status: nuevoEstado,
        })
          .then((response) => {
            setReleInfo((prevInfo) => ({
              ...prevInfo,
              estado: nuevoEstado ? "Activo" : "Inactivo",
            }));
          })
          .catch((error) => {
            console.error("Error al cambiar el estado:", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtener el estado actual:", error);
      });
  };

  return (
    <div className="cuerpo">
      <Navbar />
      <Sidebar />
      <div className="conteiner row">
        <div className="container-fluid col-2">
          <div className="row justify-content-center align-items-center">
            <main role="main" className="col-md-6">
              <div className="tu-componente-card">
      <div className="row">
        <div className="col-6">
        <h5 className="card-title">
                    <span className="bi bi-lightbulb"></span>
                    {releInfo.nombre}
                  </h5>
          <label>
            Estado del Relay:
            <Switch 
              onChange={toggleRelay}
              checked={relayStatus}
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </label>
        </div>
        <div className="col-6">
          <img src={releImage} alt="Relé" />
        </div>
      </div>
    </div>
            </main>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacionLuz;
