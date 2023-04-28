import React from 'react';
import ManagerLayout from "../Layout/ManagerLayout";

function ManagerAllChecks(props) {
    return (
        <div className="manager-all-checks">
            <ManagerLayout/>
            <h2>Фільтрація чеків</h2>
            <div className="filter check-filter">
                <div className="left-filter">
                    <label htmlFor="cashier">Якщо цікавлять чеки одного касира введіть його ID</label>
                    <input type="text" id="cashier" className="cashier"/>
                    <label htmlFor="data-period1">Введіть період</label>
                    <input type="date" id="data-period1" className="data-period"/>
                    <input type="date" id="data-period2" className="data-period"/>
                    <button className="searchButton">Пошук</button>
                </div>
                <div className="right-filter">
                    <input type="text" id="search_check" className="search" placeholder="Пошук по номеру чеку"/>
                    <button onClick="" className="searchButton">Шукати</button>
                </div>
            </div>
            <h2>Список чеків</h2>
            <div className="listOfChecks">
                <form className="check" action="">
                    <fieldset>
                        <legend>Чек <span>код</span></legend>
                        <label>Створив: <span className="span-name-cashier">id працівника</span></label> <br/>
                        <br/>
                        <label>Дата: <span className="span-name">сьогодняшня дата</span></label> <br/>
                        <br/>
                        <label className="good-in-check"><span className="span-name">Toвар</span> - <span
                            className="span-cont">20</span> шт</label><br/>
                        <label className="good-price-in-check tab"> <span
                            className="span-price">300</span> грн</label><br/>
                        <br/>
                        <label>Загальна сума: <span></span></label><br/>
                        <label>ПДВ: <span></span></label><br/>
                        <button className="create_check" type="submit" name="create_check">Роздрукувати чек</button>
                        <button className="deleteButton" name="deleteButton">Видалити</button>
                    </fieldset>
                </form>
            </div>

            <h2>Загальна сума проданих товарів з чеків:</h2>
            <p><span id="allEarnedMoney">3030</span> грн</p>
            <h3>Загальна кількість проданого товару</h3>
            <div className="numberOfG">
                <input type="text" placeholder="id товару"/>
                <p>за період з</p>
                <input type="date"/>
                <p>по</p>
                <input type="date"/>
                <button className="addButton">Обрахувати</button>
                <p><span id="numberOfGoods">22</span> шт</p>
            </div>
        </div>
    );
}

export default ManagerAllChecks;