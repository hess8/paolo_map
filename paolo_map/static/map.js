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
  L.geoJSON(markers)
    .bindPopup(
      (layer) =>
        layer.feature.properties.name
    )
    .addTo(map);
}

map.on("moveend", render_markers);