import React, { useState } from "react";
import { useAppStore } from "../store";

const SearchInputField: React.FC = () => {
    // Query string for search
    // Setting the default as cats
    const [query, set_query] = useState("cats");

    // Retrieve a store function from Zustand to fetch albums
    const search = useAppStore((store) => store.search);

    // Handler for when user types something into the search box
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        // This gets the search box value and sets a query
        set_query(e.target.value);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {

        // This prevents the default behavior of the search input - by default the `form` element reloads the page
        e.preventDefault();

        // Perform a search query that fetches albums
        search({
            q_all: query,
            q_type: "album",
        });
    };


    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input onChange={handleInputChange} value={query} />
        </form>
    );
};

export default SearchInputField;
