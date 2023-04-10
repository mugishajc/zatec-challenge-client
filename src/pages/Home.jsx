import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import useFetch from '../hooks/useFetch';
import { API_URL, API_KEY } from '../utils/constants';
import Spinner from '../components/Spinner';

function Home() {
  const [searchParam, setSearchParam] = useState("album.search&album")
  const [searchType, setSearchType] = useState('albums')
  const [searchTerm, setSearchTerm] = useState("life")
  const { isLoading, error, data } = useFetch(searchParam && searchTerm ? `${API_URL}/2.0/?method=${searchParam}=${searchTerm}&api_key=${API_KEY}&format=json` : "", searchType);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    if (searchType === "albums") {
      setSearchParam("album.search&album");
      setSearchTerm("life")
    } else if (searchType === "artists") {
      setSearchParam("artist.search&artist");
      setSearchTerm("cher")
    }
  }, [searchType])

  return (
    <div>
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="rounded-lg">
          <div className="flex items-center justify-center w-7/12 gap-4 mb-4">
            <div className='w-2/12'>
              <select onChange={(e) => setSearchType(e.target.value)} value={searchType} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3.5 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="artists">Artists</option>
                <option value="albums">Albums</option>
              </select>
            </div>
            <form className='w-10/12'>
              <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" onChange={(e) => setSearchTerm(e.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={searchTerm} placeholder={`Type in artist ${searchType}...`} required />
              </div>
            </form>
          </div>
          <div className="py-3 pb-4">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">Results for {searchType.charAt(0).toUpperCase() + searchType.slice(1)} with the name "{searchTerm}"...</h5>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-4 mb-4 rounded bg-gray-50">
            {isLoading ? (
              <Spinner />
            ) : data && data.map((data, idx) => (
              searchType === "albums" ? (
                <AlbumCard album={data} key={idx} action="add" email={user?.email} />
              ) : searchType === "artists" && (
                <ArtistCard artist={data} key={idx} action="add" email={user?.email} />
              )
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home