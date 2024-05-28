import chroma from 'chroma-js'
import '../styles/map.css'

let config = {
    minZoom: 5
};

const copy =
  "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>";

const url =
'http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'

const map = L.map("map", config)

//L.tileLayer(url, {
//      attribution: copy,
//      }).addTo(map);

const tiles = L.tileLayer(url, {
      attribution: copy,
      }).addTo(map);

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
  let response = await fetch(
    markers_url
  );
  let geojson = await response.json();
  return geojson;
}

async function render_markers() {
  let markers = await load_markers();
  var max_scale = 200;
//  var colorLow = chroma('orange').desaturate().hex();
//  var colorHi = chroma('yellow').desaturate().hex();
  var colorLow = chroma('#fce703').hex();
  var colorHi = chroma('red').hex();
  var marker_scale = chroma.scale([colorLow,colorHi]).mode('rgb').domain([1, max_scale], 'log');
//  var marker_scale = chroma.scale('OrRd').domain([1, max_scale], 'log').padding([0.2, 0]);
  const circle_marker = {

       pointToLayer: function (feature, latlng) {
       return L.circleMarker(latlng, {
//          radius: feature.properties.size,
          radius: 12,
//          color:   // #a1c550,
          color: marker_scale(feature.properties.size).hex(),
          weight: 1,
          opacity: 1,
          fillOpacity: 0.4,
        })
       }
      };

  L.geoJSON(markers,circle_marker)
  .bindPopup(
      (layer) =>
        layer.feature.properties.size.toString()
    )
  .addTo(map);}

map.on("moveend", render_markers);