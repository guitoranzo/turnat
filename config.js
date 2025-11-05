var config = {
  requireArcGISLogin: false, // Does the user need to log in to ArcGIS Online or ArcGIS Server?
  tokenUrl: "https://www.arcgis.com/sharing/generateToken", // ArcGIS token generation URL

  title: "TURNAT",
  start: {
    // "maxZoom": 16,
    center: [38.203, -99.799],
    zoom: 4,
    attributionControl: true,
    zoomControl: false,
  },
  about: {
    title: "Plantilla de aplicación Bootleaf",
    contents:
      "<p>Esta es una versión de código abierto del excelente <a href='https://github.com/bmcbride/bootleaf'>Bootleaf map </a>Iniciado por Bryan McBride.</p><p>Está diseñado para el desarrollo rápido de mapas web. Ver <a href='https://github.com/guitoranzo/turnat'>https://github.com/guitoranzo/turnat</a> para obtener más información.</p><p>Modifique este mensaje en el archivo de configuración.</p>",
  },
  controls: {
    zoom: {
      position: "topleft",
    },
    leafletGeocoder: {
      //https://github.com/perliedman/leaflet-control-geocoder
      collapsed: false,
      position: "topleft",
      placeholder: "Search for a location",
      type: "OpenStreetMap", // OpenStreetMap, Google, ArcGIS
      //"suffix": "Australia", // optional keyword to append to every search
      //"key": "AIzaS....sbW_E", // when using the Google geocoder, include your
      // Google Maps API key (https://developers.google.com/maps/documentation/geocoding/start#get-a-key)
    },
    TOC: {
      //https://leafletjs.com/reference-1.0.2.html#control-layers-option
      collapsed: false,
      uncategorisedLabel: "Layers",
      position: "topright",
      toggleAll: true,
    },
    history: {
      position: "bottomleft",
    },
    bookmarks: {
      position: "bottomright",
      places: [
        {
          latlng: [40.7916, -73.9924],
          zoom: 12,
          name: "Manhattan",
          id: "a148fa354ba3",
          editable: true,
          removable: true,
        },
      ],
    },
  },

  activeTool: "filterWidget", // options are identify/coordinates/queryWidget
  basemaps: [
    "esriGray",
    "esriDarkGray",
    "esriStreets",
    "OpenStreetMap",
    "Aerial",
  ],
  bing_key: "enter your Bing Maps key",
  mapboxKey: "enter your MapBox key",
  // "defaultIcon": {
  // 	"imagePath": "https://leafletjs.com/examples/custom-icons/",
  // 	"iconUrl": "leaf-green.png",
  // 	"shadowUrl": "leaf-shadow.png",
  // 	"iconSize":     [38, 95],
  // 		"shadowSize":   [50, 64],
  // 		"iconAnchor":   [22, 94],
  // 		"shadowAnchor": [4, 62],
  // 		"popupAnchor":  [-3, -76]
  // },
  // Categories - (world_countries) world_cities_cuba / cuba_provinces*** cuba_cities_pop***
  tocCategories: [
    {
      name: "GeoJSON layers",
      layers: ["theatres", "museums", "us_density"],
    },
    {
      name: "ArcGIS Layers",
      layers: ["world_countries", "world_cities_cuba"],
    },
    {
      name: "WMS/WFS layers",
      layers: ["cuba_provinces", "cuba_cities_pop"],
      exclusive: false,
    },
  ],
  // projections: [{ 4269: "+proj=longlat +ellps=GRS80 +datum=NAD83 +no_defs " }],
  projections: [{ 4326: "+proj=longlat +datum=WGS84 +no_defs" }],
  // projections: {
  // 	4326: "+proj=longlat +datum=WGS84 +no_defs",
  // 	2085: "+proj=lcc +lat_1=21.3 +lat_2=23.7 +lat_0=22.5 +lon_0=-81 +x_0=500000 +y_0=300000 +datum=NAD27 +units=m +no_defs",
  // 	3795: "+proj=lcc +lat_1=21.8 +lat_2=23.2 +lat_0=22.5 +lon_0=-81 +x_0=500000 +y_0=300000 +datum=NAD27 +units=m +no_defs"
  // }
  highlightStyle: {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.5,
    fillColor: "#E31A1C",
    stroke: true,
  },

  layers: [
    // theatres, museums
    {
      id: "theatres",
      name: "Theatres",
      type: "geoJSON",
      cluster: true,
      showCoverageOnHover: false,
      minZoom: 12,
      url: "./data/theatres.geojson",
      icon: {
        iconUrl: "./img/theater.png",
        iconSize: [24, 28],
      },
      style: {
        stroke: true,
        fillColor: "#00FFFF",
        fillOpacity: 0.5,
        radius: 10,
        weight: 0.5,
        opacity: 1,
        color: "#727272",
      },
      visible: false,
      // "label": {
      // 	"name": "NAME",
      // 	"minZoom": 14
      // }
    },
    {
      id: "museums",
      type: "geoJSON",
      cluster: true,
      showCoverageOnHover: false,
      minZoom: 12,
      url: "./data/museums.geojson",
      style: {
        stroke: true,
        fillColor: "#00FFFF",
        fillOpacity: 0.5,
        radius: 10,
        weight: 0.5,
        opacity: 1,
        color: "#727272",
      },
      icon: {
        iconUrl: "./img/museum.png",
        iconSize: [24, 28],
      },
      visible: false,
      // "label": {
      // 	"name": "NAME",
      // 	"minZoom": 14
      // }
    },
    // ArcGIS Layers
    {
      id: "world_countries",
      name: "World Countries",
      type: "agsFeatureLayer", // Usa el tipo correcto para esri-leaflet
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries/FeatureServer/0",
      minZoom: 0,
      maxZoom: 20,
      useCors: true,
      visible: true,
      identify: {
        layerLabel: "Countries",
        layerName: "World Countries",
        primaryField: "COUNTRY",
        outFields: [
          { name: "COUNTRY", alias: "Country" },
          { name: "CONTINENT", alias: "Continent" },
          { name: "ISO_CC", alias: "ISO Code" },
        ],
        maxAllowableOffset: 1000,
      },
      queryWidget: {
        queries: [
          { name: "COUNTRY", alias: "Country name", type: "text" },
          { name: "CONTINENT", alias: "Continent", type: "text" },
        ],
        outFields: [
          { name: "COUNTRY", alias: "Country" },
          { name: "CONTINENT", alias: "Continent" },
          { name: "ISO_CC", alias: "ISO Code" },
        ],
        layerIndex: 0,
        maxAllowableOffset: 1000,
      },
      filters: [{ name: "CONTINENT", alias: "Continent", type: "text" }],
    },
    {
      id: "world_cities_cuba",
      name: "Ciudades de Cuba (World Cities)",
      type: "agsFeatureLayer",
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/0",
      layerDefs: { 0: "CNTRY_NAME = 'Cuba'" },
      popup: true,
      tooltipField: "CITY_NAME",
      outFields: [
        { name: "CITY_NAME", alias: "Ciudad" },
        { name: "CNTRY_NAME", alias: "País" },
        { name: "POP", alias: "Población" },
        { name: "POP_RANK", alias: "Rango" },
      ],
      visible: true,
      style: {
        fillColor: "#ff6600",
        fillOpacity: 0.7,
        radius: 7,
        color: "#cc5200",
        weight: 1,
      },
      cluster: false,
    },
    // WMS/WFS layers
    {
      id: "cuba_provinces",
      name: "Provincias de Cuba (WFS)",
      type: "WFS",
      url: "https://demo.boundlessgeo.com/geoserver/ows",
      typeName: "ne:ne_10m_admin_1_states_provinces",
      visible: true,
      popup: true,
      geomField: "geom",
      cqlFilter: "iso_3166_2 LIKE 'CU-%'",
      outFields: [
        { name: "name", alias: "Provincia" },
        { name: "iso_3166_2", alias: "Código ISO" },
      ],
    },
    {
      id: "cuba_cities_pop",
      name: "Ciudades de Cuba con población (WFS)",
      type: "WFS",
      url: "https://demo.boundlessgeo.com/geoserver/ows",
      typeName: "ne:ne_10m_populated_places",
      visible: true,
      popup: true,
      geomField: "geom",
      cqlFilter: "adm0name = 'Cuba'",
      outFields: [
        { name: "name", alias: "Ciudad" },
        { name: "pop_est", alias: "Población estimada", thousands: true },
        { name: "adm1name", alias: "Provincia" },
      ],
      style: {
        fillColor: "#cc0000",
        fillOpacity: 0.6,
        radius: 8,
        color: "#660000",
        weight: 1,
      },
    },
  ],
};
