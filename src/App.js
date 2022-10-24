import './reset.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';

import { AuthProvider } from './contexts/AuthContext';
import AuthContext from './contexts/AuthContext';

import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Profile from './pages/Profile';
import Login from './pages/login/Login';


function App() {

    //const navigate = useNavigate();
    
    function PrivateRoute({ children }) {
        const { isLoggedIn } = useContext(AuthContext);
        return isLoggedIn ? children : <Login />; // what if false? 
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
