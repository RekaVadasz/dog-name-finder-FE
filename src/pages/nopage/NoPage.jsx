import React from 'react';
import Layout from '../Layout';
import './NoPage.css';

export default function NoPage() {
    return (
        <Layout>
            <div className='no-page-image-container'>
                <p>Upsz... Úgy tűnik, itt semmi nincs, próbálj egy másik oldalt!</p>
                <div className='no-page-image'></div>
            </div>
        </Layout>
    )
}
