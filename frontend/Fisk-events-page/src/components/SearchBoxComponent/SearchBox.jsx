import React, { useState } from "react";
import "./search.css"; // Import the CSS file containing the styles

const SearchBox = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ name, organization, date, eventType });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search by name..."
      />
      <select
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      >
        <option value="">Filter by organization</option>
        <option value="Fisk CS Club">Fisk CS Club</option>
        <option value="OCPD">OCPD</option>
        <option value="Axon NeuroScience Club">Axon NeuroScience Club</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Filter by date..."
      />
      <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
        <option value="all">All events</option>
        <option value="virtual">Virtual events</option>
        <option value="live">Live events</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
