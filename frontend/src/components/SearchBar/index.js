import React, { useState } from 'react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState('');

    function handleSearch(e) {
        e.preventDefault()
        setSearchResults(`Você pesquisou por: ${searchTerm}`);
    };


    return (
        <form className="d-flex form-inline" role="search" onSubmit={handleSearch}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Pesquisar"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-danger" type="submit">
                Buscar
            </button>
            <div>{searchResults}</div>
        </form>
    );
}

export default SearchBar;