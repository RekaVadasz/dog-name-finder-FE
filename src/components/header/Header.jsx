import { React, useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink, useNavigate } from 'react-router-dom';

import './Header.css';

import logoutIcon from '../../assets/logout.svg';
import profileIcon from '../../assets/profile.svg';

import AuthContext from '../../contexts/AuthContext';

const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -120; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}

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
    const [scroll, setScroll] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 0);
            setMenuOpen(false);
        });
    }, []); 


    const headerLogOut = () => {
        logOut();
        navigate('/login')
    }

    return (
        <header className={scroll && 'scrolled'}>
            <div className='header-container' >
                <HashLink to='/home' className='logo-container'><div className='logo'></div></HashLink>
                
                <nav>
                    <div 
                        className={`bx ${isMenuOpen ? 'bx-x icon-open' : 'bx-menu'}`}
                        id="menu-icon"
                        onClick={() => {setMenuOpen(!isMenuOpen)}}
                    ></div>
                    <ul className={isMenuOpen && 'menu-open'}>
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
                        <li onClick={scrollToBottom}>Kontakt</li>
                    </ul>
                </nav>

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
