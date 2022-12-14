import  { React, useContext }from 'react';
import './Profile.css';

import Layout from '../Layout';
import SendName from '../../components/send-name/SendName';
import DogCardSmall from '../../components/dog-card-small/DogCardSmall';
import NameCard from '../../components/name-card/NameCard';

import AuthContext from '../../contexts/AuthContext';

import useFetch from '../../hooks/useFetch';

export default function Profile() {

    const url = 'https://doggobase-api.onrender.com/api/firebase';
    const { status, data } = useFetch(url);
    const { userData } = useContext(AuthContext);
    
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
                                return dog.uploader === userData.username
                            })
                            .map((dog) => {
                                return (<NameCard dog={dog} key={dog.id}/>)
                            })
                        }
                    </div>}
                </div>

            </div>
        </Layout>
    )
}
