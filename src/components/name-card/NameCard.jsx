import { useState, React } from 'react';
import './NameCard.css';
import questionIcon from '../../assets/circle-question-regular.svg';
import DogCardLarge from '../dog-card-large/DogCardLarge';

export default function NameCard({dog}) {
    const [ isExpanded, setExpanded ] = useState(false)

    const handleExpand = () => {
        setExpanded(!isExpanded)
    }

    return (
        <>
        <div className='name-card'>
            <div>{dog.name}</div>
            <img 
                src={questionIcon} 
                alt='question mark'
                onClick={handleExpand}
            />
        </div>

        {isExpanded
        &&
        <div className='dog-card-large-background'>
            <DogCardLarge dog={dog} handleExpand={handleExpand}/>
        </div>}
        </>
    )
}
