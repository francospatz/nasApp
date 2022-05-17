import { useState, useEffect } from 'react';
import axios from 'axios'

const useFetch = (url) => {
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url)
                if(response.data.msg) { // If error in request, result doesn't change
                    setLoading(false)
                    console.log(response.data)
                } else {
                    setResult(response.data)
                    console.log(response.data)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [url]);

    return { loading, result }
}

export default useFetch;