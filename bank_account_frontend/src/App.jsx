import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import CurrentUserContext from './contexts/CurrentUserContext.js';
import TokenContext from './contexts/TokenContext.js';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import Verification from './components/pages/Verification.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import './assets/fonts/Monofett/Monofett-Regular.ttf';
 
function App() {
  const [curUser, setCurUser] = useState(null);
  const userState = {curUser: curUser, setCurUser: setCurUser};
  const [token, setToken] = useState(null);
  const tokenState = {token: token, setToken: setToken};

  return (
    <div>
      <BrowserRouter>
        <CurrentUserContext.Provider value={userState}>
        <TokenContext.Provider value={tokenState}>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup/verification' element={<Verification />} />
            <Route path='/dashboard' element={<Dashboard />} />
            //TODO add * to empty page
          </Routes>
          <Footer />
        </TokenContext.Provider>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;
