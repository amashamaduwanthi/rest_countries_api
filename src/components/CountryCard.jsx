import React from 'react';

const CountryCard = ({ country, isFavorite, toggleFavorite }) => {
    const languageNames = country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';

    return (
        <div className="relative border rounded shadow-md p-4 bg-white hover:shadow-lg transition">
            {/* Favorite Button */}
            <button
                onClick={() => toggleFavorite(country)}
                className="absolute top-2 right-2 text-2xl focus:outline-none"
                title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            {/* Flag */}
            <img
                src={country.flags?.svg}
                alt={country.name?.common}
                className="h-32 w-full object-cover mb-3 rounded"
            />

            {/* Country Details */}
            <h2 className="text-lg font-bold mb-1">{country.name?.common}</h2>
            <p className="text-sm">Capital: {country.capital?.[0] || 'N/A'}</p>
            <p className="text-sm">Region: {country.region}</p>
            <p className="text-sm">Population: {country.population.toLocaleString()}</p>
            <p className="text-sm">Languages: {languageNames}</p>
        </div>
    );
};

export default CountryCard;
