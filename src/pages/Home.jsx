import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import { db, auth } from '../Firebase.js' //  Firebase auth + db
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [selectedLanguage, setSelectedLanguage] = useState('All');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [error, setError] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Track auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/login');
            } else {
                setUser(currentUser);
            }
        });
        return () => unsubscribe();
    }, []);

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
    // 2. Load favorites from Firebase
    useEffect(() => {
        if (user) {
            const favRef = doc(db, 'favorites', user.uid);
            getDoc(favRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        setFavorites(docSnap.data().items || []);
                    }
                })
                .catch((err) => console.error('Error loading favorites:', err));
        }
    }, [user]);

// Toggle favorite
    const toggleFavorite = (country) => {
        const isFavorite = favorites.some((fav) => fav.name.common === country.name.common);
        let updated = [];

        if (isFavorite) {
            updated = favorites.filter(fav => fav.name.common !== country.name.common);
            toast('Removed from favorites');
        } else {
            updated = [...favorites, country];
            toast.success('Added to favorites!');
        }

        setFavorites(updated);
        if (user) {
            const favRef = doc(db, 'favorites', user.uid);
            setDoc(favRef, { items: updated }).catch((err) =>
                console.error('Error saving favorites:', err)
            );
        }
    };

    //Filter logic (by name and region)
    const filteredCountries = countries.filter((country) =>{
        const matchesName = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
        const matchesLanguage =
            selectedLanguage === 'All' ||
            (country.languages && Object.values(country.languages).includes(selectedLanguage));
        return matchesName && matchesRegion && matchesLanguage;
        });
    const displayList = showFavoritesOnly ? favorites : filteredCountries;
    //  Available region options (you can customize this list)
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Toaster position="top-right" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">🌍 REST Countries Explorer</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
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
                <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {showFavoritesOnly ? "Show All" : "Show Favorites"}
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {displayList.map((country) => (
                    <CountryCard key={country.name.common} country={country} isFavorite={favorites.some((fav) => fav.name.common === country.name.common)}
                                 toggleFavorite={toggleFavorite} />
                ))}
            </div>
        </div>
    );
};

export default Home;
