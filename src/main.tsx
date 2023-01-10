import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import KaKaoLoginCallback from './components/Login/KakaoLoginCallback';
import './index.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import JoinEmail from './pages/Join/JoinEmail';
import JoinSocial from './pages/Join/JoinSocial';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import NewReview from './pages/NewReview';
import NotFound from './pages/NotFound';
import Oders from './pages/Oders';
import OrderForm from './pages/OrderForm';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Search from './pages/Search';
import SellerConfirm from './pages/SellerConfirm';
import UserInfo from './pages/UserInfo/UserInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'join', element: <JoinEmail /> },
      { path: 'join/social', element: <JoinSocial /> },
      { path: 'tent', element: <Products category='tent' /> },
      { path: 'cook', element: <Products category='cook' /> },
      { path: 'accessory', element: <Products category='accessory' /> },
      { path: 'products/:keyword', element: <Search /> },
      { path: 'products/detail/:id', element: <ProductDetail /> },
      { path: 'products/new', element: <NewProduct /> },
      { path: 'products/update/:productId', element: <NewProduct /> },
      { path: 'review/new', element: <NewReview /> },
      { path: 'cart', element: <Cart /> },
      { path: 'order', element: <OrderForm /> },
      { path: 'mypage/orders', element: <Oders /> },
      { path: 'mypage/products', element: <Products /> },
      { path: 'kakaoLoginCallback', element: <KaKaoLoginCallback /> },
      { path: 'sellerConfirm', element: <SellerConfirm /> },
      { path: 'userInfo', element: <UserInfo /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
