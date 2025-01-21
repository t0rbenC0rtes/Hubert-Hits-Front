import React, { useState, useEffect } from "react";
import API from "./components/api";
import RestaurantCard from "./components/RestaurantCard";
import Pagination from "./components/Pagination";
import FilterPanel from "./components/FilterPanel";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(0); // Total pages from backend
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories

  const fetchRestaurants = async (page = 1, categories = selectedCategories) => {
    setLoading(true);
    try {
      const categoryQuery = categories.length > 0 ? `category=${categories.join(",")}` : "";
      const response = await API.get(`/restaurants?page=${page}&limit=20&${categoryQuery}`);
      setRestaurants(response.data.restaurants);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    fetchRestaurants(1, categories); // Reset to page 1 when categories change
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchRestaurants(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchRestaurants(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h1>Hubert Hits</h1>
      <FilterPanel onCategorySelect={handleCategoryChange} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
      <div className="results">
        {loading ? (
          <p>Loading...</p>
        ) : (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              avgScore={restaurant.averageRating}
              address={restaurant.address}
              borough={restaurant.borough}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default App;
