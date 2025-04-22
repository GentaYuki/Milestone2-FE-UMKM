import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterForm from './pages/register'
import LoginForm from './pages/login'
import ProfileForm from './pages/profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element ={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/profile' element={<ProfileForm />} />
      </Routes>
    </Router>
  );
}

export default App