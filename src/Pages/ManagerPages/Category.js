import React, {useEffect, useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";
import Axios from "axios";

function Category(props) {
    const [category_number, setCategory_number] = useState('');
    const [category_name, setCategory_name] = useState('');

    const [category, setCategory] = useState([]);

    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
    const [showEditCategoryPopup, setShowEditCategoryPopup] = useState(false);

    useEffect(()=>{
        Axios.get("http://localhost:8888/category").then(res => {
            setCategory(res.data.data.student)
        })
    },[]);

    const addCategory = () => {
        Axios.post("http://localhost:8888/category", {
            category_number:category_number,
            category_name:category_name
        }).then(response => {
            setCategory([...category, response.data]);
        });
        window.location.reload();
    };
    const editCategory = () => {
        Axios.put(`http://localhost:3334/put/${category_number}`,{
            category_number:category_number,
            category_name:category_name
        });
        handleEditCategoryClick();
        window.location.reload();
    };
    const deleteCategory = (id) => {
        Axios.delete(`http://localhost:8888/category${id}`);
        window.location.reload();
    };
    const handleAddCategoryClick = () => {
        setShowAddCategoryPopup(true);
        document.getElementById('add-category-pop-up').style.display = 'block';

    };

    const handleEditCategoryClick = () => {
        setShowEditCategoryPopup(true);
        document.getElementById('edit-category-pop-up').style.display = 'block';

    };
    const handleClosePopupClick = () => {
        setShowAddCategoryPopup(false);
        document.getElementById('add-category-pop-up').style.display = 'none';
    };

    const handleEditClosePopupClick = () => {
        setShowAddCategoryPopup(false);
        document.getElementById('edit-category-pop-up').style.display = 'none';
    };
    return (
        <div className="categories">
            <ManagerLayout/>
            <h2>Усі категорії товарів</h2>
            <div className="filter">
                <div className="left-filter">
                </div>
                <div className="right-filter">
                    <button onClick={handleAddCategoryClick}
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
                {category.map(c => (
                <tr key={c.category_number}>
                    <td>c.category_number</td>
                    <td>c.category_name</td>
                    <td>
                        <button onClick={handleEditCategoryClick} className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick={deleteCategory(c.category_number)} className="deleteButton">Видалити</button>
                    </td>
                </tr>))}
            </table>

            <div id="add-category-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleClosePopupClick}>&times;</span>
                    <h2>Додавання категорії</h2>
                    <form>
                        <label htmlFor="name">Назва:</label>
                        <input type="text" id="name" name="name" required  onChange={(event)=>{setCategory_name(event.target.value)}}/><br/><br/>
                            <button className="add_good" type="submit" onClick={addCategory} name="add_good">Додати</button>
                    </form>
                </div>
            </div>

            <div id="edit-category-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleEditClosePopupClick}>&times;</span>
                    <h2>Редагування категорії</h2>
                    <form>
                        <label htmlFor="name">Назва:</label>
                        <input type="text" id="name" name="name" required value={category_name} onChange={(event)=>{setCategory_name(event.target.value)}}/><br/><br/>
                        <button className="add_good" type="submit" onClick={editCategory}  name="add_good">Редагувати</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Category;