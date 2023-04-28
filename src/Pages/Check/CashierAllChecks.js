import React from 'react';
import '../../style/check.css'
import CashierLayout from "../Layout/CashierLayout";
function CashierAllChecks(props) {
    return (
        <div className="all-checks">
            <CashierLayout/>
            <div className="filter check-filter">
                <div className="left-filter">
                    <label htmlFor="check-filter">Всі чеки за період з</label>
                    <input type="date" id="check-filter" className="check-filter"/>
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

                        <label>Дата: <span className="span-name">сьогодняшня дата</span></label> <br/>
                        <br/>
                        <label className="good-in-check"><span className="span-name">Toвар</span> - <span
                            className="span-cont">20</span> шт</label><br/>
                        <label className="good-price-in-check tab"> <span
                            className="span-price">300</span> грн</label><br/>
                        <br/>
                        <label>Загальна сума: <span></span></label><br/>
                        <label>ПДВ: <span></span></label><br/>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default CashierAllChecks;