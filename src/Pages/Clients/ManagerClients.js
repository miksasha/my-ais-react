import React, {useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";

function ManagerClients(props) {

    const handleAddClientsClick = () => {
        document.getElementById('add-client-pop-up').style.display = 'block';

    };

    const handleEditClientsClick = () => {
        document.getElementById('edit-client-pop-up').style.display = 'block';

    };
    const handleClosePopupClick = () => {
        document.getElementById('add-client-pop-up').style.display = 'none';
    };

    const handleEditClosePopupClick = () => {
        document.getElementById('edit-client-pop-up').style.display = 'none';
    };

    return (
        <div className="all-manager-clients">
            <ManagerLayout/>
            <h2>Усі постійні клієнти</h2>

            <div className="filter">
                <div className="left-filter">
                    <label htmlFor="filter-client">Відфільтрувати за відсотком</label>
                    <input type="number" id="filter-client" className="filter-client"/>
                    <label htmlFor="filter-client">%</label>
                </div>
                <div className="right-filter">
                    <input type="text" id="search_surname" className="search" placeholder="Пошук по прізвищу"/>
                    <button onClick="" className="searchButton">Шукати</button>
                    <button onClick={handleAddClientsClick}
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
                    <th>Видалити</th>
                </tr>
                <tr>
                    <td>Timely id</td>
                    <td>Прізвище + Ім'я + побатькові</td>
                    <td>тел</td>
                    <td>Місто, вул, індекс</td>
                    <td>%</td>
                    <td>
                        <button onClick={handleEditClientsClick} className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick="" className="deleteButton">Видалити</button>
                    </td>
                </tr>
            </table>

            <div id="add-client-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={handleClosePopupClick}>&times;</span>
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
                        <input id="SET-client-numberOfCard" type="text" name="numberOfCard" placeholder="**** **** **** ****"/>
                        <button className="submit_profile_changes" type="submit" name="submit_profile_changes">Зберегти</button>
                    </form>
                </div>
            </div>

            <div id="edit-client-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={handleEditClosePopupClick}>&times;</span>
                    <h2>Редагування клієта</h2>
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
                        <input id="SET-client-numberOfCard" type="text" name="numberOfCard" placeholder="**** **** **** ****"/>
                        <button className="submit_profile_changes" type="submit" name="submit_profile_changes">Зберегти</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManagerClients;