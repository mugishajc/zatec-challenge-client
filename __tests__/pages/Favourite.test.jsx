import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Favourite from '../../src/pages/Favourite';

jest.mock('axios');
// jest.mock("react-router-dom", () => ({
//   useNavigate: jest.fn(),
// }));


describe('Favourite component', () => {
  beforeEach(() => {
    localStorage.setItem('profile', JSON.stringify({ email: 'test@example.com' }));
  });

  afterEach(() => {
    localStorage.removeItem('profile');
  });

  it('renders the component with album data', async () => {
    const albumUrls = ['https://example.com/album1', 'https://example.com/album2'];
    axios.get.mockResolvedValueOnce({
      data: {
        data: {
          favourite_albums: albumUrls.join(',,,'),
        },
      },
    });

    render(
      <MemoryRouter initialEntries={[`/favourite/albums`]}>
        <Routes>
          <Route path="/favourite/:name" element={<Favourite />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Your favourite albums')).toBeInTheDocument();
    });

    expect(screen.getAllByRole('list')).toHaveLength(albumUrls.length);
  });

  it('renders the component with artist data', async () => {
    const artistUrls = ['https://example.com/artist1', 'https://example.com/artist2'];
    axios.get.mockResolvedValueOnce({
      data: {
        data: {
          favourite_artists: artistUrls.join(',,,'),
        },
      },
    });

    render(
      <MemoryRouter initialEntries={[`/favourite/artists`]}>
        <Routes>
          <Route path="/favourite/:name" element={<Favourite />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Your favourite artists')).toBeInTheDocument();
    });

    expect(screen.getAllByRole('list')).toHaveLength(artistUrls.length);
  });

});
