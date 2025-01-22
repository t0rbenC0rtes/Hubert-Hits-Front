import React from "react";
import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const center = {
  lat: 40.782498, // Default to NYC
  lng: -73.965884,
};

const GoogleMapComponent = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <div className="mapContainer">
        <GoogleMap
          mapContainerStyle={{ height: "20rem" }}
          zoom={12}
          center={center}
        >
          {restaurants.slice(0, 10).map((restaurant, index) => {
            const [longitude, latitude] = restaurant.address.coord;

            return (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                onClick={() => setSelectedRestaurant(restaurant)}
                title={restaurant.name}
                label={{
                  text: `${index + 1}`, // Add position number (1-10)
                  color: "white", // Text color
                  fontSize: "16px", // Adjust font size
                  fontWeight: "bold", // Make it bold for visibility
                }}
              />
            );
          })}

          {selectedRestaurant && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedRestaurant.address.coord[1]),
                lng: parseFloat(selectedRestaurant.address.coord[0]),
              }}
              onCloseClick={() => setSelectedRestaurant(null)}
            >
              <div>
                <h3>{selectedRestaurant.name}</h3>
                <p>
                  <strong>Cuisine:</strong> {selectedRestaurant.cuisine}
                </p>
                <p>
                  <strong>Borough:</strong> {selectedRestaurant.borough}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {selectedRestaurant.address.building},{" "}
                  {selectedRestaurant.address.street},{" "}
                  {selectedRestaurant.address.zipcode}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;
