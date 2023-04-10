import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constants";

function FavouriteAlbumCard({ handleFavouritesChange, albumURL, action, email }) {
  const navigate = useNavigate();
  let albumSlug = albumURL.split("/")[albumURL.split("/").length - 1];
  let artistSlug = albumURL.split("/")[albumURL.split("/").length - 2];

  const handleFavourite = (album) => {
    axios
      .put(BACKEND_API_URL + "/users/favourite", album)
      .then((res) => {
        handleFavouritesChange()
      })
      .catch((err) => console.log(err.message))
  };

  return (
    <li className="py-3 sm:py-4">
      <div className="flex flex-col items-start justify-start gap-4">
        <div className="min-w-0">
          <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
            Album: <b>{albumSlug?.replace(/[^a-zA-Z]/g, " ")}</b>
          </p>
          <p className="text-gray-500 truncate text-md dark:text-gray-400">
            Artist: <b>{artistSlug?.replace(/[^a-zA-Z]/g, " ")}</b>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/album/" + artistSlug + "/" + albumSlug)}
            className="text-sm font-bold text-center text-blue-500 underline rounded-lg"
          >
            See more
          </button>
          <button
            onClick={() => handleFavourite({
              email,
              type: "album",
              action,
              url: albumURL
            })}
            className="text-sm font-medium text-center text-red-500 underline rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>
    </li>);
}

export default FavouriteAlbumCard;
