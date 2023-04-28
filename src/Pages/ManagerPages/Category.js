import React from 'react';
import ManagerLayout from "../Layout/ManagerLayout";

function Category(props) {
    return (
        <div className="categories">
            <ManagerLayout/>
            <h2>Усі категорії товарів</h2>

            <div className="filter">
                <div className="left-filter">
                </div>
                <div className="right-filter">
                    <button onClick="document.getElementById('add-category-pop-up').style.display = 'block'"
                            className="addButton ">Додати категорію
                    </button>
                </div>
            </div>
            <table className="tableOfGoods">
                <tr>
                    <th>ID</th>
                    <th>Назва категорії</th>
                    <th>Редагувати</th>
                    <th>Видалити</th>
                </tr>
                <tr>
                    <td>Timely id</td>
                    <td>Timely name</td>
                    <td>
                        <button onClick="" className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick="" className="deleteButton">Видалити</button>
                    </td>
                </tr>
            </table>

    <div id="add-category-pop-up" className="modal">
        <div className="modal-content">
            <span className="close"
                  onClick="document.getElementById('add-category-pop-up').style.display = 'none'">&times;</span>
            <h2>Додавання категорії</h2>
            <form>
                <label htmlFor="name">Назва:</label>
                <input type="text" id="name" name="name" required/><br/><br/>
                    <button className="add_good" type="submit" name="add_good">Додати</button>
            </form>
        </div>
    </div></div>
    );
}

export default Category;