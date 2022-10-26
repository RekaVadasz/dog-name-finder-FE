import { React, useContext } from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom';
import './Footer.css';

import mailIcon from '../../assets/envelope-solid.svg';
import githubIcon from '../../assets/github.svg';
import linkedinIcon from '../../assets/linkedin.svg';
import logoutIcon from '../../assets/logout.svg';

import AuthContext from '../../contexts/AuthContext';

const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -120; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}

export default function Footer() {
    const { isLoggedIn, logOut } = useContext(AuthContext);

    return (
        <footer id='footer'>
            <div className='footer-container'>
                <div className='logo'></div>
                <div className='navbar-bottom'>
                    <nav>
                        <ul>
                            <li>
                                <HashLink 
                                    smooth 
                                    scroll={el => scrollWithOffset(el)}
                                    to='/home#search-section'
                                    >Névválasztó
                                </HashLink>
                            </li>
                            <li>                                
                                <HashLink 
                                    smooth 
                                    scroll={el => scrollWithOffset(el)}
                                    to='/home#random-name-section'
                                    >Random
                                </HashLink>
                            </li>

                            {!isLoggedIn &&
                            <>
                                <li>
                                    <NavLink to='/login'>Bejelentkezés</NavLink>
                                </li>
                                <li>
                                    <HashLink
                                        smooth
                                        scroll={el => scrollWithOffset(el)}
                                        to='/home#registration-section'
                                        >Regisztráció
                                    </HashLink>
                                </li>
                            </>}

                            {isLoggedIn &&
                            <>
                                <li>
                                    <NavLink to='/profile'>Profilom</NavLink>
                                </li>
                                <li onClick={logOut}>
                                    Kijelentkezés
                                </li>
                            </>}
                        </ul>
                    </nav>
                </div>
                <div className='contact'>
                    <a href='mailto:vadasz.reka87@gmail.com' target='_top' className='email-icon'>
                        <img src={mailIcon} alt='mail icon'></img>
                    </a>
                    <a href='https://github.com/RekaVadasz/dog-name-finder' target='blank' className='github-icon'>
                        <img src={githubIcon} alt='github icon'></img>
                    </a>
                    <a href='https://www.linkedin.com/in/reka-vadasz/' target='blank' className='linkedin-icon'>
                        <img src={linkedinIcon} alt='linkedin icon'></img>
                    </a>
                </div>
            </div>
        </footer>
    )
}