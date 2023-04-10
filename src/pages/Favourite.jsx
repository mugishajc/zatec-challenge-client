import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { useParams } from 'react-router-dom'
import { BACKEND_API_URL } from '../utils/constants'
import axios from "axios"
import FavouriteAlbumCard from '../components/FavouriteAlbumCard'
import FavouriteArtistCard from '../components/FavouriteArtistCard'
import Spinner from "../components/Spinner"

function Favourite() {
  const { name } = useParams()
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const getUser = async () => {
    try {
      setLoading(true)
      let userRes = await axios.get(`${BACKEND_API_URL}/user?email=${user?.email}`);
      if (name === 'albums') {
        let albumUrls = userRes.data.data.favourite_albums?.split(",,,");
        if (albumUrls == null || albumUrls?.includes("")) {
          setAlbums([''])
        } else {
          setAlbums(albumUrls);
        }
      } else if (name === "artists") {
        let artistsUrls = userRes.data.data.favourite_artists?.split(",,,");
        if (artistsUrls == null || artistsUrls?.includes("")) {
          setArtists([''])
        } else {
          setArtists(artistsUrls);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser();
  }, [name])
  return (
    <>
      <SideBar />
      <div className="min-h-screen p-4 bg-white border border-gray-200 shadow sm:ml-64 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="rounded-lg">
          <div className="py-3 pb-4">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Your favourite {name}</h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {!loading ? (
                name === 'albums' ? (
                  !(albums?.includes('')) ? albums?.map((url, idx) => (
                    <FavouriteAlbumCard handleFavouritesChange={getUser} key={idx} albumURL={url} action="remove" email={user?.email} />
                  )) : (
                    <p className="text-lg font-medium text-red-400 truncate dark:text-red-400">No favourites albums!</p>
                  )
                ) : name === 'artists' && (
                  !(artists.includes('')) ? artists?.map((url, idx) => (
                    <FavouriteArtistCard handleFavouritesChange={getUser} key={idx} artistURL={url} action="remove" email={user?.email} />
                  )) : (
                    <p className="text-lg font-medium text-red-400 truncate dark:text-red-400">No favourites artists!</p>
                  )
                )
              ) : (
                <Spinner />
              )}
            </ul>
          </div>
        </div>
      </div >
    </>
  )
}

export default Favourite