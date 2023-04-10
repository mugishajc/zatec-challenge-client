import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constants";

function FavouriteArtistCard({ handleFavouritesChange, artistURL, action, email }) {
  const navigate = useNavigate();
  let artistSlug = artistURL.split("/")[artistURL.split("/").length - 1];

  const handleFavourite = (album) => {
    axios
      .put(BACKEND_API_URL + "/users/favourite", album)
      .then((res) => {
        handleFavouritesChange()
      })
      .catch(err => console.log(err.message))
  };

  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-start justify-start gap-4 flex-col">
        <div className="min-w-0">
          <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
            Artist: <b>{artistSlug?.replace(/[^a-zA-Z]/g, " ")}</b>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/artist/" + artistSlug)}
            className="text-sm font-bold text-center text-blue-500 underline rounded-lg"
          >
            See more
          </button>
          <button
            onClick={() => handleFavourite({
              email,
              type: "artist",
              action,
              url: artistURL
            })}
            className="text-sm font-medium text-center text-red-500 underline rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>
    </li>);
}

export default FavouriteArtistCard;
