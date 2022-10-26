import { React, useContext } from 'react';

import Layout from '../Layout';
import Hero from '../../components/hero/Hero';
import WalkingPaw from '../../components/walking-paw/WalkingPaw';
import Search from '../../components/search/Search';
import RandomName from '../../components/random-name/RandomName';
import Registration from '../../components/registration/Registration';

import AuthContext from '../../contexts/AuthContext';

import useFetch from '../../hooks/useFetch';
import Loader from '../../components/loader/Loader';

export default function Home() {
    const url = 'https://doggobase-api.onrender.com/api/firebase'
    
    const { status, data } = useFetch(url);
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Layout>
            <Hero />
            <WalkingPaw />
            
            {status === 'fetching' && <Loader />}

            {status === 'fetched' && 
            <>
            <Search allDogs={data}/>
            <RandomName allDogs={data} />
            </>}
            
            {!isLoggedIn && <Registration />}
        </Layout>
    )
}
