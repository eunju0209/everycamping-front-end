import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import './index.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import NewReview from './pages/NewReview';
import NotFound from './pages/NotFound';
import UserOrderList from './pages/User/UserOrderList';
import OrderForm from './pages/OrderForm';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Search from './pages/Search';
import SellerConfirm from './pages/SellerConfirm';
import UserInfo from './pages/User/UserInfo';
import KaKaoLoginCallback from './components/Login/socialLogin/KakaoLoginCallback';
import SellerOrderList from './pages/SellerOrderList';
import PasswordEdit from './pages/User/PasswordEdit';
import SellerProducts from './pages/SellerProducts';
import UpdateProduct from './pages/UpdateProduct';
import UserReviewList from './pages/User/UserReviewList';
import UpdateReview from './pages/UpdateReview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'join', element: <Join /> },
      { path: 'tent', element: <Products category='TENT' /> },
      { path: 'cook', element: <Products category='COOK' /> },
      { path: 'accessory', element: <Products category='ACCESSORY' /> },
      { path: 'products/:keyword', element: <Search /> },
      { path: 'products/detail/:id', element: <ProductDetail /> },
      { path: 'products/new', element: <NewProduct /> },
      { path: 'products/update/:productId', element: <UpdateProduct /> },
      { path: 'review/new', element: <NewReview /> },
      { path: 'cart', element: <Cart /> },
      { path: 'order', element: <OrderForm /> },
      { path: 'mypage/user/orders', element: <UserOrderList /> },
      { path: 'mypage/user/reviews', element: <UserReviewList /> },
      { path: 'mypage/seller/orders', element: <SellerOrderList /> },
      { path: 'mypage/products', element: <SellerProducts /> },
      { path: 'kakaoLoginCallback', element: <KaKaoLoginCallback /> },
      { path: 'sellerConfirm', element: <SellerConfirm /> },
      { path: 'userInfo', element: <UserInfo /> },
      { path: 'PasswordEdit', element: <PasswordEdit /> },
      { path: 'reviews/update/:reviewId', element: <UpdateReview /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
