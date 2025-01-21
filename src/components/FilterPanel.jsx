import React, { useState, useEffect } from "react";
import API from "./api";

// Importing various icons from react-icons
import { FaPizzaSlice, FaFish } from "react-icons/fa";
import {
  GiHamburger,
  GiNoodles,
  GiEuropeanFlag,
  GiTacos,
  GiAfrica,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";
import { MdSportsMartialArts } from "react-icons/md";
import { IoIosIceCream } from "react-icons/io";
import { RiDrinks2Fill } from "react-icons/ri";
import { IoEarth } from "react-icons/io5";

const iconMap = {
  FastFood: FaPizzaSlice,
  Seafood: FaFish,
  AmericanBBQ: GiHamburger,
  Asian: GiNoodles,
  European: GiEuropeanFlag,
  Latino: GiTacos,
  African: GiAfrica,
  Healthy: MdSportsMartialArts,
  Desserts: IoIosIceCream,
  Beverages: RiDrinks2Fill,
  Fusion: IoEarth,
  Other: GiPerspectiveDiceSixFacesRandom,
};

const FilterPanel = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]); // Categories from backend
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/categories"); // Call backend to get categories
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      onCategorySelect(updatedCategories);
      return updatedCategories;
    });
  };

  return (
    <div className="filter-panel">
      <h3>Filter by Category:</h3>
      <div className="category-icons">
        {categories.map((category) => {
          const IconComponent = iconMap[category] || iconMap["Other"];
          return (
            <div
              key={category}
              className={`category-icon ${
                selectedCategories.includes(category)
                  ? "selected"
                  : "grayed-out"
              }`}
              onClick={() => handleCategoryToggle(category)}
            >
              <IconComponent size={30} />
              <span>{category}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPanel;
