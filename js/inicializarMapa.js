document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  menuToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
  });

  let map;
  let darkMapStyles;
  let marker1, marker2;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 7.1165, lng: -73.10543 },
      zoom: 15,
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
    });

    // Define los estilos de mapa oscuro
    darkMapStyles = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ];

    // Aplica los estilos al mapa según el modo actual
    applyMapStyle();

    // Crea los marcadores en el mapa
    createMarkers();
  }

  function applyMapStyle() {
    if (localStorage.getItem('darkMode') === 'true') {
      map.setOptions({ styles: darkMapStyles });
    } else {
      map.setOptions({ styles: [] }); // Estilos por defecto (modo claro)
    }
  }

  function createMarkers() {
    marker1 = new google.maps.Marker({
      position: { lat: 7.1165, lng: -73.10543 },
      map: map,
      title: 'Ruta 1',
      draggable: false,
      icon: {
        url: 'img/bus_1.png',
        scaledSize: new google.maps.Size(50, 75)
      },
      clickable: false,
    });

    marker2 = new google.maps.Marker({
      position: { lat: 7.1165, lng: -73.10543 },
      map: map,
      title: 'Ruta 2',
      draggable: false,
      icon: {
        url: 'img/bus_2.png',
        scaledSize: new google.maps.Size(50, 75)
      },
      clickable: false,
    });
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        new google.maps.Marker({
          position: userLocation,
          map: map,
          icon: {
            url: 'img/usuario.png',
            scaledSize: new google.maps.Size(30, 30)
          },
          clickable: false,
        });

        map.setCenter(userLocation);
      },
      function (error) {
        console.error("Error al obtener la ubicación del usuario:", error);
      }
    );

    // Lógica para cargar y actualizar las posiciones de los marcadores de las rutas
    function cargarRespuesta() {
      const xhr1 = new XMLHttpRequest();
      const url1 = "https://api.allorigins.win/get?url=http%3A//gpsmobile.co%3A4000/api/DetalleVehiculo/97141/96365";
      xhr1.open("GET", url1, true);

      xhr1.onreadystatechange = function () {
        if (xhr1.readyState == 4 && xhr1.status == 200) {
          const respuesta1 = JSON.parse(xhr1.responseText);
          const contenidoJSON1 = JSON.parse(respuesta1.contents);

          if (contenidoJSON1.response && contenidoJSON1.response.veh) {
            const longitud1 = contenidoJSON1.response.veh.Lg;
            const latitud1 = contenidoJSON1.response.veh.Lt;

            // Actualizar la posición del marcador 1
            marker1.setPosition({ lat: latitud1, lng: longitud1 });

            console.log("Longitud Ruta 1:", longitud1);
            console.log("Latitud Ruta 1:", latitud1);
          } else {
            console.error("La estructura de datos recibida para Ruta 1 no es válida.");
          }
        }
      };

      xhr1.send();

      const xhr2 = new XMLHttpRequest();
      const url2 = "https://api.allorigins.win/get?url=http%3A//gpsmobile.co%3A4000/api/DetalleVehiculo/97149/96365";
      xhr2.open("GET", url2, true);

      xhr2.onreadystatechange = function () {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
          const respuesta2 = JSON.parse(xhr2.responseText);
          const contenidoJSON2 = JSON.parse(respuesta2.contents);

          if (contenidoJSON2.response && contenidoJSON2.response.veh) {
            const longitud2 = contenidoJSON2.response.veh.Lg;
            const latitud2 = contenidoJSON2.response.veh.Lt;

            // Actualizar la posición del marcador 2
            marker2.setPosition({ lat: latitud2, lng: longitud2 });

            console.log("Longitud Ruta 2:", longitud2);
            console.log("Latitud Ruta 2:", latitud2);
          } else {
            console.error("La estructura de datos recibida para Ruta 2 no es válida.");
          }
        }
      };

      xhr2.send();
    }

    cargarRespuesta();

    // Llamar a la función cargarRespuesta periódicamente para actualizar las posiciones
    setInterval(cargarRespuesta, 5000); // Actualizar cada 5 segundos
  }

  // Llamar a la función de inicialización del mapa al cargar la página
  initMap();

  // Obtener el estado del modo oscuro del localStorage
  const modoOscuro = localStorage.getItem('darkMode');

  // Función para cambiar al modo oscuro
  function activarModoOscuro() {
    document.body.classList.add('dark-mode');
    const link = document.querySelector('link#mapa-css');
    if (link) {
      link.href = 'css/styles_mapa-dark.css';
    }
    map.setOptions({ styles: darkMapStyles }); // Cambiar al estilo de mapa oscuro
    localStorage.setItem('darkMode', 'true');
    const logoImg = document.getElementById('logo-img');
    if (logoImg) {
      logoImg.src = 'img/logo-white.png';
    }
  }

  // Función para cambiar al modo claro
  function activarModoClaro() {
    document.body.classList.remove('dark-mode');
    const link = document.querySelector('link#mapa-css');
    if (link) {
      link.href = 'css/styles_mapa.css';
    }
    map.setOptions({ styles: [] }); // Restablecer al estilo de mapa por defecto
    localStorage.setItem('darkMode', 'false');
  }

  // Cambiar al modo oscuro si está activado en el localStorage
  if (modoOscuro === 'true') {
    activarModoOscuro();
    // Refrescar la página actual
window.location.reload();

  } else {
    activarModoClaro();
  }

  // Evento para cambiar entre modo oscuro y claro
  const darkModeToggle = document.querySelector("#dark-mode-toggle");

  darkModeToggle.addEventListener("click", function () {
    if (modoOscuro === 'true') {
      activarModoClaro();
    } else {
      activarModoOscuro();
    }
  });
});
