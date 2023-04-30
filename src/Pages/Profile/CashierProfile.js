import React from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import CashierLayout from "../Layout/CashierLayout"
import '../../style/profile.css'
import '../../style/menu.css'

function CashierProfile() {
    const {state} = useLocation();
    const navigate = useNavigate();
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
                    <input id="GET-surname" type="text" name="surname" readOnly value={state.empl_surname}/>
                    <br/>
                    <label htmlFor="GET-name" className="tab"> Ім'я:</label>
                    <input id="GET-name" type="text" name="name" readOnly value={state.empl_name}/>
                    <br/>
                    <label htmlFor="GET-fathername" className="tab"> Побатькові:</label>
                    <input id="GET-fathername" type="text" name="fathername" readOnly value={state.empl_patronymic}/>
                    <br/><br/>
                    <label htmlFor="GET-dateOfBirth">Дата народження:</label>
                    <input id="GET-dateOfBirth" type="date" name="dateOfBirth" readOnly value={state.date_of_birth.slice(0,10)}/>
                    <br/><br/>
                    <label htmlFor="GET-salary">Зарплата:</label>
                    <input id="GET-salary" type="number" name="salary" readOnly value={state.salary}/>
                    <br/><br/>
                    <label htmlFor="GET-dateOfStart">Дата початку роботи:</label>
                    <input id="GET-dateOfStart" type="date" name="dateOfStart" readOnly value={state.date_of_start.slice(0,10)}/>
                    <br/><br/>
                    <label htmlFor="GET-phone">Телефон:</label>
                    <input id="GET-phone" type="tel" name="phone" readOnly value={state.phone_number}/>
                    <br/><br/>
                    <label>Адреса:</label>
                    <br/>
                    <label htmlFor="GET-city" className="tab"> Місто:</label>
                    <input id="GET-city" type="text" name="city" readOnly value={state.city}/>
                    <br/>
                    <label htmlFor="GET-street" className="tab"> Вулиця:</label>
                    <input id="GET-street" type="text" name="street" readOnly value={state.street}/>
                    <br/>
                    <label htmlFor="GET-index" className="tab"> Індекс:</label>
                    <input id="GET-index" type="text"  name="index" readOnly value={state.zip_code}/>
                    <br/>
                    <br/>
                </fieldset>
            </form>
        </div>
    );
}

export default CashierProfile;