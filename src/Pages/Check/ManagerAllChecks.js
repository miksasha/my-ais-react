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
        });

    }, []);


    const deleteCheck = (id) => {
        Axios.delete(`http://localhost:8888/checks/${id}`);

        // window.location.reload();
    };

    const countProducts = () => {
        const idP = document.getElementById("product_id_for_countProducts").value;
        const startDate = document.getElementById("start_date_for_countProducts").value;
        const finishDate = document.getElementById("finish_date_for_countProducts").value;

        Axios.post("http://localhost:8888/getAmountOfProductSailedForPeriod", {
            id_product : idP,
            date_start : startDate,
            date_end: finishDate
        }).then(response => {
            if(response.data[0].amount === null){
                document.getElementById("numberOfGoods").innerText = "0";
            }else {
                document.getElementById("numberOfGoods").innerText = response.data[0].amount;
            }
            //setchecks([...checks, response.data]);
        })

    };

    const searchChecksByOneCashier = () => {
        const idE = document.getElementById("cashier_id").value;
        const startDate = document.getElementById("start_date_for_cashier").value;
        const finishDate = document.getElementById("finish_date_for_cashier").value;

        if(idE === ""){
            Axios.post("http://localhost:8888/getAllChecksByAllCashiersForPeriod", {
                print_date_start: startDate,
                print_date_end: finishDate
            }).then(response => {
                setChecks(response.data)
            })

            Axios.post("http://localhost:8888/getSumChecksByAllCashiersForPeriod", {
                print_date_start: startDate,
                print_date_end: finishDate
            }).then(response => {
                document.getElementById("allEarnedMoney").innerText = response.data[0].sum;
            })
        }else {
            Axios.post("http://localhost:8888/getAllChecksByCashierForPeriod", {
                id_employee: idE,
                print_date_start: startDate,
                print_date_end: finishDate
            }).then(response => {
                setChecks(response.data)
            })

            Axios.post("http://localhost:8888/getSumChecksByCashierForPeriod", {
                id_employee: idE,
                print_date_start: startDate,
                print_date_end: finishDate
            }).then(response => {
                document.getElementById("allEarnedMoney").innerText = response.data[0].sum;
            })
        }

    };

    const goodsInCheck = (id_check) => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        const container = document.getElementById("AllProductsInCheck_"+id_check);
        Axios.get(`http://localhost:8888/getProductsFromXCheck/${id_check}`).then(res => {
            setChecksGoods(prevGoods => [...prevGoods, res.data]);

            let htmlStr = "";

            for(let i = 0; i<res.data.length; i++){
                htmlStr += '<label class="good-in-check"><span class="span-name">' +res.data[i].product_name + '</span> - <span class="span-cont">'+ res.data[i].product_number +'</span> шт</label> <br/>'+
                    '<label class="good-price-in-check tab"> <span class="span-price">' +res.data[i].selling_price +'</span> грн</label><br/><br/>'
            }
            container.insertAdjacentHTML('beforebegin', htmlStr);
            //container.innerHTML = htmlStr;
        });

    }
    const countCashiers = () => {
        const container = document.getElementById("additionalFunctionsResult");
        Axios.get(`http://localhost:8888/additionalNotNot3`).then(res => {
            let htmlRows = '';
            res.data.map(worker => {
                htmlRows += '<tr key=' + worker.id_employee + '>\n' +
                    '  <td>' + worker.id_employee + '</td>\n' +
                    '  <td>' + worker.empl_surname + ' ' + worker.empl_name + ' ' + worker.empl_patronymic + '</td>\n' +
                    '  <td>' + worker.empl_role + '</td>\n' +
                    '  <td>' + worker.salary + '</td>\n' +
                    '  <td>' + worker.date_of_start + '</td>\n' +
                    '  <td>' + worker.date_of_birth + '</td>\n' +
                    '  <td>' + worker.phone_number + '</td>\n' +
                    '  <td>' + worker.city + '</td>\n' +
                    '  <td>' + worker.street + '</td>\n' +
                    '  <td>' + worker.zip_code + '</td>\n' +
                    '</tr>\n';
            });
            let htmlStr = '   <table  className="tableOfGoods">\n' +
                '                <thead><tr>\n' +
                '                    <th>ID</th>\n' +
                '                    <th>ПІБ</th>\n' +
                '                    <th>Посада</th>\n' +
                '                    <th>Зарплата</th>\n' +
                '                    <th>Дата початку роботи</th>\n' +
                '                    <th>Дата народження</th>\n' +
                '                    <th>Телефон</th>\n' +
                '                    <th>Місто</th>\n' +
                '                    <th>Вулиця</th>\n' +
                '                    <th>Індекс</th>\n' +
                '                </tr></thead>\n' +
                '                <tbody>' +
                htmlRows +
                '  </tbody>\n' +
                '</table>';

            container.innerHTML = htmlStr;
        });
    }

    const countClients = () => {
        const container = document.getElementById("additionalFunctionsResultClient");
        Axios.get(`http://localhost:8888/additionalNotNot2`).then(res => {
            let htmlRows = '';
            res.data.map(worker => {
                htmlRows += '<tr key=' + worker.card_number + '>\n' +
                    '  <td>' + worker.card_number + '</td>\n' +
                    '  <td>' + worker.cust_surname + ' ' + worker.cust_name + ' ' + worker.cust_patronymic + '</td>\n' +
                    '  <td>' + worker.phone_number + '</td>\n' +
                    '  <td>' + worker.city + ' ' + worker.street + ' ' + worker.zip_code + '</td>\n' +
                    '  <td>' + worker.percent + '</td>\n' +
                    '</tr>\n';
            });
            let htmlStr = '   <table   className="tableOfGoods">\n' +
                '                <thead><tr>\n' +
                '  <th>Номер карти</th>\n' +
                '   <th>ПІБ</th>\n' +
                '<th>Телефон</th>\n' +
                '<th>Адреса</th>\n' +
                '<th>Відсоток</th>\n' +
                '                </tr></thead>\n' +
                '                <tbody>' +
                htmlRows +
                '  </tbody>\n' +
                '</table>';

            container.innerHTML = htmlStr;
        });
    }

    return (
        <div className="manager-all-checks">
            <ManagerLayout/>
            <h2>Фільтрація чеків</h2>
            <div className="filter check-filter">
                <div className="left-filter">
                    <label htmlFor="cashier">Якщо цікавлять чеки одного касира введіть його ID</label>
                    <input type="text" id="cashier_id" className="cashier"/>
                    <label htmlFor="data-period1">Введіть період</label>
                    <input type="date" id="start_date_for_cashier" className="data-period"/>
                    <input type="date" id="finish_date_for_cashier" className="data-period"/>
                    <button className="searchButton" onClick={()=>searchChecksByOneCashier()}>Пошук</button>
                </div>
                <div className="right-filter">
                </div>
            </div>
            <h2>Список чеків</h2>
            <div className="listOfChecks">
                {checks.map(c => (
                    <form className="check">
                        <fieldset>
                            <legend>Чек <span>{c.check_number}</span></legend>
                            <label>Створив: <span className="span-name-cashier">{c.id_employee}</span></label> <br/>
                            <br/>
                            <label>Дата: <span className="span-name">{c.print_date.slice(0, 10)}</span></label>
                            <br/><br/>
                            <button className="addButton" onClick={()=>goodsInCheck(c.check_number)}>Продані товари</button>

                                <div id= {`AllProductsInCheck_${c.check_number}`}>
                                </div>

                            <label>Загальна сума: <span>{c.sum_total}</span></label><br/>
                            <label>ПДВ: <span>{c.vat}</span></label><br/>
                            <button className="deleteButton" name="deleteButton"
                                    onClick={() => deleteCheck(c.check_number)}>Видалити
                            </button>
                        </fieldset>
                    </form>))}
            </div>

            <h2>Загальна сума проданих товарів з чеків:</h2>
            <p><span id="allEarnedMoney">0</span> грн</p>
            <h3>Загальна кількість проданого товару</h3>
            <div className="numberOfG">
                <input type="text" placeholder="id товару" id="product_id_for_countProducts"/>
                <p>за період з</p>
                <input type="date" id="start_date_for_countProducts"/>
                <p>по</p>
                <input type="date" id="finish_date_for_countProducts"/>
                <button className="addButton" onClick={()=>countProducts()}>Обрахувати</button>
                <p><span id="numberOfGoods">0</span> шт</p>
            </div>
            <div className="numberOfG">
                <p>Касирів що видавали чек всім клієнтам</p>
                <button className="addButton" onClick={()=>countCashiers()}>Знайти</button>
                <br/>
            </div>
            <div id="additionalFunctionsResult"></div>

            <div className="numberOfG">
                <p>Клієнти, яким виписали чек всі касири</p>
                <button className="addButton" onClick={()=>countClients()}>Знайти</button>
                <br/>
            </div>
            <div id="additionalFunctionsResultClient"></div>
        </div>
    );
}

export default ManagerAllChecks;