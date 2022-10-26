import './reset.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import { AuthProvider } from './contexts/AuthContext';
import AuthContext from './contexts/AuthContext';

import Home from './pages/home/Home';
import NoPage from './pages/nopage/NoPage';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';

function App() {
    
    function PrivateRoute({ children }) {
        const { isLoggedIn } = useContext(AuthContext);
        return isLoggedIn ? children : <Login />; 
    }

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/home' element={<Home />}/>
                    <Route 
                        path='/profile' 
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>}
                    />
                    <Route path='*' element={<NoPage />} />
                    <Route path='/login' element={<Login />}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
