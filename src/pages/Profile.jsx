import React from 'react';

import Layout from './Layout';
import SendName from '../components/send-name/SendName';
import DogCardSmall from '../components/dog-card-small/DogCardSmall';
import NameCard from '../components/name-card/NameCard';

import AuthContext from '../contexts/AuthContext';

import useFetch from '../hooks/useFetch';

import { useContext } from 'react';

export default function Profile() {

    // to run locally: "proxy": "http://localhost:5000", should be in package.json
    //const url = './api/firebase'
    
    const url = 'https://doggobase-api.onrender.com/api/firebase'
    const { status, data } = useFetch(url);
    //console.log(status)  

    
    const { userData } = useContext(AuthContext);
    //console.log(userData)
    
    return (
        <Layout>
                <div className='profile-page-container'>
                    <div className='profile-left'>
                        <h2>Kedvenceim</h2>

                        {status === 'fetched' 
                        && 
                        data
                            .filter(dog => {
                                return userData.favs.includes(dog.id)
                            })
                            .map((dog) => {
                                return (<DogCardSmall dog={dog} key={dog.id}/>)
                            })
                        }
                        
                    </div>
                    <div className='profile-right'>
                        <div className='profile-form-container'>
                            <h2>Kutyanév beküldése</h2>
                            <SendName allDogs={data}/>
                        </div>

                        {status === "fetched" &&
                        <div className='profile-sent-names-container'>
                            <h2>Beküldött nevek</h2>
 
                            {
                            userData !== undefined
                            &&
                            data
                                .filter(dog => {
                                    return userData.sent.includes(dog.id)
                                })
                                .map((dog) => {
                                    return (<NameCard dog={dog} key={dog.id}/>)
                                })
                            }

                        </div>
                        }


                    </div>
                </div>
            </Layout>
    )
}
