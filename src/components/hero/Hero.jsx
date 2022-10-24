import React from 'react';
import './Hero.css';
import Corgi from '../corgi/Corgi';

import { HashLink } from 'react-router-hash-link';

const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -120; 
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}

export default function Hero() {
  return (
    <section id='hero-section'>
        <div className='hero-left'>
            <p>Találd meg a tökéletes nevet négylábú kedvencednek!</p>
            <HashLink 
              smooth 
              scroll={el => scrollWithOffset(el)}
              to='/home#search-section'
              ><button>Kipróbálom</button>
            </HashLink>

        </div>

        <div className='hero-animation'>
            <Corgi />
        </div>
    </section>
  )
}
