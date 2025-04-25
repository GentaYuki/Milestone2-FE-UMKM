import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterForm from './pages/register'
import LoginForm from './pages/login'
import ProfileForm from './pages/profile'
import HomePage from './pages/home'
import ProductDetailPage from './pages/productDetail'
import CategoryPage from './pages/category'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/register' element ={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/profile' element={<ProfileForm />} />
        <Route path='//product/:productId' element={<ProductDetailPage />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App