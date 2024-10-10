import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import Verification from './components/pages/Verification.jsx';
import './assets/fonts/Monofett/Monofett-Regular.ttf';
 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signup/verification' element={<Verification />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
