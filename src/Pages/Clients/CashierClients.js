import React, {useEffect, useState} from 'react';
import CashierLayout from "../Layout/CashierLayout";
import '../../style/client.css'
import Axios from "axios";
function CashierClients(props) {

    const [card_number, setcard_number] = useState('');
    const [cust_surname, setcust_surname] = useState('');
    const [cust_name, setcust_name] = useState('');
    const [cust_patronymic, setcust_patronymic] = useState('');
    const [phone_number, setphone_number] = useState('');
    const [city, setcity] = useState('');
    const [street, setstreet] = useState('');
    const [zip_code, setzip_code] = useState('');
    const [percent, setpercent] = useState('');

    const [clients, setclients] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:8888/cards").then(res => {
            setclients(res.data)
        })
    },[]);

    const addClient = () => {
        Axios.post("http://localhost:8888/cards", {
            cust_surname:cust_surname,
            cust_name:cust_name,
            cust_patronymic:cust_patronymic,
            phone_number:phone_number,
            city:city,
            street:street,
            zip_code:zip_code,
            percent:percent
        }).then(response => {
            setclients([...clients, response.data]);
        });
        window.location.reload();
    };

    const editClient = () => {
        Axios.put(`http://localhost:8888/cards`,{
            card_number:card_number,
            cust_surname:cust_surname,
            cust_name:cust_name,
            cust_patronymic:cust_patronymic,
            phone_number:phone_number,
            city:city,
            street:street,
            zip_code:zip_code,
            percent:percent
        });
        //document.getElementById('edit-category-pop-up').style.display = 'none';
        window.location.reload();

    };

    const searchBySurname = () => {
        let u =  document.getElementById("search_surname").value;
        Axios.get(`http://localhost:8888/cardsSurname/"${u}"`).then(res => {
            setclients(res.data)
        }).catch(res => {
            alert("Такого клієнту не існує");
        })
    };
    return (
        <div className="all-clients">
            <CashierLayout/>
            <h2>Усі постійні клієнти</h2>

            <div className="filter">
                <div className="left-filter">
                </div>
                <div className="right-filter">
                    <input type="text" id="search_surname" className="search" placeholder="Пошук по прізвищу"/>
                    <button onClick={()=>searchBySurname()} className="searchButton">Шукати</button>
                    <button onClick={() => {
                        document.getElementById('add-client-pop-up').style.display = 'block';
                    }} className="addButton ">Додати клієнта</button>
                </div>
            </div>
            <table className="tableOfGoods">
                <tr>
                    <th>Номер карти</th>
                    <th>ПІБ</th>
                    <th>Телефон</th>
                    <th>Адреса</th>
                    <th>Відсоток</th>
                    <th>Редагувати</th>
                </tr>
                {clients.map(c => (
                    <tr key={c.card_number}>
                        <td>{c.card_number}</td>
                        <td>{c.cust_surname} {c.cust_name} {c.cust_patronymic}</td>
                        <td>{c.phone_number}</td>
                        <td>{c.city} {c.street} {c.zip_code}</td>
                        <td>{c.percent}</td>
                        <td>
                            <button onClick={() => {
                                setcard_number(c.card_number);
                                setcust_surname(c.cust_surname);
                                setcust_name(c.cust_name);
                                setcust_patronymic(c.cust_patronymic);

                                setphone_number(c.phone_number);
                                setcity(c.city);
                                setstreet(c.street);
                                setzip_code(c.zip_code);
                                setpercent(c.percent);
                                document.getElementById('edit-client-pop-up').style.display = 'block';
                            }} className="editButton">Редагувати</button>
                        </td>
                </tr>))}
            </table>

            <div id="add-client-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={() => {
                              document.getElementById('add-client-pop-up').style.display = 'none';
                          }}>&times;</span>
                    <h2>Додавання клієта</h2>
                    <form className="information_about_worker" action="">
                        <label>ПІБ</label>
                        <br/>
                        <label htmlFor="SET-client-surname" className="tab"> Прізвище:</label>
                        <input id="SET-client-surname" type="text" name="surname" onChange={(event)=>{setcust_surname(event.target.value)}}/>
                        <br/>
                        <label htmlFor="SET-client-name" className="tab"> Ім'я:</label>
                        <input id="SET-client-name" type="text" name="name" onChange={(event)=>{setcust_name(event.target.value)}}/>
                        <br/>
                        <label htmlFor="SET-client-fathername" className="tab"> Побатькові:</label>
                        <input id="SET-client-fathername" type="text" name="fathername" onChange={(event)=>{setcust_patronymic(event.target.value)}}/>
                        <br/><br/>
                        <label htmlFor="SET-client-phone">Телефон:</label>
                        <input id="SET-client-phone" type="tel" name="phone" placeholder="+ (380)" onChange={(event)=>{setphone_number(event.target.value)}}/>
                        <br/><br/>
                        <label>Адреса:</label>
                        <br/>
                        <label htmlFor="SET-client-city" className="tab"> Місто:</label>
                        <input id="SET-client-city" type="text" name="city" onChange={(event)=>{setcity(event.target.value)}}/>
                        <br/>
                        <label htmlFor="SET-client-street" className="tab"> Вулиця:</label>
                        <input id="SET-client-street" type="text" name="street" onChange={(event)=>{setstreet(event.target.value)}}/>
                        <br/>
                        <label htmlFor="SET-client-index" className="tab"> Індекс:</label>
                        <input id="SET-client-index" type="text" name="index" onChange={(event)=>{setzip_code(event.target.value)}}/>
                        <br/> <br/>
                        <label htmlFor="SET-client-persent">Відсоток:</label>
                        <input id="SET-client-persent" type="number" name="persent" onChange={(event)=>{setpercent(event.target.value)}}/>
                        <br/>
                        <button className="submit_profile_changes" type="submit" name="submit_profile_changes" onClick={addClient}>Зберегти</button>
                    </form>
                </div>
            </div>

            <div id="edit-client-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={() => {
                              document.getElementById('edit-client-pop-up').style.display = 'none';
                          }}>&times;</span>
                    <h2>Редагування клієта</h2>
                    <form className="information_about_worker" action="">
                        <label>ПІБ</label>
                        <br/>
                        <label htmlFor="SET-client-surname" className="tab"> Прізвище:</label>
                        <input id="SET-client-surname" type="text" name="surname" value={cust_surname} onChange={(event)=>{setcust_surname(event.target.value)}}/>
                        <br/>
                        <label htmlFor="SET-client-name" className="tab"> Ім'я:</label>
                        <input id="SET-client-name" type="text" name="name" value={cust_name} onChange={(event)=>{setcust_name(event.target.value)}}/>
                        <br/>
                        <label htmlFor="SET-client-fathername" className="tab"> Побатькові:</label>
                        <input id="SET-client-fathername" type="text" name="fathername" value={cust_patronymic} onChange={(event)=>{setcust_patronymic(event.target.value)}}/>
                        <br/><br/>
                        <label htmlFor="SET-client-phone">Телефон:</label>
                        <input id="SET-client-phone" type="tel" name="phone" placeholder="+ (380)" value={phone_number} onChange={(event)=>{setphone_number(event.target.value)}}/>
                        <br/><br/>
                        <label>Адреса:</label>
                        <br/>
                        <label htmlFor="SET-client-city" className="tab"> Місто:</label>
                        <input id="SET-client-city" type="text" name="city" value={city} onChange={(event)=>{setcity(event.target.value)}}/>
                        <br/>
                        <label htmlFor="SET-client-street" className="tab"> Вулиця:</label>
                        <input id="SET-client-street" type="text" name="street" value={street} onChange={(event)=>{setstreet(event.target.value)}}/>
                        <br/>
                        <label htmlFor="SET-client-index" className="tab"> Індекс:</label>
                        <input id="SET-client-index" type="text" name="index" value={zip_code} onChange={(event)=>{setzip_code(event.target.value)}}/>
                        <br/> <br/>
                        <label htmlFor="SET-client-persent">Відсоток:</label>
                        <input id="SET-client-persent" type="number" name="persent" value={percent} onChange={(event)=>{setpercent(event.target.value)}}/>
                        <br/>
                        <button className="submit_profile_changes" type="submit" onClick={()=>editClient()}  name="submit_profile_changes">Зберегти</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CashierClients;