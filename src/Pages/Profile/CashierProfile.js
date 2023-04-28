import React from 'react';
import {NavLink} from "react-router-dom";
import CashierLayout from "../Layout/CashierLayout"
import '../../style/profile.css'
import '../../style/menu.css'

function CashierProfile() {
    return (
        <div className="profile">
            <CashierLayout/>
            <h2>Вітаємо у системі</h2>
            <form className="information_about_worker" action="">
                <fieldset>
                    <legend>Ваші данні</legend>
                    <label>ПІБ</label>
                    <br/>
                    <label htmlFor="GET-surname" className="tab"> Прізвище:</label>
                    <input id="GET-surname" type="text" name="surname" readOnly/>
                    <br/>
                    <label htmlFor="GET-name" className="tab"> Ім'я:</label>
                    <input id="GET-name" type="text" name="name" readOnly/>
                    <br/>
                    <label htmlFor="GET-fathername" className="tab"> Побатькові:</label>
                    <input id="GET-fathername" type="text" name="fathername" readOnly/>
                    <br/><br/>
                    <label htmlFor="GET-dateOfBirth">Дата народження:</label>
                    <input id="GET-dateOfBirth" type="date" name="dateOfBirth" readOnly/>
                    <br/><br/>
                    <label htmlFor="GET-salary">Зарплата:</label>
                    <input id="GET-salary" type="number" name="salary" readOnly/>
                    <br/><br/>
                    <label htmlFor="GET-dateOfStart">Дата початку роботи:</label>
                    <input id="GET-dateOfStart" type="date" name="dateOfStart" readOnly/>
                    <br/><br/>
                    <label htmlFor="GET-phone">Телефон:</label>
                    <input id="GET-phone" type="tel" name="phone" readOnly/>
                    <br/><br/>
                    <label>Адреса:</label>
                    <br/>
                    <label htmlFor="GET-city" className="tab"> Місто:</label>
                    <input id="GET-city" type="text" name="city" readOnly/>
                    <br/>
                    <label htmlFor="GET-street" className="tab"> Вулиця:</label>
                    <input id="GET-street" type="text" name="street" readOnly/>
                    <br/>
                    <label htmlFor="GET-index" className="tab"> Індекс:</label>
                    <input id="GET-index" type="text"  name="index" readOnly/>
                    <br/>
                    <br/>
                </fieldset>
            </form>
        </div>
    );
}

export default CashierProfile;