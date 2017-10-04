/* global google:ignore */

$(() => {
  function getData() {
    $
    .get('https://api.tfl.gov.uk/bikepoint')
    .done(data => {
      data.forEach(bikePoint => {
        let name = bikePoint.commonName;
        let latitude = bikePoint.lat;
        let longitude = bikePoint.lon;
        getBikesAndSpaces(latitude, longitude, name, bikePoint.additionalProperties);
      });
    });
  }

  function getBikesAndSpaces(latitude, longitude, name, dockDetails) {
    let bikes = 0;
    let spaces = 0;

    for (let i = 6; i < 8; i++) {
      switch (i) {
        case 6:
        bikes = Number((Object.entries(dockDetails[i])[4])[1]);
        break;

        case 7:
        spaces = Number((Object.entries(dockDetails[i])[4])[1]);
        break;
      }
    }

    setMarker(latitude, longitude, name, bikes, spaces);
  }

  function setMarker(latitude, longitude, name, bikes, spaces) {
    const location = {
      lat: latitude,
      lng: longitude
    };

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: {
        url: (bikes <= 1) ? 'borisbw.png':'boris.png'
      },
      title: name,
      opacity: 0.7,
      stationDetails: {
        name: name,
        bikes: bikes,
        spaces: spaces
      }
    });

    marker.addListener('click', function() {
      const infowindow = new google.maps.InfoWindow({
        content: '' +
        '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + this.stationDetails.name + '</h1>' +
        '<div id="bodyContent">' +
        '<ul>' +
        '<li>Available Bikes: ' + this.stationDetails.bikes + '</li>' +
        '<li>Free spaces: ' + this.stationDetails.spaces + '</li>' +
        '</ul>' +
        '</div>' +
        '</div>'
      });

      infowindow.open(map, this);
    });
  }

  function drawCircle() {
    new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: map.center,
      radius: 1000
    });
  }

  function geolocateUser() {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        drawCircle();
      }
    );
  }

  function styleMap() {
    return([
      {
        'featureType': 'administrative',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#444444'
          }
        ]
      },
      {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#f2f2f2'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [
          {
            'saturation': -100
          },
          {
            'lightness': 45
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'simplified'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#77738c'
          },
          {
            'visibility': 'on'
          }
        ]
      }
    ]);
  }

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(51.515113, -0.072051),
    styles: styleMap()
  });

  getData();
  geolocateUser();
});
