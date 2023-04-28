import { Outlet, NavLink } from "react-router-dom";
import '../../style/profile.css'

const CashierLayout = () => {
    return (
        <>
            <nav className="navigation">
                <NavLink to={'/cashier/profile'} className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Кабінет користувача
                </NavLink>

                <NavLink to={'/cashier/allGoods'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Всі товари
                </NavLink>

                <NavLink to={'/cashier/goodsInStore'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Товари магазину
                </NavLink>

                <NavLink to={'/cashier/clients'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Клієнти
                </NavLink>

                <NavLink to={'/cashier/allChecks'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Чеки
                </NavLink>

                <NavLink to={'/cashier/createCheck'}  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Створити чек
                </NavLink>

                <NavLink to={'/'} id="exit"  className={({ isActive }) =>(isActive ? "active" : "noactive")}>
                    Вийти
                </NavLink>
                <p className="position">Касир</p>
                </nav>

            <Outlet />
        </>
    )
};
export default CashierLayout;