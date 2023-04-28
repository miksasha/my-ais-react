import React from 'react';
import CashierLayout from "../Layout/CashierLayout";

function CashierGoodsInStore(props) {

    const handleEditCategoryClick = () => {
        document.getElementById('edit-goodsInStore-pop-up').style.display = 'block';

    };
    const handleEditClosePopupClick = () => {
        document.getElementById('edit-goodsInStore-pop-up').style.display = 'none';
    };
    return (
        <div className="goods_in_store">
            <CashierLayout/>
            <h2>Товари, що є в наявності</h2>

            <div className="filter">
                <div className="left-filter">
                    <p>Сортувати за</p>
                    <select name="filter">
                        <option value="name">Назвою</option>
                        <option value="number">К-сть одиниць</option>
                    </select>
                    <p>Є акційним:</p>
                    <select name="filter">
                        <option value="all">Всі</option>
                        <option value="sale">Акційні</option>
                        <option value="nosale">Не акційні</option>
                    </select>
                </div>
                <div className="right-filter">
                    <input type="text" id="search_input" className="search_input" placeholder="Пошук по товарам"/>
                    <button onClick="" className="searchButton">Шукати</button>
                </div>
            </div>
            <table className="tableOfGoods">
                <tr>
                    <th>UPC</th>
                    <th>Назва</th>
                    <th>Виробник</th>
                    <th>Характеристики</th>
                    <th>Категорії</th>
                    <th>Ціна</th>
                    <th>Кількість одииць</th>
                    <th>Є акційним</th>
                    <th>Редагувати</th>
                    <th>Видалити</th>
                </tr>
                <tr>
                    <td>Timely id</td>
                    <td>Timely name</td>
                    <td>Timely vurobnuk</td>
                    <td>Timely ch</td>
                    <td>Категорії</td>
                    <td>Timely price</td>
                    <td>TImely number</td>
                    <td><input type="checkbox" readOnly/></td>
                    <td>
                        <button onClick={handleEditCategoryClick} className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick="" className="deleteButton">Видалити</button>
                    </td>
                </tr>
            </table>


            <div id="edit-goodsInStore-pop-up" className="modal">
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
                        <input type="checkbox" id="availability" name="availability"/><br/><br/>
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

export default CashierGoodsInStore;