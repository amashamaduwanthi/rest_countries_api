import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from '../Firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

// Mock Firebase
jest.mock('../Firebase.js', () => ({
    db: {},
    auth: {},
}));

jest.mock('firebase/auth', () => ({
    onAuthStateChanged: jest.fn((auth, cb) => {
        cb({ uid: 'test-user' });
        return () => {};  // Return a no-op unsubscribe function here
    }),
    signOut: jest.fn(() => Promise.resolve()),
}));


// Mock Firestore
jest.mock('firebase/firestore', () => ({
    doc: () => ({}),
    getDoc: () => Promise.resolve({ exists: () => true, data: () => ({ items: [] }) }),
    setDoc: jest.fn(() => Promise.resolve()),
}));

// Mock axios
jest.mock('axios');
const mockCountries = [
    {
        name: { common: 'Sri Lanka' },
        capital: ['Colombo'],
        region: 'Asia',
        population: 21400000,
        flags: { svg: 'https://flagcdn.com/lk.svg' },
        languages: { sin: 'Sinhala' },
    },
];

describe('Home Page', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockCountries });
    });

    test('renders countries and allows searching', async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        expect(await screen.findByText(/Sri Lanka/i)).toBeInTheDocument();

        fireEvent.change(screen.getByPlaceholderText(/Search by country name/i), {
            target: { value: 'Sri' },
        });

        await waitFor(() => {
            expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
        });
    });
});
