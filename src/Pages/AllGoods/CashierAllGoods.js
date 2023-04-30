import React, {useEffect, useState} from 'react';
import '../../style/allGoods.css'
import CashierLayout from "../Layout/CashierLayout";
import '../../style/allGoods.css'
import '../../style/check.css'
import Axios from "axios";
function CashierAllGoods(props) {

    const [id_productM, setid_productM] = useState('');
    const [category_number, setcategory_number] = useState(0);
    const [product_name, setproduct_name] = useState('');
    const [producer, setproducer] = useState('');
    const [characteristics, setcharacteristics] = useState('');

    const [upc, setupc] = useState("");
    const [isInStore, setisInStore] = useState(false);
    const [selling_price, setselling_price] = useState(0);
    const [products_number, setproducts_number] = useState('');
    const [promotional_product, setpromotional_product] = useState(true);

    const [goods, setGoods] = useState([]);

    const [goodsInStore, setGoodsInStore] = useState([]);


    useEffect(()=>{
        Axios.get("http://localhost:8888/products").then(res => {
            setGoods(res.data)
        })

        Axios.get("http://localhost:8888/store_products").then(res => {
            setGoodsInStore(res.data)
        })
    },[]);

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
                </tr>
                {goods.map(g => (
                    <tr key={g.id_product}>
                        <td>{g.id_product}</td>
                        <td>{g.product_name}</td>
                        <td>{g.producer}</td>
                        <td>{g.characteristics}</td>
                        <td>{g.category_number}</td>
                        <td><input type="checkbox" readOnly id={`checkBox_${g.id_product}`}  checked={goodsInStore.some((item) => item.id_product === g.id_product)}/></td>
                    </tr>))}
            </table>


        </div>
    );
}

export default CashierAllGoods;