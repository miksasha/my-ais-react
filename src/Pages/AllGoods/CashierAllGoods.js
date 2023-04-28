import React from 'react';
import '../../style/allGoods.css'
import CashierLayout from "../Layout/CashierLayout";
import '../../style/allGoods.css'
import '../../style/check.css'
function CashierAllGoods(props) {
    const handleAddAllGoodsClick = () => {
        document.getElementById('add-goods-pop-up').style.display = 'block';
    };

    const handleEditAllGoodsClick = () => {
        document.getElementById('edit-goods-pop-up').style.display = 'block';

    };
    const handleClosePopupClick = () => {
        document.getElementById('add-goods-pop-up').style.display = 'none';
    };

    const handleEditClosePopupClick = () => {
        document.getElementById('edit-goods-pop-up').style.display = 'none';
    };
    return (
        <div className="goods">
            <CashierLayout/>
            <h2>Товари, що можуть бути в магазині</h2>

            <div className="filter">
                <div className="left-filter">
                    <label htmlFor="filter">Категорія</label>
                    <select name="filter" id="filter">
                        <option value="all">будь-яка</option>
                        <option value="1">____</option>
                    </select>
                </div>
                <div className="right-filter">
                    <input type="text" id="search_input" className="search" placeholder="Пошук по товарам"/>
                    <button onClick="" className="searchButton">Шукати</button>
                    <button onClick={handleAddAllGoodsClick}
                            className="addButton ">Додати товар
                    </button>
                </div>
            </div>
            <table className="tableOfGoods">
                <tr>
                    <th>ID</th>
                    <th>Назва</th>
                    <th>Виробник</th>
                    <th>Характеристики</th>
                    <th>Категорії</th>
                    <th>Є в наявності</th>
                    <th>Редагувати</th>
                    <th>Видалити</th>
                </tr>
                <tr>
                    <td>Timely id</td>
                    <td>Timely name</td>
                    <td>Timely vurobnuk</td>
                    <td>Timely ch</td>
                    <td>Категорії</td>
                    <td><input type="checkbox" readOnly/></td>
                    <td>
                        <button onClick={handleEditAllGoodsClick} className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick="" className="deleteButton">Видалити</button>
                    </td>
                </tr>
            </table>

            <div id="add-goods-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={handleClosePopupClick}>&times;</span>
                    <h2>Додавання товару</h2>
                    <form>
                        <label htmlFor="name">Назва:</label>
                        <input type="text" id="name" name="name" required/><br/><br/>
                        <label htmlFor="manufacturer">Виробник:</label>
                        <input type="text" id="manufacturer" name="manufacturer" required/><br/><br/>
                        <label htmlFor="features">Характеристики:</label>
                        <textarea id="features" name="features" rows="4" cols="50"></textarea><br/><br/>
                        <label htmlFor="categories">Категорії:</label>
                        <input type="text" id="categories" name="categories" required/><br/><br/>
                        <label htmlFor="availability">Є в наявності:</label>
                        <input type="checkbox" id="availability" name="availability" value="yes"/><br/><br/>
                        <div id="additional-fields">
                            <label htmlFor="price">Ціна товару у грн:</label>
                            <input type="number" id="price" name="price"/><br/><br/>
                            <label htmlFor="quantity">Кількість одиниць:</label>
                            <input type="number" id="quantity" name="quantity"/><br/><br/>
                            <label htmlFor="promo">Чи є товар акційним?</label>
                            <input type="checkbox" id="promo" name="promo" value="yes"/>
                        </div>
                        <br/><br/>
                        <button className="add_good" type="submit" name="add_good">Додати</button>
                    </form>
                </div>
            </div>

            <div id="edit-goods-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={handleEditClosePopupClick}>&times;</span>
                    <h2>Редагування товару</h2>
                    <form>
                        <label htmlFor="name">Назва:</label>
                        <input type="text" id="name" name="name" required/><br/><br/>
                        <label htmlFor="manufacturer">Виробник:</label>
                        <input type="text" id="manufacturer" name="manufacturer" required/><br/><br/>
                        <label htmlFor="features">Характеристики:</label>
                        <textarea id="features" name="features" rows="4" cols="50"></textarea><br/><br/>
                        <label htmlFor="categories">Категорії:</label>
                        <input type="text" id="categories" name="categories" required/><br/><br/>
                        <label htmlFor="availability">Є в наявності:</label>
                        <input type="checkbox" id="availability" name="availability" value="yes"/><br/><br/>
                        <div id="additional-fields">
                            <label htmlFor="price">Ціна товару у грн:</label>
                            <input type="number" id="price" name="price"/><br/><br/>
                            <label htmlFor="quantity">Кількість одиниць:</label>
                            <input type="number" id="quantity" name="quantity"/><br/><br/>
                            <label htmlFor="promo">Чи є товар акційним?</label>
                            <input type="checkbox" id="promo" name="promo" value="yes"/>
                        </div>
                        <br/><br/>
                        <button className="add_good" type="submit" name="add_good">Редагувати</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CashierAllGoods;