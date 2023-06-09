import React, {useEffect, useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";
import Axios from 'axios';



function Workers(props) {
    const [id_employee, setId_employee] = useState('');
    const [empl_surname, setempl_surname] = useState('');
    const [empl_name, setempl_name] = useState('');
    const [empl_role, setempl_role] = useState('');
    const [empl_patronymic, setempl_patronymic] = useState('');
    const [salary, setsalary] = useState(0);
    const [date_of_birth, setdate_of_birth] = useState('');
    const [date_of_start, setdate_of_start] = useState('');
    const [phone_number, setphone_number] = useState('');
    const [city, setcity] = useState('');
    const [street, setstreet] = useState('');
    const [zip_code, setzip_code] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [workers, setWorkers] = useState([]);

    const [onlyCashier, setonlyCashier] = useState("off");

    useEffect(() => {
        getBooks();
    }, []);
    const getBooks = () => {
        Axios.get("http://localhost:8888/users/")
            .then(res => {
                setWorkers(res.data)
            })
            .catch(er => console.log(er));
    }


    const addToListOfUsers = () => {
        setdate_of_birth(date_of_birth.slice(0, 10));
        setdate_of_start(date_of_start.slice(0, 10));
        console.log(date_of_birth)
        console.log(date_of_start)

        Axios.post("http://localhost:8888/users", {
           // id_employee: 4,
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
     //   window.location.reload();
    };
    const deleteUser = (id) => {

       Axios.delete(`http://localhost:8888/users/${id}`);
           window.location.reload();

    };

    const handleAddWorkerClick = () => {
        document.getElementById('add-worker-pop-up').style.display = 'block';
    };

    const handleEditWorkerClick = ( id, empl_surname, empl_name, empl_patronymic, empl_role,
        salary, date_of_birth, date_of_start, phone_number, city, street, zip_code, email, password) => {
        // setShowEditWorkerPopup(true);
        // document.getElementById('edit-worker-pop-up').style.display = 'block';
        setId_employee(id)
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
        setemail(email);
        setpassword(password);

        setTimeout(() => {
            const popup = document.getElementById('edit-worker-pop-up');
            if (popup) {
                popup.style.display = 'block';
            }
        }, 0);
    };

    const editToListOfUsers = () => {

        Axios.put(`http://localhost:8888/users`,{
            id_employee: id_employee,
            empl_surname: empl_surname,
            empl_name: empl_name,
            empl_patronymic: empl_patronymic,
            empl_role: empl_role,
            salary: salary,
            date_of_birth: date_of_birth.slice(0, 10),
            date_of_start: date_of_start.slice(0, 10),
            phone_number: phone_number,
            city: city,
            street: street,
            zip_code: zip_code,
            email: email,
            password: password
        });
        handleClosePopupClick();
    };
    const handleClosePopupClick = () => {
        document.getElementById('add-worker-pop-up').style.display = 'none';
    };
    const handleEditClosePopupClick = () => {
        document.getElementById('edit-worker-pop-up').style.display = 'none';
    };

    const handleOnlyCashier = (event) => {
        if(onlyCashier === "on") {
            setonlyCashier("off");
            Axios.get("http://localhost:8888/users/")
                .then(res => {
                    setWorkers(res.data)
                })
        }
        else{
            setonlyCashier("on");
            Axios.get("http://localhost:8888/allkasirs")
                .then(res => {
                    setWorkers(res.data)
                })
        }
    };

    const searchBySurName = () => {
        let s =  document.getElementById("search_input_surname").value;
        Axios.get(`http://localhost:8888/findphoneaddbysurname/"${s}"`).then(res => {
            alert("Телефон: " + res.data[0].phone_number + "; Місто: " + res.data[0].city + "; Вулиця: " + res.data[0].street + "; Індекс: " + res.data[0].zip_code)
        }).catch(res => {
            alert("Такого прізвища не існує");
        })
    };



    return (

        <div className="workers">
            <ManagerLayout/>
            <h2>Працівники магазину</h2>
            <div className="filter">
                <div className="left-filter">
                    <label htmlFor="only_cashier">Тільки касири</label>
                    <input type="checkbox" id="only_cashier" onChange={(event) => handleOnlyCashier(event)}/>
                </div>
                <div className="right-filter">
                    <input type="text" id="search_input_surname" className="search" placeholder="Пошук за прізвищем"/>
                    <button onClick={()=>searchBySurName()} className="searchButton">Шукати</button>
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
                    <th>Редагувати</th>
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

                            <button onClick={()=> handleEditWorkerClick(
                                worker.id_employee,
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
                                worker.zip_code,
                                worker.email,
                                worker.password)} className="editButton">Редагувати</button>
                        </td>
                        <td>
                            {<button onClick={()=> deleteUser(worker.id_employee)} className="deleteButton">Видалити</button>}
                        </td>
                    </tr>
                ))}</tbody>
            </table>



            <div id="add-worker-pop-up" className="modal">
                <div className="modal-content">
            <span className="close"
                  onClick={handleClosePopupClick}>&times;</span>
                    <h2>Додавання працівника</h2>
                    <form action="">
                        <label>ПІБ</label>
                        <br/>
                        <label htmlFor="GET-surname" className="tab"> Прізвище:</label>
                        <input id="GET-surname" type="text" name="surname"  onChange={(event)=>{setempl_surname(event.target.value)}}/>
                        <br/>
                        <label htmlFor="GET-name" className="tab"> Ім'я:</label>
                        <input id="GET-name" type="text" name="name"  onChange={(event)=>{setempl_name(event.target.value)}}/>
                        <br/>
                        <label htmlFor="GET-fathername" className="tab"> Побатькові:</label>
                        <input id="GET-fathername" type="text" name="fathername"  onChange={(event)=>{setempl_patronymic(event.target.value)}}/>
                        <label htmlFor="position">Посада</label>
                        <select name="position" id="position" onChange={(event) => { setempl_role(event.target.value) }}>
                            <option value="cashier" selected>cashier</option>
                            <option value="manager">manager</option>
                        </select>
                        <br/><br/>
                        <label htmlFor="GET-dateOfBirth">Дата народження:</label>
                        <input id="GET-dateOfBirth" type="date" name="dateOfBirth" required onChange={(event)=>{setdate_of_birth(event.target.value)}}/>
                        <br/><br/>
                        <label htmlFor="GET-salary">Зарплата:</label>
                        <input id="GET-salary" type="number" name="salary" required onChange={(event)=>{setsalary(event.target.value)}}/>
                        <br/><br/>
                        <label htmlFor="GET-dateOfStart">Дата початку роботи:</label>
                        <input id="GET-dateOfStart" type="date" name="dateOfStart" required onChange={(event)=>{setdate_of_start(event.target.value)}}/>
                        <br/><br/>
                        <label htmlFor="GET-phone">Телефон:</label>
                        <input id="GET-phone" type="tel" name="phone"  onChange={(event)=>{setphone_number(event.target.value)}}/>
                        <br/><br/>
                        <label>Адреса:</label>
                        <br/>
                        <label htmlFor="GET-city" className="tab"> Місто:</label>
                        <input id="GET-city" type="text" name="city"  onChange={(event)=>{setcity(event.target.value)}}/>
                        <br/>
                        <label htmlFor="GET-street" className="tab"> Вулиця:</label>
                        <input id="GET-street" type="text" name="street"  onChange={(event)=>{setstreet(event.target.value)}}/>
                        <br/>
                        <label htmlFor="GET-index" className="tab"> Індекс:</label>
                        <input id="GET-index" type="text" name="index"  onChange={(event)=>{setzip_code(event.target.value)}}/>
                        <br/><br/>
                        <label htmlFor="GET-street">Email:</label>
                        <input id="GET-street" type="email" name="street" onChange={(event)=>{setemail(event.target.value)}}/>
                        <br/>
                        <label htmlFor="GET-index" > Пароль:</label>
                        <input id="GET-index" type="password" name="index"  onChange={(event)=>{setpassword(event.target.value)}}/>
                        <br/><br/>
                        <button className="add_good" onClick={addToListOfUsers} type="submit" name="add_good">Додати</button>
                    </form>

                </div>
            </div>

                <div id="edit-worker-pop-up" className="modal">
                    <div className="modal-content">
            <span className="close"
                  onClick={handleEditClosePopupClick}>&times;</span>
                        <h2>Редагування працівника</h2>
                        <form action="">    <label>ПІБ</label>
                            <br/>
                            <label htmlFor="GET-surname" className="tab"> Прізвище:</label>
                            <input id="GET-surname" type="text" name="surname" value={empl_surname}  onChange={(event)=>{setempl_surname(event.target.value)}}/>
                            <br/>
                            <label htmlFor="GET-name" className="tab"> Ім'я:</label>
                            <input id="GET-name" type="text" name="name" value={empl_name}  onChange={(event)=>{setempl_name(event.target.value)}}/>
                            <br/>
                            <label htmlFor="GET-fathername" className="tab"> Побатькові:</label>
                            <input id="GET-fathername" type="text" name="fathername" value={empl_patronymic}  onChange={(event)=>{setempl_patronymic(event.target.value)}}/>
                            <br/><br/>
                            <label htmlFor="GET-dateOfBirth">Дата народження:</label>
                            <input id="GET-dateOfBirth" type="date" name="dateOfBirth" value={date_of_birth.slice(0, 10)}  onChange={(event)=>{setdate_of_birth(event.target.value)}}/>
                            <br/><br/>
                            <label htmlFor="GET-salary">Зарплата:</label>
                            <input id="GET-salary" type="number" name="salary" value={salary}  onChange={(event)=>{setsalary(event.target.value)}}/>
                            <br/><br/>
                            <label htmlFor="GET-dateOfStart">Дата початку роботи:</label>
                            <input id="GET-dateOfStart" type="date" name="dateOfStart" value={date_of_start.slice(0, 10)}  onChange={(event)=>{setdate_of_start(event.target.value)}}/>
                            <br/><br/>
                            <label htmlFor="GET-phone">Телефон:</label>
                            <input id="GET-phone" type="tel" name="phone" value={phone_number}  onChange={(event)=>{setphone_number(event.target.value)}}/>
                            <br/><br/>
                            <label>Адреса:</label>
                            <br/>
                            <label htmlFor="GET-city" className="tab"> Місто:</label>
                            <input id="GET-city" type="text" name="city" value={city}  onChange={(event)=>{setcity(event.target.value)}}/>
                            <br/>
                            <label htmlFor="GET-street" className="tab"> Вулиця:</label>
                            <input id="GET-street" type="text" name="street" value={street}  onChange={(event)=>{setstreet(event.target.value)}}/>
                            <br/>
                            <label htmlFor="GET-index" className="tab"> Індекс:</label>
                            <input id="GET-index" type="text" name="index" value={zip_code}  onChange={(event)=>{setzip_code(event.target.value)}}/>
                            <br/><br/>
                            <button className="add_good" type="submit" onClick={editToListOfUsers} name="add_good">Редагувати</button>
                        </form>

                    </div>
                </div>
        </div>
    );
}

export default Workers;