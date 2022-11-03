import { useState, React } from 'react';
import './DogCardSmall.css';
import DogCardLarge from '../dog-card-large/DogCardLarge';

import expandIcon from '../../assets/expand-solid.svg';
import femaleIcon from '../../assets/female.svg';
import maleIcon from '../../assets/male.svg';
import smallDogIcon from '../../assets/small-size-dog.png';
import mediumDogIcon from '../../assets/medium-size-dog.png';
import largeDogIcon from '../../assets/large-size-dog.png';

export default function DogCardSmall({dog}) {

    const [ isExpanded, setExpanded ] = useState(false)

    const dogImage = dog.imageSrc;

    const dogSizeImage = function(size) {
        switch (size) {
            case "kicsi":
                return smallDogIcon;
            case "közepes":
                return mediumDogIcon;
            case "nagy":
                return largeDogIcon;
            default:
                return null
        }
    }

    const handleExpand = () => {
        setExpanded(!isExpanded)
    }

    return (
        <>
        <div className='card-small'>
            <div className='card-small-details'>
                <div className='card-small-name'>{dog.name}</div>
                <div className='card-small-breed-text'>fajtája:</div>
                <div className='card-small-breed'>{dog.breed}</div>
                <div className='card-small-traits-text'>jellemzők:</div>
                <div className='card-small-traits'>
                    {dog.traits.map((trait, index) => (
                        <div key={index}>
                            {trait}
                        </div>
                    ))}
                </div>
               
                {dog.gender === "fiú" 
                ?
                <img src={maleIcon} className='card-small-gender-icon' alt="male icon"/>
                : 
                <img src={femaleIcon} className='card-small-gender-icon' alt="female icon"/>}
                
                <img className='card-small-size-icon' src={dogSizeImage(dog.size)} alt='medium dog' />
            </div>
            <div className='card-small-image'>
                <img className='card-small-dog-image' src={dogImage} alt='dog' />
                <img className='card-small-expand-icon' src={expandIcon} alt='expand' onClick={handleExpand} />
            </div>
        </div>

        {isExpanded
        &&
        <div className='dog-card-large-background'>
            <DogCardLarge dog={dog} handleExpand={handleExpand}/>
        </div>}
        </>
    )
}
