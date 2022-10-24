import React from 'react';

import Layout from './Layout';
import Hero from '../components/hero/Hero';
import WalkingPaw from '../components/walking-paw/WalkingPaw';
import Search from '../components/search/Search';
import RandomName from '../components/random-name/RandomName';
import Registration from '../components/registration/Registration';

import useFetch from '../hooks/useFetch';

export default function Home() {

    const url = './api/firebase'
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
