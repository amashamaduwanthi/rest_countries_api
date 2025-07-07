import React from 'react';

const CountryCard = ({ country }) => {
    const languageNames = country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';

    return (
        <div className="border rounded shadow-md p-4 bg-white">
            <img
                src={country.flags?.svg}
                alt={country.name?.common}
                className="h-32 w-full object-cover mb-2"
            />
            <h2 className="text-lg font-bold">{country.name?.common}</h2>
            <p>Capital: {country.capital?.[0] || 'N/A'}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Languages: {country.languages && Object.values(country.languages).join(', ')}</p>
        </div>
    );
};

export default CountryCard;
