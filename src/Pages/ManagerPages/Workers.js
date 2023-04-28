import React, {useEffect, useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";
import Axios from 'axios';



function Workers(props) {
    const [id_employee, setId_employee] = useState('');
    const [empl_surname, setempl_surname] = useState('');
    const [empl_name, setempl_name] = useState('');
    const [empl_role, setempl_role] = useState('');
    const [empl_patronymic, setempl_patronymic] = useState('');
    const [salary, setsalary] = useState('');
    const [date_of_birth, setdate_of_birth] = useState('');
    const [date_of_start, setdate_of_start] = useState('');
    const [phone_number, setphone_number] = useState('');
    const [city, setcity] = useState('');
    const [street, setstreet] = useState('');
    const [zip_code, setzip_code] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [workers, setWorkers] = useState([]);


    useEffect(()=>{
        Axios.get("http://localhost:8888/users").then(res => {
            setWorkers(res.data.data.student)
        })
    },[]);

    const addToListOfUsers = () => {
        Axios.post("http://localhost:8888/users", {
            id_employee: id_employee,
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
            email: email,
            password: password
        }).then(response => {
            setWorkers([...workers, response.data]);
        });
        window.location.reload();
    };
    const deleteUser = (id) => {
        Axios.delete(`http://localhost:8888/users${id}`);
        window.location.reload();
    };

    const [showAddWorkerPopup, setShowAddWorkerPopup] = useState(false);
    const [showEditWorkerPopup, setShowEditWorkerPopup] = useState(false);

    const handleAddWorkerClick = () => {
        setShowAddWorkerPopup(true);
        document.getElementById('add-worker-pop-up').style.display = 'block';
    };

    const handleEditWorkerClick = ( empl_surname, empl_name, empl_patronymic, empl_role,
        salary, date_of_birth, date_of_start, phone_number, city, street, zip_code) => {
        // setShowEditWorkerPopup(true);
        // document.getElementById('edit-worker-pop-up').style.display = 'block';

        setempl_surname(empl_surname);
        setempl_name(empl_name);
        setempl_patronymic(empl_patronymic);
        setempl_role(empl_role);
        setsalary(salary);
        setdate_of_birth(date_of_birth);
        setdate_of_start(date_of_start);
        setphone_number(phone_number);

        setcity(city);
        setstreet(street);
        setzip_code(zip_code);

        setTimeout(() => {
            const popup = document.getElementById('edit-worker-pop-up');
            if (popup) {
                popup.style.display = 'block';
                setShowEditWorkerPopup(true);
            }
        }, 0);
    };
    const handleClosePopupClick = () => {
        setShowAddWorkerPopup(false);
    };


    return (

        <div className="workers">
            <ManagerLayout/>
            <h2>Працівники магазину</h2>
            <div className="filter">
                <div className="left-filter">
                    <label htmlFor="only_cashier">Тільки касири</label>
                    <input type="checkbox" id="only_cashier"/>
                </div>
                <div className="right-filter">
                    <input type="text" id="search_input" className="search" placeholder="Пошук за прізвищем"/>
                    <button onClick="" className="searchButton">Шукати</button>
                    <button onClick={handleAddWorkerClick} className="addButton">Додати працівника
                    </button>
                </div>
            </div>
            <table className="tableOfGoods">
                <thead><tr>
                    <th>ID</th>
                    <th>ПІБ</th>
                    <th>Посада</th>
                    <th>Зарплата</th>
                    <th>Дата початку роботи</th>
                    <th>Дата народження</th>
                    <th>Телефон</th>
                    <th>Місто</th>
                    <th>Вулиця</th>
                    <th>Індекс</th>
                    <th><button onClick={handleEditWorkerClick} className="editButton">Редагувати</button></th>
                    <th>Видалити</th>
                </tr></thead>
                <tbody>
                {workers.map(worker => (
                    <tr key={worker.id_employee}>
                        <td>{worker.id_employee}</td>
                        <td>{worker.empl_surname} {worker.empl_name} {worker.empl_patronymic}</td>
                        <td>{worker.empl_role}</td>
                        <td>{worker.salary}</td>
                        <td>{worker.date_of_start}</td>
                        <td>{worker.date_of_birth}</td>
                        <td>{worker.phone_number}</td>
                        <td>{worker.city}</td>
                        <td>{worker.street}</td>
                        <td>{worker.zip_code}</td>
                        <td>
                            <button onClick={handleEditWorkerClick(
                                worker.empl_surname,
                                worker.empl_name,
                                worker.empl_patronymic,
                                worker.empl_role,
                                worker.salary,
                                worker.date_of_birth,
                                worker.date_of_start,
                                worker.phone_number,
                                worker.city,
                                worker.street,
                                worker.zip_code)} className="editButton">Редагувати</button>
                        </td>
                        <td>
                            <button onClick="" className="deleteButton">Видалити</button>
                        </td>
                    </tr>
                ))}</tbody>
            </table>
            {showAddWorkerPopup && (
            <div id="add-worker-pop-up" className="modal">
                <div className="modal-content">
            <span className="close"
                  onClick={handleClosePopupClick}>&times;</span>
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
                        <button className="add_good" type="submit" name="add_good">Додати</button>
                    </form>

                </div>
            </div>)}

            {showEditWorkerPopup && (
                <div id="edit-worker-pop-up" className="modal">
                    <div className="modal-content">
            <span className="close"
                  onClick={handleClosePopupClick}>&times;</span>
                        <h2>Редагування працівника</h2>
                        <form action="">    <label>ПІБ</label>
                            <br/>
                            <label htmlFor="GET-surname" className="tab"> Прізвище:</label>
                            <input id="GET-surname" type="text" name="surname" value={empl_surname}/>
                            <br/>
                            <label htmlFor="GET-name" className="tab"> Ім'я:</label>
                            <input id="GET-name" type="text" name="name" value={empl_name}/>
                            <br/>
                            <label htmlFor="GET-fathername" className="tab"> Побатькові:</label>
                            <input id="GET-fathername" type="text" name="fathername" value={empl_patronymic}/>
                            <br/><br/>
                            <label htmlFor="GET-dateOfBirth">Дата народження:</label>
                            <input id="GET-dateOfBirth" type="date" name="dateOfBirth" value={date_of_birth}/>
                            <br/><br/>
                            <label htmlFor="GET-salary">Зарплата:</label>
                            <input id="GET-salary" type="number" name="salary" value={salary}/>
                            <br/><br/>
                            <label htmlFor="GET-dateOfStart">Дата початку роботи:</label>
                            <input id="GET-dateOfStart" type="date" name="dateOfStart" value={date_of_start}/>
                            <br/><br/>
                            <label htmlFor="GET-phone">Телефон:</label>
                            <input id="GET-phone" type="tel" name="phone" value={phone_number}/>
                            <br/><br/>
                            <label>Адреса:</label>
                            <br/>
                            <label htmlFor="GET-city" className="tab"> Місто:</label>
                            <input id="GET-city" type="text" name="city" value={city}/>
                            <br/>
                            <label htmlFor="GET-street" className="tab"> Вулиця:</label>
                            <input id="GET-street" type="text" name="street" value={street}/>
                            <br/>
                            <label htmlFor="GET-index" className="tab"> Індекс:</label>
                            <input id="GET-index" type="text" name="index" value={zip_code}/>
                            <br/><br/>
                            <button className="add_good" type="submit" name="add_good">Редагувати</button>
                        </form>

                    </div>
                </div>)}
        </div>
    );
}

export default Workers;