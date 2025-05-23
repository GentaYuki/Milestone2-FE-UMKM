import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterForm from './pages/register2'
import LoginForm from './pages/login'
import ProfileForm from './pages/profile'
import HomePage2 from './pages/home2'
import ProductDetailPage from './pages/productDetail'
import CategoryPage from './pages/category'
import CheckoutPage from './pages/checkout'
import PaymentPage from './pages/payment'
import ChangePasswordForm from './pages/changePass'
import { ShopRegisterPage } from './pages/ShopRegisterPage'
import ProductList from './pages/ProductList'
import CreateProductPage from './pages/createProduct'
import UpdateProductPage from './pages/updateProduct'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage2 />} />
        <Route path='/register' element ={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/profile' element={<ProfileForm />} />
        <Route path='/product/:productId' element={<ProductDetailPage />} />
        <Route path='/category/:categorySlug' element={<CategoryPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/changepassword' element={<ChangePasswordForm />} />
        <Route path='/createshop' element={<ShopRegisterPage />}/>
        <Route path='/productlist' element={<ProductList />} />
        <Route path='/createproduct' element={<CreateProductPage />} />
        <Route path='/updateproduct/:productId' element={<UpdateProductPage />} />
      </Routes>
    </Router>
  );
}

export default App