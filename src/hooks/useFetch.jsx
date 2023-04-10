import { useState, useEffect } from 'react';

const useFetch = (url, source) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (source === 'albums') {
          setData(json.results.albummatches.album)
        } else if (source === "artists") {
          setData(json.results.artistmatches.artist)
        } else if (source === 'album') {
          setData(json.album)
        } else if (source === "artist") {
          setData(json.artist)
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { isLoading, error, data };
};

export default useFetch;
