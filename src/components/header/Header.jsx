import React from 'react';
import { useState } from 'react';
import './Header.css';
import logoutIcon from '../../assets/logout.svg';
import profileIcon from '../../assets/profile.svg';

import AuthContext from '../../contexts/AuthContext';

//import AnchorLink from 'react-anchor-link-smooth-scroll'; --- v2 has come out since
//import AnchorLink from 'react-anchor-link-smooth-scroll-v2';

import { NavLink, useNavigate } from 'react-router-dom';
// NavLink can be styled based on whether it is active or not

import { HashLink } from 'react-router-hash-link';
import { useContext } from 'react';

// this function is for Hashlink to scroll with offset of 120px
const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -120; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}
/* 
inline solution, but with no smooth scroll: 
scroll={el => { el.scrollIntoView(true); window.scrollBy(0, -120) }} 
*/

// scroll to bottom when Contact is clicked regardless of page we are on
function scrollToBottom() {
    window.scroll({
        top: document.body.offsetHeight,
        left: 0, 
        behavior: 'smooth',
    });
}


export default function Header() {

    const navigate = useNavigate();

    const { userData, isLoggedIn, logOut } = useContext(AuthContext);
    //console.log(userData)

    const headerLogOut = () => {
        logOut();
        navigate('/login')
    }


    return (
        <header>
            <div className='header-container'>

                <div className='navbar-top'>
                    <HashLink to='/home'><div className='logo'></div></HashLink>
                    <nav>
                        <ul>

                            {/* <li><AnchorLink offset= '120' href='#random-name-section'>Random</AnchorLink> </li> */}

                            <li>
                                <HashLink 
                                    smooth 
                                    scroll={el => scrollWithOffset(el)}
                                    to='/home#hero-section'
                                    >Főoldal
                                </HashLink>
                            </li>

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
                            
                            {!isLoggedIn
                            &&
                            <li>
                                <HashLink 
                                    smooth 
                                    scroll={el => scrollWithOffset(el)}
                                    to='/home#registration-section'
                                    >Regisztráció
                                </HashLink>
                            </li>}

                            {/* <li>
                                <HashLink 
                                    smooth 
                                    scroll={el => scrollWithOffset(el)}
                                    to='/#footer'
                                    >Kontakt
                                </HashLink>
                            </li> */}
                            <li onClick={scrollToBottom}>Kontakt</li>

                        </ul>
                    </nav>
                </div>

                {!isLoggedIn 
                &&
                <div className='login-register'>
                    <button className='login-button'>
                        <NavLink to='/login'>
                            Bejelentkezés
                        </NavLink>
                    </button>
                    <button className='register-button'>
                        <HashLink 
                            smooth 
                            scroll={el => scrollWithOffset(el)}
                            to='/home#registration-section'
                            >Regisztráció
                        </HashLink>
                    </button>
                </div>}

                {isLoggedIn
                &&
                <div className='profile-logout'>
                    <img src={profileIcon} alt='profile icon' />
                    <div>
                        <NavLink to='/profile'>{userData.username}</NavLink>
                    </div>
                    <img onClick={headerLogOut} src={logoutIcon} alt='logout'/>
                </div>}

            </div>
        </header>
    )
}
