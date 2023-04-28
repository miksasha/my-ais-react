import React, {useEffect, useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";
import Axios from "axios";

function ManagerGoodsInStore(props) {

    const [upc, setupc] = useState('');
    const [upc_prom, setupc_prom] = useState('');
    const [id_product, setid_product] = useState('');
    const [selling_price, setselling_price] = useState(0);
    const [products_number, setproducts_number] = useState('');
    const [promotional_product, setpromotional_product] = useState(true);

    const [category_number, setcategory_number] = useState(0);
    const [product_name, setproduct_name] = useState('');
    const [producer, setproducer] = useState('');
    const [characteristics, setcharacteristics] = useState('');

    const [storeProduct, setStoreProduct] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:8888/getAllStore_productWithProductCharacteristics").then(res => {

            setStoreProduct(res.data)
        })
    },[]);

    const editGoodsInStore = () => {
        Axios.put("http://localhost:8888/categories", {
            upc:upc,
            upc_prom:upc_prom,
            id_product:id_product,
            selling_price:selling_price,
            products_number:products_number,
            promotional_product:promotional_product,

            category_number:category_number,
            product_name:product_name,
            producer:producer,
            characteristics:characteristics
        });
        document.getElementById('add-GoodInStoreM-pop-up').style.display = 'none';
        window.location.reload();
    };

    const deleteGoodsInStore = (id) => {
        Axios.delete(`http://localhost:8888/categories/${id}`);
        window.location.reload();
    };

    return (
        <div className="manager_goods_in_store">
            <ManagerLayout/>
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
                    <th>Ціна</th>
                    <th>Кількість одииць</th>
                    <th>Є акційним</th>
                    <th>Редагувати</th>
                    <th>Видалити</th>
                </tr>
                {storeProduct.map(g => (
                    <tr key={g.category_number}>
                    <td>{g.upc}</td>
                    <td>{g.product_name}</td>
                    <td>{g.producer}</td>
                    <td>{g.characteristics}</td>
                    <td>{g.selling_price}</td>
                    <td>{g.products_number}</td>
                    <td><input type="checkbox" readOnly/></td>
                    <td>
                        <button onClick={() => {
                            document.getElementById('add-GoodInStoreM-pop-up').style.display = 'block';
                        }}className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick={deleteGoodsInStore} className="deleteButton">Видалити</button>
                    </td>
                </tr>))}
            </table>

            <div id="add-GoodInStoreM-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={() => {
                              document.getElementById('add-GoodInStoreM-pop-up').style.display = 'none';
                          }}>&times;</span>
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

export default ManagerGoodsInStore;