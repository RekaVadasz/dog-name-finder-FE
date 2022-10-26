import { useState, useEffect} from 'react';

export default function useFetch(url) {
    
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    
    useEffect(() => {
        if (url === '') return; 

        const fetchData = async () => {
            try {
                setStatus('fetching');
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
                setStatus('fetched');
            } catch (error){
                console.log("error", error)
            }
        };

        fetchData();

    }, [url])

    return {status, data}
}
