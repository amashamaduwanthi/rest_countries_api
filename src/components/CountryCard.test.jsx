import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from '../components/CountryCard';

const mockCountry = {
    name: { common: 'Sri Lanka' },
    capital: ['Colombo'],
    region: 'Asia',
    population: 21400000,
    flags: { svg: 'https://flagcdn.com/lk.svg' },
    languages: { sin: 'Sinhala', tam: 'Tamil' },
};

describe('CountryCard', () => {
    test('renders country details correctly', () => {
        render(<CountryCard country={mockCountry} isFavorite={false} toggleFavorite={jest.fn()} />);

        expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
        expect(screen.getByText(/Colombo/i)).toBeInTheDocument();
        expect(screen.getByText(/Asia/i)).toBeInTheDocument();
        expect(screen.getByText(/Sinhala, Tamil/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Sri Lanka/i)).toBeInTheDocument();
    });

    test('toggleFavorite triggers on button click', () => {
        const toggleFavorite = jest.fn();
        render(<CountryCard country={mockCountry} isFavorite={false} toggleFavorite={toggleFavorite} />);

        fireEvent.click(screen.getByRole('button'));
        expect(toggleFavorite).toHaveBeenCalledWith(mockCountry);
    });
});
