import './App.css';
import { BrowserRouter, Router, Route, Routes, } from "react-router-dom";
import Login from "./Pages/Login"
import CashierProfile from "./Pages/Profile/CashierProfile"
import CashierAllGoods from "./Pages/AllGoods/CashierAllGoods"
import CashierGoodsInStore from "./Pages/GoodsInStore/CashierGoodsInStore"
import CashierClients from "./Pages/Clients/CashierClients"
import CashierAllChecks from "./Pages/Check/CashierAllChecks"
import CreateCheck from "./Pages/Check/CreateCheck"

import ProfileManager from "./Pages/Profile/ManagerProfile"
import Workers from "./Pages/ManagerPages/Workers"
import ClientManager from "./Pages/Clients/ManagerClients"
import Category from "./Pages/ManagerPages/Category"
import AllGoodsManager from "./Pages/AllGoods/ManagerAllGoods"
import GoodsInStoreManager from "./Pages/GoodsInStore/ManagerGoodsInStore"
import AllCheckManager from "./Pages/Check/ManagerAllChecks"
import Print from "./Pages/Check/ManagerAllChecks"

import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/cashier/profile" element={<CashierProfile/>}/>
            <Route path="/cashier/allGoods" element={<CashierAllGoods/>}/>
            <Route path="/cashier/goodsInStore" element={<CashierGoodsInStore/>}/>
            <Route path="/cashier/clients" element={<CashierClients/>}/>
            <Route path="/cashier/allChecks" element={<CashierAllChecks/>}/>
            <Route path="/cashier/createCheck" element={<CreateCheck/>}/>

            <Route path="/manager/profile" element={<ProfileManager/>}/>
            <Route path="/manager/worker" element={<Workers/>}/>
            <Route path="/manager/clients" element={<ClientManager/>}/>
            <Route path="/manager/category" element={<Category/>}/>
            <Route path="/manager/allGoods" element={<AllGoodsManager/>}/>
            <Route path="/manager/goodsInStore" element={<GoodsInStoreManager/>}/>
            <Route path="/manager/allChecks" element={<AllCheckManager/>}/>
            <Route path="/manager/print" element={<Print/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
