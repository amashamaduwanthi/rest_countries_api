import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all?fields=name,capital,region,population,languages,flags')
            .then((res) => {
                setCountries(res.data);
            })
            .catch((err) => {
                console.error('Error fetching countries:', err);
                setError('Failed to load countries. Please try again later.');
            });
    }, []);

    // Filter countries based on search input
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">REST Countries Explorer</h1>

            <input
                type="text"
                placeholder="Search by country name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 px-4 py-2 border rounded w-full sm:w-1/2"
            />

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {filteredCountries.map((country) => (
                    <CountryCard key={country.name.common} country={country} />
                ))}
            </div>
        </div>
    );
};

export default Home;
