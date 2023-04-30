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
        Axios.put("http://localhost:8888/store_products", {
            upc:upc,
            upc_prom:null,
            id_product:id_product,
            selling_price:selling_price,
            products_number:products_number,
            promotional_product:promotional_product ? 1 : 0,
        }).then(response => {
            setStoreProduct([...storeProduct, response.data]);
        });
       // document.getElementById('add-GoodInStoreM-pop-up').style.display = 'none';
        window.location.reload();
    };

    const deleteGoodsInStore = (id) => {
        Axios.delete(`http://localhost:8888/store_products/"${id}"`);
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
                    <tr key={g.upc}>
                    <td>{g.upc}</td>
                    <td>{g.product_name}</td>
                    <td>{g.producer}</td>
                    <td>{g.characteristics}</td>
                    <td>{g.selling_price}</td>
                    <td>{g.products_number}</td>
                    <td><input type="checkbox" readOnly checked={g.promotional_product}/></td>
                    <td>
                        <button onClick={() => {

                            setupc(g.upc);
                            setid_product(g.id_product);
                            setproduct_name(g.product_name);
                            setproducer(g.producer);
                            setcharacteristics(g.characteristics);

                            setselling_price(g.selling_price);
                            setproducts_number(g.products_number);
                            setpromotional_product(g.promotional_product);

                            document.getElementById('add-GoodInStoreM-pop-up').style.display = 'block';
                        }}className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick={()=>deleteGoodsInStore(g.upc)} className="deleteButton">Видалити</button>
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
                        <input type="text" id="name" name="name" readOnly value={product_name}  onChange={(event)=>{setproduct_name(event.target.value)}}/><br/><br/>
                        <label htmlFor="manufacturer">Виробник:</label>
                        <input type="text" id="manufacturer" name="manufacturer" value={producer}  readOnly onChange={(event)=>{setproducer(event.target.value)}}/><br/><br/>
                        <label htmlFor="price">Ціна товару у грн:</label>
                            <input type="number" id="price" name="price" value={selling_price}  onChange={(event)=>{setselling_price(event.target.value)}}/><br/><br/>
                            <label htmlFor="quantity">Кількість одиниць:</label>
                            <input type="number" id="quantity" name="quantity" value={products_number}  onChange={(event)=>{setproducts_number(event.target.value)}}/><br/><br/>
                            <label htmlFor="promo">Чи є товар акційним?</label>
                            <input type="checkbox" id="promo" name="promo" checked={promotional_product} onChange={(event)=>{setpromotional_product(event.target.value)}}/>

                        <br/><br/>
                        <button className="add_good" type="submit" name="add_good" onClick={()=>editGoodsInStore()}>Редагувати</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManagerGoodsInStore;