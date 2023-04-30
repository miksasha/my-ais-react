import React, {useEffect, useState} from 'react';
import CashierLayout from "../Layout/CashierLayout";
import Axios from "axios";

function CashierGoodsInStore(props) {

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
                    <th>Ціна</th>
                    <th>Кількість одииць</th>
                    <th>Є акційним</th>
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
                    </tr>))}
            </table>

        </div>
    );
}

export default CashierGoodsInStore;