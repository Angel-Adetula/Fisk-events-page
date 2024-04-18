import React, { useState, useEffect } from "react";
import "./search.css";

const SearchBox = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [eventType, setEventType] = useState("all");
  const organizations = [
    "Fisk CS Club",
    "OCPD",
    "Axon NeuroScience Club",
    "Data Science Club",
  ];

  const handleClear = () => {
    setName("");
    setOrganization("");
    setDateFilter("all");
    setEventType("all");
    onSearch({
      name: "",
      organization: "",
      dateFilter: "all",
      eventType: "all",
    });
  };

  useEffect(() => {
    const searchParams = { name, organization, dateFilter, eventType };
    handleSearch(searchParams);
  }, [name, organization, dateFilter, eventType]);

  const handleSearch = (searchParams) => {
    onSearch(searchParams);
  };

  return (
    <form className="search-form">
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
        {organizations.map((org, index) => (
          <option key={index} value={org}>
            {org}
          </option>
        ))}
      </select>

      <select
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      >
        <option value="all">Current &amp; Upcoming Events</option>
        <option value="pastWeek">Past week</option>
        <option value="pastMonth">Past month</option>
        <option value="semester">Entire semester</option>
      </select>
      <div>
        <label className="event-type">
          <input
            type="radio"
            value="all"
            checked={eventType === "all"}
            onChange={() => setEventType("all")}
          />
          All events
        </label>
        <label className="event-type">
          <input
            type="radio"
            value="virtual"
            checked={eventType === "virtual"}
            onChange={() => setEventType("virtual")}
          />
          Virtual events
        </label>
        <label className="event-type">
          <input
            type="radio"
            value="live"
            checked={eventType === "live"}
            onChange={() => setEventType("live")}
          />
          Live events
        </label>
      </div>
      <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
};

export default SearchBox;
