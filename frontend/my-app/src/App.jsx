import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login'
import SignUp from './signUp'
import Product from './UserProduct'
import GetUserData from './GetUserData'
import AdminProduct from './AdminProduct'


function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/addProduct' element={<Product />} />
        <Route path='/admin/users' element={<GetUserData />} />
        <Route path='/admin/product' element={<AdminProduct />} />
      </Routes>
    </>
  )
}



export default App
