import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ArtistCard from '../../src/components/ArtistCard';
import axios from 'axios';

jest.mock('axios');

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe('ArtistCard', () => {
  const artist = {
    name: 'Artist name',
    url: 'https://www.last.fm/music/Artist+name',
    listeners: '123456',
    image: [{ '#text': 'https://via.placeholder.com/300' }],
  };
  const email = 'user@example.com';
  const action = 'add';

  it('renders correctly', () => {
    const { getByText } = render(<ArtistCard artist={artist} email={email} action={action} />);
    expect(getByText(artist.name)).toBeInTheDocument();
    expect(getByText(`${artist.listeners} Listeners`)).toBeInTheDocument();
  });

  it('navigates to artist page when image is clicked and correct URL is generated', () => {
    const navigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigate);
    const { getByAltText } = render(<ArtistCard artist={artist} email={email} action={action} />);
    fireEvent.click(getByAltText('image'));

    expect(navigate).toHaveBeenCalledWith(`/artist/${artist.url?.split('/').pop()}`);
  });
});
