import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useFetch = (url) => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios.get(url);
      setState((prev) => ({ ...prev, data: res.data, loading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: err }));
    }
  }, [url]);
  // Using axios to fetch data from url
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, fetchData };
};

export default useFetch;
