import React, {useEffect, useState} from 'react';
import '../../style/check.css'
import CashierLayout from "../Layout/CashierLayout";
import Axios from "axios";
import {globalValueOfID} from "../Profile/CashierProfile";
function CashierAllChecks(props) {

    const [check_number, setcheck_number] = useState('');
    const [id_employee, setid_employee] = useState('');
    const [card_number, setcard_number] = useState('');
    const [print_date, setprint_date] = useState('');
    const [sum_total, setsum_total] = useState('');
    const [vat, setvat] = useState('');

    const [checks, setChecks] = useState([]);
    const [checksGoods, setChecksGoods] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:8888/getAllChecksByCashier/"${globalValueOfID}"`).then(res => {
            setChecks(res.data)
        });

    }, []);

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

    const checksFromTerm = () => {
        const startDate = document.getElementById("start_date_for_cashier").value;
        const finishDate = document.getElementById("finish_date_for_cashier").value;

        Axios.post("http://localhost:8888/getAllChecksByCashierForPeriod", {
            id_employee: globalValueOfID,
            print_date_start: startDate,
            print_date_end: finishDate
        }).then(response => {
            setChecks(response.data)
        })
    };
    return (
        <div className="all-checks">
            <CashierLayout/>
            <div className="filter check-filter">
                <div className="left-filter">
                    <label htmlFor="check-filter">Всі чеки за період з</label>
                    <input type="date" id="start_date_for_cashier"/>
                    <p>по</p>
                    <input type="date" id="finish_date_for_cashier"/>
                    <button onClick={()=>checksFromTerm()} className="searchButton">Шукати</button>
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
                        </fieldset>
                    </form>))}
            </div>
        </div>
    );
}

export default CashierAllChecks;