const copy =
  "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>";

const url =
'http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'

const layer = L.tileLayer(url, {
      attribution: copy,
      });
const map = L.map("map", {
      layers: [layer],
      minZoom: 5,
      });

map
  .locate()
  .on("locationfound", (e) =>
    map.setView(e.latlng, 8)
  )
  .on("locationerror", () =>
    map.setView([0, 0], 5)
  );

async function load_markers() {
  const markers_url = `/api/locations/?in_bbox=${map
    .getBounds()
    .toBBoxString()}`;
  const response = await fetch(
    markers_url
  );
  const geojson = await response.json();
  return geojson;
}

async function render_markers() {
  const markers = await load_markers();

  const circleOptions =
    {
      radius: feature.properties.size,
      color: "red",
      weight: 7,
      opacity: 1,
      fillOpacity: 0.7,
    };

  const circle_marker = function (feature, latlng) {
    if (feature.properties.type === "Point")
      {
       return L.circleMarker(latlng, circleOptions)
      }
      }
      // L.geoJSON(markers,circle_marker)
    L.geoJSON(markers)
      .bindPopup(
          (layer) =>
          layer.feature.properties.size
      )
      .addTo(map);
};

//
//const geojsonlayer = L.geoJSON(object, {
//  style: function (feature) {
//    return {
//      color: feature.properties.color || "red",
//      weight: 7,
//      opacity: 1,
//      fillOpacity: 0.7,
//    };
//  },
//  pointToLayer: (feature, latlng) => {
//    if (feature.properties.type === "Point") {
//      return new L.circleMarker(latlng, {
//        radius: 20,
//      });
//    }
//  },
//  onEachFeature: function (feature, layer) {},
//});


map.on("moveend", render_markers);

// from Simple Tutorial
// CIRCLE MARKERS
//function addDataToMap(mydata, map) {
//    var dataLayer = L.geoJson(mydata, {
//        // Convert default markers to circle
//        pointToLayer: function (feature, latlng) {
//
//            // Observe how you define the radius sixe dependent on magnitude data
//            var geojsonMarkerOptions = {
//                radius: feature.properties.magnitude * 3,
//                fillColor: "#ff7800",
//                color: "#000",
//                weight: 1,
//                opacity: 1,
//                fillOpacity: 0.6
//            };
//            return L.circleMarker(latlng, geojsonMarkerOptions);
//        },
//        // Give each feature a popup
//        onEachFeature: function(feature, layer) {
//
//            var popupText = "Magnitude: " + feature.properties.magnitude + "<br>Location: " + feature.properties.country ;
//
//            layer.bindPopup(popupText); },
//
//        });
//
//    dataLayer.addTo(map);
//    }
//
////var ourdata = '{% url "mydata" %}';
////
//$.getJSON(ourdata, function(mydata) { addDataToMap(mydata, map); });
