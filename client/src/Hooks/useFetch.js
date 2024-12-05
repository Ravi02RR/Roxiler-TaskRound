/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (path, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    function fetchData() {
        setLoading(true);
        axios
            .get(`http://localhost:3000/api/v1${path}`, options)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, [path]);

    return { data, loading };
};
