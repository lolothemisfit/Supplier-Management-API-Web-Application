import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddSupplier from './pages/AddSupplier'
import SupplierDetails from './pages/SupplierDetails'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/suppliers/:id" element={<SupplierDetails />} />
          <Route path="/suppliers/add" element={<AddSupplier />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
