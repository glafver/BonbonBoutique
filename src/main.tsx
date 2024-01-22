import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/index.scss';
import { CartProvider } from './contexts/CartContext.tsx';
import { FavProvider } from './contexts/FavContext.tsx';
import { ProductsProvider } from './contexts/ProductsContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <FavProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavProvider>
      </ProductsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
