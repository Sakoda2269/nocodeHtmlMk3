import { useEffect, useState } from "react";

export default function useFetchGet(url) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const get = async () => {
            try {
                const res = await fetch(url, {method: "GET"});
                const json = await res.json();
                setData(json);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        get();
    }, []);

    return {data, loading, error};
}