import React, { useEffect, useState} from 'react';

import useFetch from '../../hooks/useFetch';

import Dachshund from '../dachshund/Dachshund';
import NameCard from '../name-card/NameCard';
import './Search.css';
import Loader from '../loader/Loader';

/*
import Select from 'react-select';
const options = [
    { value: 'not defined', label: 'Mindegy' },
    { value: 'keverék', label: 'Keverék' },
    { value: 'pumi', label: 'Pumi' },
    { value: 'tacskó', label: 'Tacskó' },
    { value: 'vizsla', label: 'Vizsla' },
    { value: 'border collie', label: 'Border collie' },
    { value: 'törpe pincser', label: 'Törpe pincser' },
    { value: 'mudi', label: 'Mudi' },
    { value: 'törpespicc', label: 'Törpespicc' }
]
<Select 
    options={options} 
    value={breedInput}
    onChange={handleChangeSelect}
/>
*/

export default function Search({allDogs}) {

    const [ url, setUrl ] = useState('') 
    const [dogBreeds, setDogBreeds] = useState([])
    const [inputs, setInputs] = useState({gender: 'fiú', size: 'kicsi', breed: 'mindegy', traits: []});

    const { status, data } = useFetch(url);  

    useEffect(() => {
        let dogBreeds = [];
        allDogs.forEach(dog => {
            if (!dogBreeds.includes(dog.breed)) {
                dogBreeds.push(dog.breed)
            }
        })
        setDogBreeds(dogBreeds.sort())
    }, [allDogs])

    // - - - -  input change handler: radio, select - - - - 
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    // - - - -  input change handler: checkboxes - - - - 
    const handleChangeCheckbox = (event) => {
        const name = event.target.name;
        const newTrait = event.target.value;

        const traits = Array.from(inputs.traits);

        if (event.target.checked) {
            traits.push(newTrait)
            setInputs((values) => ({...values, [name]: traits}))

        } else {
            const newTraits = traits.filter(trait => {return trait !== newTrait})
            console.log(newTraits)
            setInputs((values) => ({...values, [name]: newTraits}))
        }
    }

    //- - - - - submit form handler - - - - - 
    const handleSubmit = e => {
        e.preventDefault();

        const gender = inputs.gender;
        const size = inputs.size;
        const breed = inputs.breed;

        let traits ='';
        inputs.traits.forEach(trait => traits += `&traits=${trait}`)

        const url = `https://doggobase-api.onrender.com/api/search?gender=${gender}&size=${size}&breed=${breed}${traits}`
        setUrl(url);
    }
 
    return (
        <section id='search-section'>
            
            <h2>Kutyanév választó</h2>  

            <p>Add meg kutyusod jellemzőit, és megmutatjuk, hogy a felhasználóinktól gyűjtött adatok alapján milyen nevek illenének hozzá a legjobban. </p>
            
            <div className='search-container'>
                
                <div className='search-dog-container'>
                    <Dachshund />
                </div>

                <div className='search-form-container'>
                    <form action="">
                        <fieldset className='gender-radio'>
                            <legend>Neme:</legend>
                            <input 
                                className='input-hidden' 
                                type='radio' 
                                id='male' 
                                name='gender' 
                                value='fiú'
                                onChange={handleChange}
                                checked={inputs.gender === 'fiú'}
                            />
                            <label className='input-label' htmlFor="male">Fiú</label>
                            <input 
                                className='input-hidden' 
                                type='radio' 
                                id='female' 
                                name='gender' 
                                value='lány'
                                onChange={handleChange}
                                checked={inputs.gender === 'lány'}
                            />
                            <label className='input-label' htmlFor="female">Lány</label>
                        </fieldset>
                        <fieldset className='size-radio'>
                            <legend>Mérete:</legend>
                            <input 
                                className='input-hidden' 
                                type='radio' 
                                id='small' 
                                name='size' 
                                value='kicsi'
                                onChange={handleChange}
                                checked={inputs.size === 'kicsi'}
                            />
                            <label className='input-label' htmlFor="small">Kicsi</label>
                            <input 
                                className='input-hidden' 
                                type='radio' 
                                id='medium' 
                                name='size' 
                                value='közepes'
                                onChange={handleChange}
                                checked={inputs.size === 'közepes'}
                            />
                            <label className='input-label' htmlFor="medium">Közepes</label>
                            <input 
                                className='input-hidden' 
                                type='radio' 
                                id='large' 
                                name='size' 
                                value='nagy'
                                onChange={handleChange}
                                checked={inputs.size === 'nagy'}
                            />
                            <label className='input-label' htmlFor="large">Nagy</label>
                        </fieldset>
                        <fieldset className='breed-dropdown'>
                            <legend>Fajtája:</legend>
                            <label htmlFor="breed">
                                <select name='breed' value={inputs.breed} onChange={handleChange}>
                                    <option value='mindegy'>mindegy</option>
                                    {dogBreeds.map((breed, index) => {
                                        return (<option key = {index} value={breed}>{breed}</option>)
                                    })}
                                </select>
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Egyéb jellemzők (opcionális):</legend>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='smart' 
                                name='traits'
                                value='okos'
                                onChange={handleChangeCheckbox}
                            />
                            <label className='input-label' htmlFor='smart' >Okos</label>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='playful' 
                                name='traits'
                                value='játékos'
                                onChange={handleChangeCheckbox}
                                />
                            <label className='input-label' htmlFor='playful'>Játékos</label>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='fluffy' 
                                name='traits'
                                value='bundás'
                                onChange={handleChangeCheckbox}
                            />
                            <label className='input-label' htmlFor='fluffy'>Bundás</label>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='shy' 
                                name='traits'
                                value='félénk'
                                onChange={handleChangeCheckbox}
                            />
                            <label className='input-label' htmlFor='shy'>Félénk</label>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='active' 
                                name='traits'
                                value='aktív'
                                onChange={handleChangeCheckbox}
                                />
                            <label className='input-label' htmlFor='active'>Aktív</label>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='hungry' 
                                name='traits'
                                value='falánk'
                                onChange={handleChangeCheckbox}
                                />
                            <label className='input-label' htmlFor='hungry'>Falánk</label>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='barking' 
                                name='traits'
                                value='ugatós'
                                onChange={handleChangeCheckbox}    
                            />
                            <label className='input-label' htmlFor='barking'>Ugatós</label>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='lazy' 
                                name='traits'
                                value='lusta'
                                onChange={handleChangeCheckbox}    
                            />
                            <label className='input-label' htmlFor='lazy'>Lusta</label>
                            <input 
                                className='input-hidden' 
                                type='checkbox' 
                                id='cuddly' 
                                name='traits'
                                value='bújós'
                                onChange={handleChangeCheckbox}    
                            />
                            <label className='input-label' htmlFor='cuddly'>Bújós</label>
                        </fieldset>
                        <button onClick={handleSubmit}>Keresd!</button>
                    </form>
                </div>
            </div>

            {status === 'fetching' && <Loader />}

            {status === 'fetched' && 
                <div className='search-results-container'>
                    {
                    data.length === 0 
                    ?
                    <div className='no-result-found'>Nem találtunk a megadott paramétereknek megfelelő kutyust.<br/>Kérjük, próbálkozz egy másik kereséssel!</div>
                    :
                    <div>
                        {data.map((dog) => {
                            return (<NameCard dog={dog} key={dog.id}/>)
                        })}
                    </div>
                    }
                </div>}
        </section>
    )
}