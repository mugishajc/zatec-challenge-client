import React from "react";
import { truncateString } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constants";

function AlbumCard({ album, email, action }) {
  const navigate = useNavigate();
  let albumSlug = album.url?.split("/")[album.url.split("/").length - 1];
  let artistSlug = album.url?.split("/")[album.url.split("/").length - 2];

  const handleFavourite = (album) => {
    axios
      .put(BACKEND_API_URL + "/users/favourite", album)
      .then((res) => {
        console.log(res.data);
      })
  };

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            onClick={() => navigate("/album/" + artistSlug + "/" + albumSlug)}
            className="object-cover w-full p-5 rounded-t-lg h-72"
            src={album.image[album.image?.length - 1]["#text"]}
            alt="image"
          />
        </a>
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {truncateString(album?.name, 15)}
            </h5>
            <svg
              onClick={() => handleFavourite({
                email,
                type: "album",
                action,
                url: album?.url
              })}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="w-6 h-6 cursor-pointer hover:scale-125"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center mt-2.5 mb-2 text-gray-900 dark:text-white">
            By: {album.artist}
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => navigate("/album/" + artistSlug + "/" + albumSlug)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              See more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlbumCard;
