import React from 'react'
import SideBar from '../components/SideBar'
import useFetch from '../hooks/useFetch'
import { API_KEY, API_URL } from '../utils/constants'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Album() {
  const { album, artist } = useParams()
  const { isLoading, error, data } = useFetch(`${API_URL}/2.0/?method=album.getinfo&album=${album}&artist=${artist}&api_key=${API_KEY}&format=json`, 'album')
  return (
    <>
      <SideBar />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="min-h-screen p-4 bg-white border border-gray-200 shadow sm:ml-64 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{data.name} by <i>{data.artist}</i></h5>
          <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Published: {data.wiki?.published}</p>

          <div className="w-full max-w-md bg-white rounded-lg shadow py-2 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Track List</h5>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.tracks && data.tracks?.track.map((track, idx) => (
                  <li key={idx} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={data.image[data.image.length - 1]['#text']} alt="Michael image" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {track?.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {track.artist?.name}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {track?.duration} sec
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}
    </>
  )
}

export default Album