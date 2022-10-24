import { React, useState, useRef } from 'react';
import './Registration.css';

export default function Registration() {
    
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    console.log(error)

    // - - - - handle submit - - - - 

    const handleSubmit = async function (e) {
        e.preventDefault();

        if (!usernameRef.current.value || !passwordRef.current.value || !passwordConfirmRef.current.value) {
            setError('missing input')
            return
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('passwords different')
            return
        }

        setError('')

        try {
            setLoading(true)
            const response = await fetch('./register', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'username': usernameRef.current.value, 'password': passwordRef.current.value})
            })
            const status = await response.text()
            setError(status)
            if (status === 'new user registered') {
                usernameRef.current.value = null;
                passwordRef.current.value = null;
                passwordConfirmRef.current.value = null;
            }
        } catch {
            // eg. network problem 
            setError('failed to create account')
        }
        setLoading(false)
        console.log("posted")
    }


    return (
        <section id='registration-section'>
            <h2>Regisztráció</h2>
            <p>Regisztrált felhasználóként te is feltölthetsz új kutyákat az adatbázisba és el is mentheted a kedvenceidet!</p>

            <form action=''>
                <legend>Ingyenes regisztráció</legend>

                <label htmlFor='register-username'>Felhasználónév</label>
                <input 
                    placeholder='Felhasználónév' 
                    type='text' 
                    id='register-username' 
                    name='register-username'
                    ref={usernameRef}
                    required
                />

                <label htmlFor='register-password'>Jelszó</label>
                <input 
                    placeholder='Jelszó' 
                    type='password' 
                    id='register-password' 
                    name='register-password'
                    ref={passwordRef}
                    required
                />

                <label htmlFor='register-password-confirm'>Jelszó megerősítése</label>
                <input 
                    placeholder='Jelszó még egyszer' 
                    type='password' 
                    id='register-password-confirm' 
                    name='register-password-confirm'
                    ref={passwordConfirmRef}
                    required
                />

                {error === 'missing input' && <div className='register-error-message'>Kérjük töltsd ki az összes beviteli mezőt!</div>}
                {error === 'passwords different' && <div className='register-error-message'>A két jelszó nem egyezik.</div>}
                {error === 'username already exists' && <div className='register-error-message'>Már létező felhasználónév</div>}
                {error === 'new user registered' && <div className='register-success'>Sikeres regisztráció</div>}

                <button onClick={handleSubmit} disabled={loading}>Regisztrálok</button>
            </form>

            <div className='sitting-jack-russel'></div>
        </section>
    )
}
