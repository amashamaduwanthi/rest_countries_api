import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import {data} from "autoprefixer";

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [selectedLanguage, setSelectedLanguage] = useState('All');
    const [error, setError] = useState(null);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all?fields=name,capital,region,population,languages,flags')
            .then((res) => {
                const data = res.data;

                if (!Array.isArray(data)) {
                    throw new Error('Invalid response format');
                }
                setCountries(data);

                //  Extract all languages and make them unique
                const languageSet = new Set();
                data.forEach((country) => {
                    if (country.languages) {
                        Object.values(country.languages).forEach((lang) => languageSet.add(lang));
                    }
                });
                setLanguages(['All', ...Array.from(languageSet).sort()]);
            })
            .catch((err) => {
                console.error('Error fetching countries:', err);
                setError('Failed to load countries. Please try again later.');
            });
    }, []);

    //Filter logic (by name and region)
    const filteredCountries = countries.filter((country) =>{
        const matchesName = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
        const matchesLanguage =
            selectedLanguage === 'All' ||
            (country.languages && Object.values(country.languages).includes(selectedLanguage));
        return matchesName && matchesRegion && matchesLanguage;
        });
    //  Available region options (you can customize this list)
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">REST Countries Explorer</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <input
                type="text"
                placeholder="Search by country name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 px-4 py-2 border rounded w-full sm:w-1/2"
            />
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-2 border rounded w-full sm:w-1/4"
                >
                    {regions.map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-4 py-2 border rounded"
                >
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>
                            🗣️ {lang}
                        </option>
                    ))}
                </select>
            </div>

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
