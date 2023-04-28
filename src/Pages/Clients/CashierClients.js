import React from 'react';
import CashierLayout from "../Layout/CashierLayout";
import '../../style/client.css'
function CashierClients(props) {
    return (
        <div className="all-clients">
            <CashierLayout/>
            <h2>Усі постійні клієнти</h2>

            <div className="filter">
                <div className="left-filter">
                </div>
                <div className="right-filter">
                    <input type="text" id="search_surname" className="search" placeholder="Пошук по прізвищу"/>
                    <button onClick="" className="searchButton">Шукати</button>
                    <button onClick="document.getElementById('add-client-pop-up').style.display = 'block'"
                            className="addButton ">Додати клієнта
                    </button>
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
                <tr>
                    <td>Timely id</td>
                    <td>Прізвище + Ім'я + побатькові</td>
                    <td>тел</td>
                    <td>Місто, вул, індекс</td>
                    <td>%</td>
                    <td>
                        <button onClick="" className="editButton">Редагувати</button>
                    </td>
                </tr>
            </table>

            <div id="add-client-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick="document.getElementById('add-client-pop-up').style.display = 'none'">&times;</span>
                    <h2>Додавання клієта</h2>
                    <form className="information_about_worker" action="">
                        <label>ПІБ</label>
                        <br/>
                        <label htmlFor="SET-client-surname" className="tab"> Прізвище:</label>
                        <input id="SET-client-surname" type="text" name="surname"/>
                        <br/>
                        <label htmlFor="SET-client-name" className="tab"> Ім'я:</label>
                        <input id="SET-client-name" type="text" name="name"/>
                        <br/>
                        <label htmlFor="SET-client-fathername" className="tab"> Побатькові:</label>
                        <input id="SET-client-fathername" type="text" name="fathername"/>
                        <br/><br/>
                        <label htmlFor="SET-client-phone">Телефон:</label>
                        <input id="SET-client-phone" type="tel" name="phone" placeholder="+ (380)"/>
                        <br/><br/>
                        <label>Адреса:</label>
                        <br/>
                        <label htmlFor="SET-client-city" className="tab"> Місто:</label>
                        <input id="SET-client-city" type="text" name="city"/>
                        <br/>
                        <label htmlFor="SET-client-street" className="tab"> Вулиця:</label>
                        <input id="SET-client-street" type="text" name="street"/>
                        <br/>
                        <label htmlFor="SET-client-index" className="tab"> Індекс:</label>
                        <input id="SET-client-index" type="text" name="index"/>
                        <br/> <br/>
                        <label htmlFor="SET-client-persent">Відсоток:</label>
                        <input id="SET-client-persent" type="number" name="persent"/>
                        <br/>
                        <label htmlFor="SET-client-numberOfCard">Номер картки:</label>
                        <input id="SET-client-numberOfCard"
                               type="text"
                               name="numberOfCard"
                               placeholder="**** **** **** ****"/>
                        <button
                            className="submit_profile_changes"
                            type="submit"
                            name="submit_profile_changes">Зберегти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CashierClients;