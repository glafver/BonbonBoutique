import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NewInPage from './pages/NewInPage';
import FavPage from './pages/FavPage';
import FaqPage from './pages/FaqPage';
import ProductPage from './pages/ProductPage';
import ContactsPage from './pages/ContactsPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/new-in" element={<NewInPage />} />
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer position='bottom-right' autoClose={700} />
        <Footer />
      </Router>
    </>
  );
}

export default App;
