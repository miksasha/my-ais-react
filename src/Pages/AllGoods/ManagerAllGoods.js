import React, {useEffect, useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";
import Axios from "axios";

function ManagerAllGoods(props) {
    const [id_productM, setid_productM] = useState('');
    const [category_number, setcategory_number] = useState(0);
    const [product_name, setproduct_name] = useState('');
    const [producer, setproducer] = useState('');
    const [characteristics, setcharacteristics] = useState('');


    const [isInStore, setisInStore] = useState(false);
    const [selling_price, setselling_price] = useState(0);
    const [products_number, setproducts_number] = useState('');
    const [promotional_product, setpromotional_product] = useState(true);

    const [goods, setGoods] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:8888/products").then(res => {
            setGoods(res.data)
        })
    },[]);

    const addGood = (e) => {

        Axios.post("http://localhost:8888/products", {
            category_number:category_number,
            product_name:product_name,
            producer:producer,
            characteristics:characteristics
        }).then(response => {
            setGoods([...goods, response.data]);
        });
    };

    const editGood = (id) => {
        Axios.put(`http://localhost:8888/products`,{
            id_product:id,
            category_number:category_number,
            product_name:product_name,
            producer:producer,
            characteristics:characteristics
        });
        document.getElementById('edit-allGoodM-pop-up').style.display = 'none';
        // window.location.reload();
    };
    const deleteGood = (id) => {
        Axios.delete(`http://localhost:8888/products/${id}`);
        //window.location.reload();
    };

    return (
        <div className="manager-all-goods">
            <ManagerLayout/>
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
                    <button onClick={() => {
                        document.getElementById('add-allGoodM-pop-up').style.display = 'block';
                    }}
                            className="addButton">Додати товар
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
                {goods.map(g => (
                <tr key={g.id_product}>
                    <td>{g.id_product}</td>
                    <td>{g.product_name}</td>
                    <td>{g.producer}</td>
                    <td>{g.characteristics}</td>
                    <td>{g.category_number}</td>
                    <td><input type="checkbox" readOnly/></td>
                    <td>
                        <button onClick={() => {
                            setid_productM(g.id_product);
                            setproduct_name(g.product_name);
                            setproducer(g.producer);
                            setcharacteristics(g.characteristics);
                            setcategory_number(g.category_number);
                            document.getElementById('edit-allGoodM-pop-up').style.display = 'block';
                        }} className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick={()=>deleteGood(g.id_productM)} className="deleteButton">Видалити</button>
                    </td>
                </tr>))}
            </table>

            <div id="add-allGoodM-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={() => {
                              document.getElementById('add-allGoodM-pop-up').style.display = 'none';
                          }}>&times;</span>
                    <h2>Додавання товару</h2>
                    <form>
                        <label htmlFor="name">Назва:</label>
                        <input type="text" id="name" name="name" required onChange={(event)=>{setproduct_name(event.target.value)}}/><br/><br/>
                        <label htmlFor="manufacturer">Виробник:</label>
                        <input type="text" id="manufacturer" name="manufacturer" required onChange={(event)=>{setproducer(event.target.value)}}/><br/><br/>
                        <label htmlFor="features">Характеристики:</label>
                        <textarea id="features" name="features" rows="4" cols="50" onChange={(event)=>{setcharacteristics(event.target.value)}}></textarea><br/><br/>
                        <label htmlFor="categories">Категорії:</label>
                        <input type="text" id="categories" name="categories" required onChange={(event)=>{setcategory_number(event.target.value)}}/><br/><br/>
                        <label htmlFor="availability">Є в наявності:</label>
                        <input type="checkbox" id="availability" name="availability" onChange={(event)=>{setisInStore(event.target.value)}}/><br/><br/>
                        <div id="additional-fields">
                            <label htmlFor="price">Ціна товару у грн:</label>
                            <input type="number" id="price" name="price"  onChange={(event)=>{setselling_price(event.target.value)}}/><br/><br/>
                            <label htmlFor="quantity">Кількість одиниць:</label>
                            <input type="number" id="quantity" name="quantity"  onChange={(event)=>{setproducts_number(event.target.value)}}/><br/><br/>
                            <label htmlFor="promo">Чи є товар акційним?</label>
                            <input type="checkbox" id="promo" name="promo" value="yes"  onChange={(event)=>{setpromotional_product(event.target.value)}}/>
                        </div>
                        <br/><br/>
                        <button className="add_good" type="submit" onClick={addGood} name="add_good">Додати</button>
                    </form>
                </div>
            </div>

            <div id="edit-allGoodM-pop-up" className="modal">
                <div className="modal-content">
                    <span className="close"
                          onClick={() => {
                              document.getElementById('edit-allGoodM-pop-up').style.display = 'none';
                          }}>&times;</span>
                    <h2>Редагування товару</h2>
                    <form>
                        <label htmlFor="name">Назва:</label>
                        <input type="text" id="name" name="name" required value={product_name} onChange={(event)=>{setproduct_name(event.target.value)}}/><br/><br/>
                        <label htmlFor="manufacturer">Виробник:</label>
                        <input type="text" id="manufacturer" name="manufacturer" required value={producer} onChange={(event)=>{setproducer(event.target.value)}}/><br/><br/>
                        <label htmlFor="features">Характеристики:</label>
                        <textarea id="features" name="features" rows="4" cols="50" value={characteristics}  onChange={(event)=>{setcharacteristics(event.target.value)}}></textarea><br/><br/>
                        <label htmlFor="categories">Категорії:</label>
                        <input type="text" id="categories" name="categories" required value={category_number} onChange={(event)=>{setcategory_number(event.target.value)}}/><br/><br/>
                        <label htmlFor="availability">Є в наявності:</label>
                        <input type="checkbox" id="availability" name="availability"  value={isInStore} onChange={(event)=>{setisInStore(event.target.value)}}/><br/><br/>
                        <div id="additional-fields">
                            <label htmlFor="price">Ціна товару у грн:</label>
                            <input type="number" id="price" name="price" value={selling_price}  onChange={(event)=>{setselling_price(event.target.value)}}/><br/><br/>
                            <label htmlFor="quantity">Кількість одиниць:</label>
                            <input type="number" id="quantity" name="quantity" value={products_number}  onChange={(event)=>{setproducts_number(event.target.value)}}/><br/><br/>
                            <label htmlFor="promo">Чи є товар акційним?</label>
                            <input type="checkbox" id="promo" name="promo" value={promotional_product}  onChange={(event)=>{setpromotional_product(event.target.value)}}/>
                        </div>
                        <br/><br/>
                        <button className="add_good" type="submit" onClick={()=>editGood(id_productM)} name="add_good">Редагувати</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManagerAllGoods;