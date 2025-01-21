import React, { useState } from "react";

const SortingPanel = ({ onSortChange }) => {
  const [sortField, setSortField] = useState("averageRating");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = () => {
    onSortChange({ field: sortField, order: sortOrder });
  };

  return (
    <div className="sorting-panel">
      <label>Sort by:</label>
      <select className="select-field" value={sortField} onChange={(e) => setSortField(e.target.value)}>
        <option value="averageRating">Average Rating</option>
        <option value="name">Name</option>
        <option value="borough">Borough</option>
      </select>

      <select className="select-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button className="apply" onClick={handleSortChange}>Apply</button>
    </div>
  );
};

export default SortingPanel;
