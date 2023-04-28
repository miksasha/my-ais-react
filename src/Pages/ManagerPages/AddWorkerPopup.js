import React from 'react';
import Axios from "axios";

function AddWorkerPopup({ Id, empl_surname, empl_name, empl_patronymic, empl_role, salary, date_of_birth,
                            date_of_start,phone_number,city,street,zip_code, handleClose }) {
    const editUser = () => {
        Axios.put(`http://localhost:3334/put/${Id}`,{
            empl_surname: empl_surname,
            empl_name: empl_name,
            empl_patronymic: empl_patronymic,
            empl_role: empl_role,
            salary: salary,
            date_of_birth: date_of_birth,
            date_of_start: date_of_start,
            phone_number: phone_number,
            city: city,
            street: street,
            zip_code: zip_code,
        });
        handleClose();
        window.location.reload();
    };
    return (
        <div id="edit-worker-pop-up" className="modal">
            <div className="modal-content">
            <span className="close" onHide={handleClose}>&times;</span>
                <h2>Додавання працівника</h2>
                <form action="">
                    <label>ПІБ</label>
                    <br/>
                    <label htmlFor="GET-surname" className="tab"> Прізвище:</label>
                    <input id="GET-surname" type="text" name="surname" />
                    <br/>
                    <label htmlFor="GET-name" className="tab"> Ім'я:</label>
                    <input id="GET-name" type="text" name="name"/>
                    <br/>
                    <label htmlFor="GET-fathername" className="tab"> Побатькові:</label>
                    <input id="GET-fathername" type="text" name="fathername"/>
                    <br/><br/>
                    <label htmlFor="GET-dateOfBirth">Дата народження:</label>
                    <input id="GET-dateOfBirth" type="date" name="dateOfBirth"/>
                    <br/><br/>
                    <label htmlFor="GET-salary">Зарплата:</label>
                    <input id="GET-salary" type="number" name="salary"/>
                    <br/><br/>
                    <label htmlFor="GET-dateOfStart">Дата початку роботи:</label>
                    <input id="GET-dateOfStart" type="date" name="dateOfStart"/>
                    <br/><br/>
                    <label htmlFor="GET-phone">Телефон:</label>
                    <input id="GET-phone" type="tel" name="phone"/>
                    <br/><br/>
                    <label>Адреса:</label>
                    <br/>
                    <label htmlFor="GET-city" className="tab"> Місто:</label>
                    <input id="GET-city" type="text" name="city"/>
                    <br/>
                    <label htmlFor="GET-street" className="tab"> Вулиця:</label>
                    <input id="GET-street" type="text" name="street"/>
                    <br/>
                    <label htmlFor="GET-index" className="tab"> Індекс:</label>
                    <input id="GET-index" type="text" name="index"/>
                    <br/><br/>
                    <button className="add_good" type="submit" name="add_good" onClick={() => {editUser()}}>Редагувати</button>
                </form>

            </div>
        </div>
    );
}

export default AddWorkerPopup;