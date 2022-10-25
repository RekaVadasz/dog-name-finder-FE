import { useState, useEffect} from 'react';

export default function useFetch(url) {
    
    //const cache = useRef({}); -- this is good for APIS with limited request numbers
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    
    useEffect(() => {
        if (url === '') return; //nem biztos, hogy kell

        //let abortHandler = new AbortController()
        const fetchData = async () => {
            try {
                setStatus('fetching');
 
                const response = await fetch(url/* , {signal:abortHandler.signal} */);
                const data = await response.json();
                setData(data);
                setStatus('fetched');
                //console.log('fetch done')
                
            } catch (error){
                console.log("error", error)
            }
        };

        fetchData();
        //return () => {abortHandler.abort()} //ha megnyitom a komponenst de rögtön elkattintok, abortálja a fetchet


    }, [url])

    //console.log(status)
    //console.log(data)
    return {status, data}
}
