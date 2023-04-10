import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AlbumCard from "../../src/components/AlbumCard";
import axios from "axios";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("AlbumCard component", () => {
  const album = {
    name: "Test Album",
    artist: "Test Artist",
    image: [{ "#text": "test.jpg" }],
    url: "https://www.last.fm/music/Test+Artist/Test+Album",
  };

  const email = "test@example.com";
  const action = "favorite";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the album name", () => {
    render(<AlbumCard album={album} email={email} action={action} />);
    expect(screen.getByText("Test Album")).toBeInTheDocument();
  });

  it("navigates to the album page when the 'See more' button is clicked", () => {
    const navigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigate);
    render(<AlbumCard album={album} email={email} action={action} />);
    const seeMoreButton = screen.getByText("See more");
    fireEvent.click(seeMoreButton);
    expect(navigate).toHaveBeenCalledWith(
      `/album/Test+Artist/Test+Album`
    );
  });
});
