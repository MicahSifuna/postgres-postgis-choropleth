import { featureGroup } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const API_URL = "http://localhost:5000/api/counties";

const Map = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => setData(json.geojson || json))
      .catch((err) => console.error("Failed to load GeoJSON", err));
  }, []);

  //   choropleth colors
  const getColor = (pop) => {
    return pop > 2000000
      ? "#800026"
      : pop > 1000000
      ? "#BD0026"
      : pop > 500000
      ? "#E31A1C"
      : pop > 200000
      ? "#FC4E2A"
      : pop > 100000
      ? "#FD8D3C"
      : pop > 50000
      ? "#FEB24C"
      : "#FFEDA0";
  };

  const style = (feature) => ({
    fillColor: getColor(feature.properties.population),
    weight: 1,
    opacity: 1,
    color: "white",
    fillOpacity: 0.7,
  });

  const highlightFeature = (e) => {
    e.target.setStyle({
      weight: 2,
      color: "#000",
      fillOpacity: 0.9,
    });
  };

  const reseetHightlight = (e) => {
    e.target.setStyle(style(e.target.feature));
  };

  const onEachFeature = (feature, layer) => {
    layer.bindPopup(`
            <strong>${feature.properties.county}</strong><br/>
            Landarea(SqKm): ${feature.properties.landarea.toLocaleString()}<br/>
            Population: ${feature.properties.population.toLocaleString()}<br/>
            HouseHolds: ${feature.properties.households.toLocaleString()}<br/>
            Av HH Size: ${feature.properties.av_hh_size.toLocaleString()}
        `);

    layer.on({
      mouseover: highlightFeature,
      mouseout: reseetHightlight,
    });
  };

  const position = [0.0, 37.817223];

  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data && (
        <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />
      )}
    </MapContainer>
  );
};
export default Map;
