// src/components/MapChart.jsx (or .tsx)
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// Ensure your europe.json file is in the public folder
const geoUrl = "/europe.json";

export default function MapChart() {
  const [selectedCountry, setSelectedCountry] = useState(null); // Store selected country
  const [isModalOpen, setModalOpen] = useState(false); // Track modal visibility

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.NAME || geo.properties.name || "Unknown";
    const countryData = geo.properties; // Additional country data
    setSelectedCountry({ name: countryName, ...countryData });
    setModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close modal
    setSelectedCountry(null); // Clear selected country
  };

  console.log("MapChart component rendered");
  return (
    <div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [15, 55], // Adjust center for Europe as needed
          scale: 500, // Adjust scale so that Europe fills the viewport
        }}
        style={{ width: "80%", height: "90vh" }} // Optionally, set a fixed height
      >
        <Geographies geography={geoUrl}>
          {({ geographies, errors }) => {
            if (errors) {
              console.error("Error loading geographies:", errors);
            }
            console.log("Loaded geographies:", geographies);
            return geographies.map((geo) => (
              //console.log("Rendering geography:", geo.properties.SOVEREIGNT),
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleCountryClick(geo)}
                style={{
                  default: {
                    fill: geo.properties.fill || "#DDD",
                    stroke: "#000",
                    strokeWidth: 0.3,
                    outline: "none",
                  },
                  hover: {
                    fill: "#F53",
                    stroke: "#000",
                    strokeWidth: 1,
                    outline: "none",
                    cursor: "pointer",
                  },
                  pressed: {
                    fill: "#E42",
                    stroke: "#000",
                    strokeWidth: 1,
                    outline: "none",
                  },
                }}
              />
            ));
          }}
        </Geographies>
      </ComposableMap>

      {/* Modal for Country Info */}
      {isModalOpen && selectedCountry && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>{selectedCountry.name}</h2>
            {/* Display additional data about the country */}
            <p>Sovereignty: {selectedCountry.SOVEREIGNT || "N/A"}</p>
            <p>ISO Code: {selectedCountry.ISO_A3 || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
