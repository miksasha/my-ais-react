import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

function ManagerLayout(props) {
    return (
        <>
            <nav className="navigation">
                <NavLink to={'/manager/profile'} className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Кабінет користувача
                </NavLink>

                <NavLink to={'/manager/worker'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Працівники
                </NavLink>

                <NavLink to={'/manager/clients'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Клієнти
                </NavLink>

                <NavLink to={'/manager/category'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Категорії
                </NavLink>

                <NavLink to={'/manager/allGoods'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Всі товари
                </NavLink>

                <NavLink to={'/manager/goodsInStore'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Товари магазину
                </NavLink>
                <NavLink to={'/manager/allChecks'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Чеки
                </NavLink>
                <NavLink to={'/'} id="exit"  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Вийти
                </NavLink>
                <p className="position">Менеджер</p>
            </nav>

            <Outlet />
        </>
    )
};

export default ManagerLayout;