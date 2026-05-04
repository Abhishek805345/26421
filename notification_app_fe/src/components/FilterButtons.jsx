import React from "react";

function FilterButtons({ selectedType, onFilterChange }) {
  return (
    <div className="filter-row">
      <button className={selectedType === "All" ? "active" : ""} onClick={() => onFilterChange("All")}>
        All
      </button>
      <button className={selectedType === "Event" ? "active" : ""} onClick={() => onFilterChange("Event")}>
        Event
      </button>
      <button className={selectedType === "Result" ? "active" : ""} onClick={() => onFilterChange("Result")}>
        Result
      </button>
      <button className={selectedType === "Placement" ? "active" : ""} onClick={() => onFilterChange("Placement")}>
        Placement
      </button>
    </div>
  );
}

export default FilterButtons;
