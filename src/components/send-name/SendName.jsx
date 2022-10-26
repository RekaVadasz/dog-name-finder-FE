import { useState, useEffect, useContext, React } from 'react';
import './SendName.css';

import AuthContext from '../../contexts/AuthContext';

export default function SendName({allDogs}) {

    const { userData } = useContext(AuthContext);
    
    const [dogBreeds, setDogBreeds] = useState([])
    const [inputs, setInputs] = useState({uploader: userData.username, gender: 'fiú', size: 'kicsi', traits: []});
    const [selectedFile, setSelectedFile] = useState(null);
    
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
           //console.log(newTraits)
            setInputs((values) => ({...values, [name]: newTraits}))
        }
    }

    // - - - - input change handler: file upload - - - - 
    const handleChangeFile = (event) => {
        setSelectedFile(event.target.files[0])
    }
    
    // - - - - handle form submit - - - - 
    const handleSubmit = async function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('object', JSON.stringify(inputs))

        await fetch('https://doggobase-api.onrender.com/addnewdog', {
            method: "POST",
            body: formData
        })
    }

    return (
        <form>
            <fieldset>
                <label htmlFor='name-of-dog'>Név:</label>
                <input 
                    required={true}
                    type='text' 
                    id='name-of-dog' 
                    name='name' 
                    placeholder='Kutya neve'
                    value={inputs.value}
                    onChange={handleChange}
                />
            </fieldset>
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
                    <select 
                        name='breed' 
                        onChange={handleChange} 
                        defaultValue='default'
                        required={true} 
                    >
                        <option value='default' disabled={true}>Válassz egy fajtát!</option>
                        {dogBreeds.map((breed, index) => {
                            return (<option key={index} value={breed}>{breed}</option>)
                        })}
                    </select>
                </label>
            </fieldset>
            <fieldset className='traits-checkbox'>
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
                    id='cuddly' 
                    name='traits'
                    value='bújós'
                    onChange={handleChangeCheckbox}
                />
                <label className='input-label' htmlFor='cuddly'>Bújós</label>
                <input 
                    className='input-hidden' 
                    type='checkbox' 
                    id='lazy' 
                    name='traits'
                    value='lusta'
                    onChange={handleChangeCheckbox}
                />
                <label className='input-label' htmlFor='lazy'>Lusta</label>
            </fieldset>
            <label htmlFor='image-upload-input'>Kép feltöltése:</label>
            <input 
                type='file'
                id='image-upload-input' 
                name='image-upload-input'
                onChange={handleChangeFile}
                required={true}
            />
            <button onClick={handleSubmit}>Beküldöm a kutyát!</button>
        </form>
    )
}
