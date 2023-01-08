import React from "react";
import { BrowserRouter, NavLink, useParams } from "react-router-dom";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import "./main.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import {
  Space, 
  Popconfirm,
  InputNumber,
  Upload,
  Input,
  Menu,
  Table,
  Button,
  Form,
  notification,
  Spin,
} from "antd";
import { Random } from "meteor/random";
import { useTracker } from "meteor/react-meteor-data";
import "antd/dist/antd.css";
import { uploadToServer } from "../helpers/functions";
import ProductsCol from "../api/products/collection";
import FilesCol from "../api/files/collection";
import { MenuArea } from "./components/MenuArea";
import { ProductsPage } from "./pages/product/Products";
import { ProductAddPage } from "./pages/product/ProductAdd";
import { ProductEditPage } from "./pages/product/ProductEdit";
import { RequestsPage } from "./pages/request/Requests";
import { SingleRequest } from "./pages/request/SingleRequest";
import { OrdersPage } from "./pages/order/Orders";
import { OrderAddPage } from "./pages/order/OrdersAdd";
import { OrderEditPage } from "./pages/order/OrdersEdit";
import { CustomersParge } from "./pages/customer/Customers";
import { CustomerAddPage } from "./pages/customer/CustomerAdd";
import { CustomerEditPage } from "./pages/customer/CustomerEdit";
import { BannersParge } from "./pages/banner/Banners";
import { BannerEditPage } from "./pages/banner/BannerEdit";
import { BannerAddPage } from "./pages/banner/BannerAdd";
import { CategoryAddPage } from "./pages/category/CategoryAdd";
import { CategoryEditPage } from "./pages/category/CategoryEdit";
import { CategoriesPage } from "./pages/category/Categories";
import { SettingsPage } from "./pages/settings/Settings";
import { Login } from "./pages/login/Login";
function MainLayout() {
  const [isMenuShown, setIsMenuShown] = React.useState(false);
  const props = useTracker(() => {
    const res = {
      ready: false,
      user: Meteor.user(),
    };
     if ( window.location.pathname==="/login") {
      console.log('54')
      
      res.ready = true;
    } 
    else if (res.user === undefined) {
      console.log('59')
      res.ready = false;
    } else if (res.user === null && window.location.pathname!=="/login") {
      console.log('62')
      res.ready = true;
      window.location.href = "/login";
    }
    else if (res.user) {
      console.log('67')
      res.ready = true;
      setIsMenuShown(true);
    }
    return res;
  }, []);
  return (
    <Spin spinning={!props.ready}>
      {isMenuShown ? <MenuArea /> : null}
      <main>
        <Outlet />
      </main>
    </Spin>
  );
}

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<MainLayout></MainLayout>}>
        <Route path="/" exact element={<ProductsPage />} />
        <Route path="products" exact element={<ProductsPage />} />
        <Route path="products-add" exact element={<ProductAddPage />} />
        <Route path="orders-add" exact element={<OrderAddPage />} />
        <Route path="customer-add" exact element={<CustomerAddPage />} />
        <Route path="banner-add" exact element={<BannerAddPage />} />
        <Route path="category-add" exact element={<CategoryAddPage />} />
        <Route path="orders-edit/:_id" exact element={<OrderEditPage />} />
        <Route
          path="customers-edit/:_id"
          exact
          element={<CustomerEditPage />}
        />
        <Route path="banners-edit/:_id" exact element={<BannerEditPage />} />
        <Route
          path="categories-edit/:_id"
          exact
          element={<CategoryEditPage />}
        />
        <Route path="products-edit/:_id" exact element={<ProductEditPage />} />
        <Route path="customers" exact element={<CustomersParge />} />
        <Route path="banners" exact element={<BannersParge />} />
        <Route path="categories" exact element={<CategoriesPage />} />
        <Route path="orders" exact element={<OrdersPage />} />
        <Route path="requests" exact element={<RequestsPage />} />
        <Route path="settings" exact element={<SettingsPage />} />
        <Route path="/requests/:_id" exact element={<SingleRequest />} />
        <Route path="login" exact element={<Login />} />
        <Route path="*" exact element={<h1>Səhifə tapılmadı</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
