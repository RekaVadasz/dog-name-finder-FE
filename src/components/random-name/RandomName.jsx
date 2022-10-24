import { useState, React } from 'react';
import './RandomName.css';

import NameCard from '../name-card/NameCard';

export default function RandomName({allDogs}) {

    const [ randomDog, setRandomDog ] = useState();
    const [ ballClass, setBallClass ] = useState('yellow-ball')

    const handleClick = () => {
        const dog = allDogs[Math.floor(Math.random() * allDogs.length)];
        setRandomDog(dog);
        setBallClass('yellow-ball bounce')
        setTimeout(() => {
            setBallClass('yellow-ball')
        }, 2000);
    }


    return (
        <section id='random-name-section'>
            <h2>Bízd a véletlenre!</h2>
            <div className='random-name-text'>
                <p>Kérj egy véletlenszerűen kiálasztott nevet adatbázisunból, amibe már <strong>{allDogs.length} kutyanevet</strong> gyűjtöttünk össze!</p>
                <button onClick={handleClick}>Kérek egy nevet!</button>
            </div>
            {randomDog && <NameCard dog={randomDog}/>}
            <div className='ball-illustration'>
                <div className='barking-collie'></div>
                <div className='ball-curve'></div>
                <div className={ballClass}></div>
            </div>
        </section>
    )
}
