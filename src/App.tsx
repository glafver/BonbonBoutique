import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NewInPage from './pages/NewInPage';
import FavPage from './pages/FavPage';
import FaqPage from './pages/FaqPage';
import ContactsPage from './pages/ContactsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/new-in" element={<NewInPage />} />
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
        <ToastContainer position='bottom-right' autoClose={700} />
        <Footer />
      </Router>
    </>
  );
}

export default App;
