import { Routes, Route, Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { useEffect } from 'react'

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'


import Navbar from './components/Navbar'

import { useUserStore } from './stores/useUserStore'
import LoadingSpinner from './components/LoadingSpinner'

import { useCartStore } from './stores/useCartStore'


function App() {

  const { user, checkAuth,checkingAuth } = useUserStore();

  const { getCartItems } = useCartStore();


  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  useEffect(()=>{
    if(!user) return;
    getCartItems();
  },[getCartItems,user])


  if(checkingAuth) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />

          
        </div>
      </div>
      <div className='relative z-50 pt-20'>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/signup" element={!user ? <SignupPage></SignupPage> : <Navigate to={'/'}/>}></Route>
          <Route path="/login" element={!user ? <LoginPage></LoginPage> : <Navigate to={'/'}/>}></Route>
          <Route path='/secret-dashboard' element={user?.role === "admin" ? <AdminPage></AdminPage> : <Navigate to={'/login'}></Navigate>}></Route>
          <Route path='/category/:category' element={<CategoryPage></CategoryPage>}>
          </Route>
          <Route path='/cart' element={user ? <CartPage/> : <Navigate to='/login'></Navigate>}></Route>
        </Routes>
      </div>
      <Toaster></Toaster>
    </div>
  )
 
}

export default App
