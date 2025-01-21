import React from "react";

const RestaurantCard = ({ name, cuisine, avgScore, address, borough }) => {
  return (
    <div className="restaurant-card">
      <h2 className="restaurant-name">{name}</h2>
      <p className="restaurant-cuisine">
        <strong>Cuisine:</strong> {cuisine}
      </p>
      <p className="restaurant-avgScore">
        <strong>Average Score:</strong> {avgScore ? avgScore.toFixed(2) : "N/A"}
      </p>
      <p className="restaurant-address">
        <strong>Address:</strong> {address.building}, {address.street},{" "}
        {address.zipcode}
      </p>
      <p className="restaurant-borough">
        <strong>Borough:</strong> {borough}
      </p>
    </div>
  );
};

export default RestaurantCard;
