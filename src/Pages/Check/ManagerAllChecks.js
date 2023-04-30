import React, {useEffect, useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";
import Axios from "axios";

function ManagerAllChecks(props) {
    const [check_number, setcheck_number] = useState('');
    const [id_employee, setid_employee] = useState('');
    const [card_number, setcard_number] = useState('');
    const [print_date, setprint_date] = useState('');
    const [sum_total, setsum_total] = useState('');
    const [vat, setvat] = useState('');

    const [checks, setChecks] = useState([]);
    const [checksGoods, setChecksGoods] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8888/checks").then(res => {
            setChecks(res.data)
            Axios.get(`http://localhost:8888/getProductsFromXCheck/"check-04-30 18:20:09"`).then(res => {
                setChecksGoods(prevGoods => [...prevGoods, res.data]);
            });
        });

    }, []);

    useEffect(() => {
        console.log(checksGoods);
    }, [checksGoods]);

    const deleteCheck = (id) => {
        Axios.delete(`http://localhost:8888/checks/${id}`);
        alert(checksGoods)
        checksGoods.map(c => (
            alert(c)
            ));
            // window.location.reload();
    };

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
                {checks.map(c => (
                    <form className="check">
                        <fieldset>
                            <legend>Чек <span>код</span></legend>
                            <label>Створив: <span className="span-name-cashier">{c.id_employee}</span></label> <br/>
                            <br/>
                            <label>Дата: <span className="span-name">{c.print_date.slice(0, 10)}</span></label>
                            <br/><br/>
                            {checksGoods.map(g => (
                                <div>
                                    <label className="good-in-check"><span
                                        className="span-name">{g.product_name}</span> - <span
                                        className="span-cont">{g.product_number}</span> шт</label> <br/>
                                    <label className="good-price-in-check tab"> <span
                                        className="span-price">{g.selling_price}</span> грн</label><br/><br/>
                                </div>
                            ))}
                            <label>Загальна сума: <span>{c.sum_total}</span></label><br/>
                            <label>ПДВ: <span>{c.vat}</span></label><br/>
                            <button className="deleteButton" name="deleteButton"
                                    onClick={() => deleteCheck(c.check_number)}>Видалити
                            </button>
                        </fieldset>
                    </form>))}
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