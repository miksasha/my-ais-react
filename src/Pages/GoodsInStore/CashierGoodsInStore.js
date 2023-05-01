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


    const [selectNameNumber, setselectNameNumber] = useState('name');
    const [selecrPromotion, setselecrPromotion] = useState('all');

    useEffect(()=>{
        Axios.get("http://localhost:8888/getAllStore_productWithProductCharacteristics").then(res => {
            setStoreProduct(res.data)
        })
    },[]);
    const handleSelectNameNumber = (event) =>{
        setselectNameNumber(event.target.value)

        if(event.target.value === "name" ){
            if(selecrPromotion === "all"){
                Axios.get("http://localhost:8888/getAllStore_productWithProductCharacteristics").then(res => {
                    setStoreProduct(res.data)
                })

            }else if (selecrPromotion === "sale"){
                Axios.get("http://localhost:8888/aLL_PRODUCTS_FOR_SALE").then(res => {
                    setStoreProduct(res.data)
                })
            } else{
                Axios.get("http://localhost:8888/aLL_PRODUCTS_NOT_FOR_SALE").then(res => {
                    setStoreProduct(res.data)
                })
            }
        }
        else {
            if(selecrPromotion === "all"){
                Axios.get("http://localhost:8888/getAllStore_productByNumber").then(res => {
                    setStoreProduct(res.data)
                })

            }else if (selecrPromotion === "sale"){
                Axios.get("http://localhost:8888/aLL_PRODUCTS_FOR_SALE_SORT_BY_NUMBER").then(res => {
                    setStoreProduct(res.data)
                })
            } else{
                Axios.get("http://localhost:8888/aLL_PRODUCTS_NOT_FOR_SALE_BY_NUMBER").then(res => {
                    setStoreProduct(res.data)
                })
            }
        }
    }

    const handleSelectPromotional = (event) =>{
        setselecrPromotion(event.target.value)
        if(event.target.value === "all" ){
            if(selectNameNumber === "name" ){
                Axios.get("http://localhost:8888/getAllStore_productWithProductCharacteristics").then(res => {
                    setStoreProduct(res.data)
                })
            }else{

                Axios.get("http://localhost:8888/getAllStore_productByNumber").then(res => {
                    setStoreProduct(res.data)
                })
            }
        } else if(event.target.value === "sale" ){
            if(selectNameNumber === "name" ){
                Axios.get("http://localhost:8888/aLL_PRODUCTS_FOR_SALE").then(res => {
                    setStoreProduct(res.data)
                })
            }else{
                Axios.get("http://localhost:8888/aLL_PRODUCTS_FOR_SALE_SORT_BY_NUMBER").then(res => {
                    setStoreProduct(res.data)
                })
            }
        }else{
            if(selectNameNumber === "name" ){
                Axios.get("http://localhost:8888/aLL_PRODUCTS_NOT_FOR_SALE").then(res => {
                    setStoreProduct(res.data)
                })
            }else{
                Axios.get("http://localhost:8888/aLL_PRODUCTS_NOT_FOR_SALE_BY_NUMBER").then(res => {
                    setStoreProduct(res.data)
                })
            }
        }
    }

    const searchByUPC = () => {
        let u =  document.getElementById("search_input_upc_c").value;
        Axios.get(`http://localhost:8888/getStore_productWithProductCharacteristics/${u}`).then(res => {
            alert("Назва: " + res.data[0].product_name + "; Ціна: " + res.data[0].selling_price + "; К-сть наявних: " + res.data[0].products_number + "; Характеристика: " + res.data[0].characteristics)
        }).catch(res => {
            alert("Такого UPC не існує");
        })
    };
    return (
        <div className="goods_in_store">
            <CashierLayout/>
            <h2>Товари, що є в наявності</h2>

            <div className="filter">
                <div className="left-filter">
                    <p>Сортувати за</p>
                    <select name="filter" onChange={(event)=>{handleSelectNameNumber(event)} }>
                        <option value="name">Назвою</option>
                        <option value="number">К-сть одиниць</option>
                    </select>
                    <p>Є акційним:</p>
                    <select name="filter" onChange={(event)=>{handleSelectPromotional(event)}}>
                        <option value="all">Всі</option>
                        <option value="sale">Акційні</option>
                        <option value="nosale">Не акційні</option>
                    </select>
                </div>
                <div className="right-filter">
                    <input type="text" id="search_input_upc_c" className="search_input" placeholder="Пошук по UPC"/>
                    <button onClick={()=>searchByUPC()} className="searchButton">Шукати</button>
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