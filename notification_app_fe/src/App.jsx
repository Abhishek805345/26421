import React, { useState } from "react";
import AllNotifications from "./pages/AllNotifications.jsx";
import PriorityNotifications from "./pages/PriorityNotifications.jsx";
import FilterNotifications from "./pages/FilterNotifications.jsx";

function App() {
  const [page, setPage] = useState("all");

  return (
    <div>
      <header className="top-bar">
        <h1>Notifications</h1>

        <div className="nav-buttons">
          <button onClick={() => setPage("all")}>All</button>
          <button onClick={() => setPage("priority")}>Priority</button>
          <button onClick={() => setPage("filter")}>Filter</button>
        </div>
      </header>

      <main className="page">
        {page === "all" && <AllNotifications />}
        {page === "priority" && <PriorityNotifications />}
        {page === "filter" && <FilterNotifications />}
      </main>
    </div>
  );
}

export default App;
