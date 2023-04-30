import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import CashierLayout from "../Layout/CashierLayout"
import '../../style/profile.css'
import '../../style/menu.css'


export let globalValueOfID = "";
function CashierProfile() {

    const {state} = useLocation();
    const navigate = useNavigate();

    const [id_employee, setId_employee] = useState(state.id_employee);
    const [empl_surname, setempl_surname] = useState(state.empl_surname);
    const [empl_name, setempl_name] = useState(state.empl_name);
    const [empl_role, setempl_role] = useState(state.empl_role);
    const [empl_patronymic, setempl_patronymic] = useState(state.empl_patronymic);
    const [salary, setsalary] = useState(state.salary);
    const [date_of_birth, setdate_of_birth] = useState(state.date_of_birth.slice(0,10));
    const [date_of_start, setdate_of_start] = useState(state.date_of_start.slice(0,10));
    const [phone_number, setphone_number] = useState(state.phone_number);
    const [city, setcity] = useState(state.city);
    const [street, setstreet] = useState(state.street);
    const [zip_code, setzip_code] = useState(state.zip_code);

    globalValueOfID = id_employee;

    alert(globalValueOfID)


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
                    <input id="GET-surname" type="text" name="surname" readOnly value={empl_surname}/>
                    <br/>
                    <label htmlFor="GET-name" className="tab"> Ім'я:</label>
                    <input id="GET-name" type="text" name="name" readOnly value={empl_name}/>
                    <br/>
                    <label htmlFor="GET-fathername" className="tab"> Побатькові:</label>
                    <input id="GET-fathername" type="text" name="fathername" readOnly value={empl_patronymic}/>
                    <br/><br/>
                    <label htmlFor="GET-dateOfBirth">Дата народження:</label>
                    <input id="GET-dateOfBirth" type="date" name="dateOfBirth" readOnly value={date_of_birth}/>
                    <br/><br/>
                    <label htmlFor="GET-salary">Зарплата:</label>
                    <input id="GET-salary" type="number" name="salary" readOnly value={state.salary}/>
                    <br/><br/>
                    <label htmlFor="GET-dateOfStart">Дата початку роботи:</label>
                    <input id="GET-dateOfStart" type="date" name="dateOfStart" readOnly value={date_of_start}/>
                    <br/><br/>
                    <label htmlFor="GET-phone">Телефон:</label>
                    <input id="GET-phone" type="tel" name="phone" readOnly value={phone_number}/>
                    <br/><br/>
                    <label>Адреса:</label>
                    <br/>
                    <label htmlFor="GET-city" className="tab"> Місто:</label>
                    <input id="GET-city" type="text" name="city" readOnly value={city}/>
                    <br/>
                    <label htmlFor="GET-street" className="tab"> Вулиця:</label>
                    <input id="GET-street" type="text" name="street" readOnly value={street}/>
                    <br/>
                    <label htmlFor="GET-index" className="tab"> Індекс:</label>
                    <input id="GET-index" type="text"  name="index" readOnly value={zip_code}/>
                    <br/>
                    <br/>
                </fieldset>
            </form>
        </div>
    );
}

export default CashierProfile;