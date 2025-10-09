
import React, { useEffect, useState } from "react";
import { useEstate } from 'react';
import "./style.css";


function Home () {
	const [departamentos, setDepartamentos] = useState(null);
    const [capitales, setCapitales] = useState(null);
	const [modo, setModo] = useState("departamentos");
	const [busqueda, setBusqueda] = useState("");

	useEffect(() => {
    const urlDpt =
      "https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/4974a1b1cab3ac606dd96aa2d34d6e7c8e007daf/departamentosglobal.json";
    const urlCpt =
      "https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/4974a1b1cab3ac606dd96aa2d34d6e7c8e007daf/capitalesglobal.json";

    const fetchJson = async (url, setter) => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Error al cargar JSON: " + resp.status);
        const json = await resp.json();
        setter(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchJson(urlDpt, setDepartamentos);
    fetchJson(urlCpt, setCapitales);
	
  }, []);
  const getListaMostrar = () => {
	if (modo === "departamentos"&& departamentos) {
		return departamentos.data?.dpt ?? [];
	}
	if (modo === "capitales" && capitales) {
		return capitales.data?.cpt ?? [];
	}
	return [];
  }
  const lista = getListaMostrar();

  //
  let listaFiltrada;

  if (busqueda.length >= 2) {
    listaFiltrada = lista.filter((unavuelta) =>
      unavuelta.nm.toLowerCase().includes(busqueda.toLowerCase())
    );
  } else {
    listaFiltrada = lista; // sin filtrar
  };


	return (
		<>
		<div >
			<button onClick={() => setModo("departamentos")}> Mostrar Departamentos</button>
			<button onClick={() => setModo("capitales")}> Mostrar Capitales</button>
		</div>

		<div>
			<input
			type='text'
			placeholder='Buscar por nombre...'
			value={busqueda}
			onChange={(e) => setBusqueda(e.target.value)}
			/>
		</div>	
		<div className="lugar">
			<ul className="lista">
        {listaFiltrada.length > 0 ? (
          listaFiltrada.map((unelementociclo) => (
            <li key={unelementociclo.id}>
              {unelementociclo.nm}
            </li>
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </ul>
		</div>
		</>
	);
};
export default Home;

