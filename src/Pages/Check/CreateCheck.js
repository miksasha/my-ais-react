import React from 'react';
import CashierLayout from "../Layout/CashierLayout";
import '../../style/check.css'

function CreateCheck(props) {
    return (

        <div className="create_a_check">
            <CashierLayout/>
            <form className="check" action="">
                <fieldset>
                    <legend>Чек</legend>

                    <label>Дата: <span className="span-name">сьогодняшня дата</span></label> <br/>
                    <br/>
                    <label className="good-in-check"><span className="span-name">Toвар</span> - <span
                        className="span-cont">20</span> шт</label><br/>
                    <label className="good-price-in-check tab"> <span
                        className="span-price">300</span> грн</label><br/>
                    <br/>
                    <label>Загальна сума: <span></span></label><br/>
                    <label>ПДВ: <span></span></label><br/>
                    <button className="create_check" type="submit" name="create_check">Стоврити чек</button>
                </fieldset>
            </form>

            <input type="text" id="search_for_check" className="search_for_check" placeholder="Пошук по товарам"/>
            <table className="tableOfGoods_check">
                <tr id="main-row">
                    <th>ID</th>
                    <th>Назва</th>
                    <th>Виробник</th>
                    <th>Характеристики</th>
                    <th>Категорії</th>
                    <th>Ціна</th>
                    <th>Кількість одииць</th>
                    <th>Є акційним</th>
                </tr>
                <tr onClick="">
                    <td>Timely id</td>
                    <td>Timely name</td>
                    <td>Timely vurobnuk</td>
                    <td>Timely ch</td>
                    <td>Категорії</td>
                    <td>Timely price</td>
                    <td>TImely number</td>
                    <td><input type="checkbox" readOnly/></td>
                </tr>
            </table>
        </div>
    );
}

export default CreateCheck;