import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './Context/AuthContext.jsx';
import CategoryContext from './Context/CategoryContext.jsx';
import ProductContext from './Context/ProductContext.jsx';
import SearchContext from './Context/SearchContext.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import CartContext from './Context/CartContext.jsx';
import LanguageContext from './Context/LanguageContext.jsx';
import ThemeContext from './Context/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContext>
    <BrowserRouter>
      <LanguageContext>
        <ErrorBoundary>
          <AuthContext>
            <CategoryContext>
              <SearchContext>
                <ProductContext>
                  <CartContext>
                    <App />
                  </CartContext>
                </ProductContext>
              </SearchContext>
            </CategoryContext>
          </AuthContext>
        </ErrorBoundary>
      </LanguageContext>
    </BrowserRouter>
  </ThemeContext>
)
