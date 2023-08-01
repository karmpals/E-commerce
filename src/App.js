import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import PageNotFound from './pages/404';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProtected from './features/auth/components/ProtectedAdmin';
import AdminHomePage from './pages/AdminHomePage';
import AdminProductDetailPage from './pages/AdminProductDetailPage'
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (<Protected><Home /></Protected>),
  },
  {
    path: '/admin',
    element: (<AdminProtected><AdminHomePage /></AdminProtected>),
  },
  {
    path: '/login',
    element: (<LoginPage />),
  },
  {
    path: '/signup',
    element: (<SignupPage />),
  },
  {
    path: '/cart',
    element: (<Protected><CartPage /></Protected>),
  },
  {
    path: '/checkout',
    element: (<Protected><CheckoutPage /></Protected>),
  },
  {
    path: '/product-detail/:id',
    element: (<Protected><ProductDetailPage /></Protected>),
  },
  {
    path: '/admin/product-detail/:id',
    element: (<AdminProtected><AdminProductDetailPage /></AdminProtected>),
  },
  {
    path: '/admin/product-form',
    element: (<AdminProtected><AdminProductFormPage /></AdminProtected>),
  },
  {
    path: '/admin/orders',
    element: (<AdminProtected><AdminOrdersPage /></AdminProtected>),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (<AdminProtected><AdminProductFormPage /></AdminProtected>),
  },
  {
    path: '/order-success/:id',
    element: (<Protected><OrderSuccessPage /></Protected>),
  },
  {
    path: '/orders',
    element: (<Protected><UserOrderPage /></Protected>),
  },
  {
    path: '/profile',
    element: (<Protected><UserProfilePage /></Protected>),
  },
  {
    path: '/logout',
    element: (<Logout />),
  },
  {
    path: '/forgot-password',
    element: (<ForgotPasswordPage />),
  },
  {
    path: '*',
    element: (<PageNotFound />),
  },

])

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked)

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, user])

  return (
    <div className="App">
      {userChecked && (<RouterProvider router={router} />)}
    </div>
  );
}

export default App;
