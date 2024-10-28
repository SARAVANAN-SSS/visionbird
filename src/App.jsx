import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

    <Navbar />
    
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/products/:productId' element={<Product/>} />
    <Route path='/contact' element={<Contact/>} />
    </Routes>

    </div>
  )
}

export default App