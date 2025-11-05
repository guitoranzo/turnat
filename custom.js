function beforeMapLoads() {
  console.log("Before map loads function");

  // Esta función se llama antes de que se cargue el mapa y es útil para manipular el objeto de configuración,
  // por ejemplo, para agregar una nueva capa personalizada.

  // // Create a layer which is based on a query string in the URL - this shows the US state based on the query
  // // value, eg bootleaf.html/?query=california
  // var statesConfig = {
  // 	"id": "us_states",
  // 	"name": "States",
  // 	"type": "agsDynamicLayer",
  // 	"url": "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/",
  // 	"layers": [5],
  // 	"useCors": false,
  // 	"visible": true
  // }

  // var query = getURLParameter('query');
  // if(query) {
  // 	statesConfig.layerDefs = "5: STATE_NAME = '" + query + "'";
  // 	statesConfig.name += " (" + query + ")";
  // }
  // // Add this layer to the TOC and map.
  // config.layers.push(statesConfig);
  // for (i in config.tocCategories){
  // 	if (config.tocCategories[i]['name'] === 'ArcGIS Layers') {
  // 		config.tocCategories[i]['layers'].push(statesConfig.id);
  // 	}
  // }

  // // If there are any layers defined in the URL, add this layer to the list so it draws by default
  // if(bootleaf.layerParams.length > 0){
  // 	bootleaf.layerParams.push(statesConfig.id);
  // }

  // Continue to load the map
  loadMap();
}

function afterMapLoads() {
  // Esta función se ejecuta después de que se haya cargado el mapa. Da acceso a bootleaf.map, bootleaf.TOCcontrol, entre otros.

  console.log("After map loads function");

  // Comprueba si se ha seleccionado el mapa base gris y si el usuario ha hecho demasiado zoom.
  // En ese caso, cambia al mapa base de calles.
  bootleaf.map.on("zoomend", function (evt) {
    if (bootleaf.currentBasemap === "Gray") {
      if (evt.target._zoom >= 17) {
        setBasemap({ type: "esri", id: "Streets" });
        $.growl.warning({
          title: "Basemap change",
          message: "The grayscale basemap is not available at this scale",
        });
      }
    }
  });

  // Detecta las coordenadas de la dirección devuelta por el geocodificador. Esto se puede utilizar en otros lugares según sea necesario.
  bootleaf.leafletGeocoder.on("markgeocode", function (evt) {
    console.log(
      "Coordinates: ",
      evt.geocode.center.lat,
      ", ",
      evt.geocode.center.lng
    );
  });
}
