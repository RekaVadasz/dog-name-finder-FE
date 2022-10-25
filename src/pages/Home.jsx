import React from 'react';

import Layout from './Layout';
import Hero from '../components/hero/Hero';
import WalkingPaw from '../components/walking-paw/WalkingPaw';
import Search from '../components/search/Search';
import RandomName from '../components/random-name/RandomName';
import Registration from '../components/registration/Registration';

import useFetch from '../hooks/useFetch';

export default function Home() {

    // to run locally: "proxy": "http://localhost:5000", should be in package.json
    //const url = './api/firebase'

    const url = 'https://doggobase-api.onrender.com/api/firebase'
    
    
    const { status, data } = useFetch(url);


    return (
        <Layout>
            <Hero />
            <WalkingPaw />
            <Search allDogs={data}/>
            <RandomName allDogs={data} />
            <Registration />
        </Layout>
    )
}
