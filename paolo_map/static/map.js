import chroma from "static/chroma_src";

let config = {
    minZoom: 5
};

const copy =
  "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>";

const url =
'http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'

const map = L.map("map", config)

L.tileLayer(url, {
      attribution: copy,
      }).addTo(map);

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

  const circle_marker = {
       pointToLayer: function (feature, latlng) {
       return L.circleMarker(latlng, {
//          radius: feature.properties.size,
          radius: 12,
          color: chroma('#D4F880').darken().hex(),  // #a1c550,
          weight: 1,
          opacity: .1,
          fillOpacity: 0.7,
        })
       }
      };

  L.geoJSON(markers,circle_marker).addTo(map);}

map.on("moveend", render_markers);