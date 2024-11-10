// import React from 'react'
// import { Route, Routes } from 'react-router-dom';
// import ProductsPage from './ProductsPage';
// import About from './About';
// import SignIn from './auth/SignIn';
// import SignUp from './auth/SignUp';
// import ProtectedRoute from '../Components/Layout/Route/ProtectedRoute';
// import Dashbord from './user/Dashboard';
// import PageNotFound from './PageNotFound';
// import Cart from './Cart';
// import ForgotPassword from './auth/ForgotPassword';
// import Contact from './Contact';
// import Policy from './Policy';
// import AdminProtectedRoute from '../Components/Layout/Route/AdminProtectedRoute';
// import Order from './user/Order';
// import Profile from './user/Profile';
// import AdminDashboard from './Admin/AdminDashboard';
// import CreateCategory from './Admin/CreateCategory';
// import CreateProduct from './Admin/CreateProduct';
// import AllOrders from './Admin/AllOrders';
// import Users from './Admin/Users';
// import Products from './Admin/Product';
// import UpdateProduct from './Admin/UpdateProduct';
// import SinglePage from './SinglePage';
// import SearchPage from './SearchPage';
// import AllCategory from './AllCategory';
// import CategoryPage from './CategoryPage';
// import OtpLogin from './auth/OtpLogin';
// import Seller from './Seller';
// import SellerSignUp from './auth/SellerSignUp';
// import Home from './Home';
// import SellerSignin from './auth/SellerSignin';
// import SellerDashboard from './user/SellerDashboard';

// function RoutesPage() {
//     return (
//         <>
//             <Routes>
//                 <Route path='/' element={<Home />} />
//                 <Route path='/products' element={<ProductsPage />} />
//                 <Route path='/cart' element={<Cart />} />
//                 <Route path='/about' element={<About />} />
//                 <Route path='/signin' element={<SignIn />} />
//                 <Route path='/signup' element={<SignUp />} />
//                 <Route path='/otplogin' element={<OtpLogin />} />
//                 <Route path='/contact' element={<Contact />} />
//                 <Route path='/policy' element={<Policy />} />
//                 <Route path='/forgot-password' element={<ForgotPassword />} />
//                 <Route path='/singlePage/:id' element={<SinglePage />} />
//                 <Route path='/searchpage' element={<SearchPage />} />
//                 <Route path='/all-category' element={<AllCategory />} />
//                 <Route path='/all-category/:slug' element={<CategoryPage />} />
//                 <Route path='/seller' element={<Seller />} />
//                 <Route path='/seller-Signup' element={<SellerSignUp />} />
//                 <Route path='/seller-Signin' element={<SellerSignin />} />
//                 <Route path='/seller-Dashboard' element={<SellerDashboard />} />

//                 <Route path='/dashboard' element={<ProtectedRoute />} >
//                     <Route path='user' element={<Dashbord />} />
//                     <Route path="user/order" element={<Order />} />
//                     <Route path="user/profile" element={<Profile />} />
//                 </Route>

//                 <Route path='/dashboard' element={<AdminProtectedRoute />} >
//                     <Route path='admin' element={<AdminDashboard />} />
//                     <Route path="admin/create-category" element={<CreateCategory />} />
//                     <Route path="admin/create-product" element={<CreateProduct />} />
//                     <Route path="admin/products" element={<Products />} />
//                     <Route path="admin/products/:id" element={<UpdateProduct />} />
//                     <Route path="admin/all-orders" element={<AllOrders />} />
//                     <Route path="admin/users" element={<Users />} />
//                 </Route>
//                 <Route path='/*' element={<PageNotFound />} />
//             </Routes>
//         </>
//     )
// }

// export default RoutesPage

import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import About from './About';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ProtectedRoute from '../Components/Layout/Route/ProtectedRoute';
import Dashboard from './user/Dashboard';
import PageNotFound from './PageNotFound';
import Cart from './Cart';
import ForgotPassword from './auth/ForgotPassword';
import Contact from './Contact';
import Policy from './Policy';
import AdminProtectedRoute from '../Components/Layout/Route/AdminProtectedRoute';
import Order from './user/Order';
import Profile from './user/Profile';
import AdminDashboard from './Admin/AdminDashboard';
import CreateCategory from './Admin/CreateCategory';
import CreateProduct from './Admin/CreateProduct';
import AllOrders from './Admin/AllOrders';
import Users from './Admin/Users';
import Products from './Admin/Product';
import UpdateProduct from './Admin/UpdateProduct';
import SinglePage from './SinglePage';
import SearchPage from './SearchPage';
import AllCategory from './AllCategory';
import CategoryPage from './CategoryPage';
import OtpLogin from './auth/OtpLogin';
import Seller from './Seller';
import SellerSignUp from './auth/SellerSignUp';
import Home from './Home';
import SellerSignin from './auth/SellerSignin';
import SellerDashboard from './user/SellerDashboard';

const RoutesPage = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: 'products', element: <ProductsPage /> },
    { path: 'cart', element: <Cart /> },
    { path: 'about', element: <About /> },
    { path: 'signin', element: <SignIn /> },
    { path: 'signup', element: <SignUp /> },
    { path: 'otplogin', element: <OtpLogin /> },
    { path: 'contact', element: <Contact /> },
    { path: 'policy', element: <Policy /> },
    { path: 'forgot-password', element: <ForgotPassword /> },
    { path: 'singlePage/:id', element: <SinglePage /> },
    { path: 'searchpage', element: <SearchPage /> },
    { path: 'all-category', element: <AllCategory /> },
    { path: 'all-category/:slug', element: <CategoryPage /> },
    { path: 'seller', element: <Seller /> },
    { path: 'seller-signup', element: <SellerSignUp /> },
    { path: 'seller-signin', element: <SellerSignin /> },
    { path: 'seller-dashboard', element: <SellerDashboard /> },
    { 
      path: 'dashboard', 
      element: <ProtectedRoute />, 
      children: [
        { path: 'user', element: <Dashboard /> },
        { path: 'user/order', element: <Order /> },
        { path: 'user/profile', element: <Profile /> },
      ],
    },
    {
      path: 'dashboard', 
      element: <AdminProtectedRoute />, 
      children: [
        { path: 'admin', element: <AdminDashboard /> },
        { path: 'admin/create-category', element: <CreateCategory /> },
        { path: 'admin/create-product', element: <CreateProduct /> },
        { path: 'admin/products', element: <Products /> },
        { path: 'admin/products/:id', element: <UpdateProduct /> },
        { path: 'admin/all-orders', element: <AllOrders /> },
        { path: 'admin/users', element: <Users /> },
      ],
    },
    { path: '*', element: <PageNotFound /> },
  ];

  return useRoutes(routes);
};

// const RoutesPage = () => {
//   return (
//     <BrowserRouter>
//       <RoutesPage />
//     </BrowserRouter>
//   );
// };

export default RoutesPage;
