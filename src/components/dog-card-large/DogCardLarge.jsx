import { useState, useContext, React } from 'react';
import './DogCardLarge.css';

import AuthContext from '../../contexts/AuthContext';

import useFetch from '../../hooks/useFetch';

import favouriteIcon from '../../assets/favourite-filled.svg';
import notFavouriteIcon from '../../assets/favourite-unfilled.svg';
import femaleIcon from '../../assets/female.svg';
import maleIcon from '../../assets/male.svg';
import smallDogIcon from '../../assets/small-size-dog.png';
import mediumDogIcon from '../../assets/medium-size-dog.png';
import largeDogIcon from '../../assets/large-size-dog.png';
import closeIcon from '../../assets/close-icon.svg';
import heartIcon from '../../assets/heart-peach.svg';
import imagePlaceholder from '../../assets/digging-dog.png';
import { useEffect } from 'react';

export default function DogCardLarge({ dog, handleExpand }) {

    const { isLoggedIn, userData } = useContext(AuthContext);
    
    const [isImageLoaded, setImageLoaded] = useState(false)
    const [isFavourite, setFavourite] = useState(false)
    
    //const { status, data } = useFetch(url);

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

    useEffect(() => {
        if (isLoggedIn) {
            const isTrue = userData.favs.includes(dog.id);
            setFavourite(isTrue)
        } 
    }, [isLoggedIn])
    

    const handleClick = async function() {
        setFavourite(!isFavourite);
        const url = `https://doggobase-api.onrender.com/update?userId=${userData.userId}&favId=${dog.id}`;
        const requestOptions = {method: 'PUT'}

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='card-large'>
            <div className='card-large-details'>
                <div className='card-large-name-text'>név:</div>
                <div className='card-large-name'>{dog.name}</div>
                <div className='card-large-breed-text'>fajta:</div>
                <div className='card-large-breed'>{dog.breed}</div>
                <div className='card-large-gender-text'>nem:</div>
                <div className='card-large-gender'>{dog.gender}</div>
                <div className='card-large-size-text'>méret:</div>
                <div className='card-large-size'>{dog.size}</div>
                <div className='card-large-traits-text'>jellemzők:</div>
                <div className='card-large-traits'>
                    {dog.traits.map((trait, index) => (
                        <div key={index}>
                            {trait}
                        </div>
                    ))}
                </div>
                <div className='card-large-likes'>
                    <img className='card-large-heart-icon' src={heartIcon} alt='small heart' />
                    <div className='card-large-likes-number'>1</div>
                </div>
                <div className='card-large-uploader'>
                    <span className='card-large-uploader-text'>beküldő:</span>
                    <span className='card-large-uploader-name'>{dog.uploader}</span>
                </div>

                {dog.gender === "fiú" 
                ?
                <img src={maleIcon} className='card-large-gender-icon' alt="male icon"/>
                : 
                <img src={femaleIcon} className='card-large-gender-icon' alt="female icon"/>}
                
                <img className='card-large-size-icon' src={dogSizeImage(dog.size)} alt='medium dog' />
            </div>
            <div className='card-large-image'>
                {!isImageLoaded && <img className='card-large-dog-image-placeholder' src={imagePlaceholder} alt='dog digging'/>}

                <img 
                    className={isImageLoaded ? 'card-large-dog-image' : 'card-large-dog-image-d-none'} 
                    src={dogImage} 
                    alt='dog' 
                    onLoad={() => setImageLoaded(true)} 
                />  

                {isLoggedIn &&
                <img 
                    className='card-large-favourite-icon' 
                    src={isFavourite? favouriteIcon : notFavouriteIcon} 
                    alt='heart' 
                    onClick={handleClick}
                />}
                
                <img className='card-large-close-icon' src={closeIcon} alt='close' onClick={handleExpand}/>
            </div>
        </div>
    )
}
