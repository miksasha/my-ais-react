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

    const [selectNameNumber, setselectNameNumber] = useState('name');

    const [selecrPromotion, setselecrPromotion] = useState('all');

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
        let u =  document.getElementById("search_input_upc").value;
        Axios.get(`http://localhost:8888/getStore_productWithProductCharacteristics/${u}`).then(res => {
            alert("Назва: " + res.data[0].product_name + "; Ціна: " + res.data[0].selling_price + "; К-сть наявних: " + res.data[0].products_number + "; Характеристика: " + res.data[0].characteristics)
        }).catch(res => {
            alert("Такого UPC не існує");
        })
    };
    const getGoods = () => {
        const container = document.getElementById("additionalFunctions_Goods");
        Axios.get(`http://localhost:8888/additionalNotNot1`).then(res => {

            let htmlRows = '';
            res.data.map(worker => {
                htmlRows += '<tr key=' + worker.upc + '>\n' +
                    '  <td>' + worker.upc + '</td>\n' +
                    '  <td>' + worker.id_product + '</td>\n' +
                    '  <td>' + worker.selling_price + '</td>\n' +
                    '  <td>' + worker.products_number + '</td>\n' +
                    '</tr>\n';
            });
            let htmlStr = '   <table   className="tableOfGoodsForPrint">\n' +
                '                <thead><tr>\n' +
                '                    <th>UPC</th>\n' +
                '                    <th>ID</th>\n' +
                '                    <th>Ціна</th>\n' +
                '   <th>Кількість одииць</th>\n'+
                '                </tr></thead>\n' +
                '                <tbody>' +
                htmlRows +
                '  </tbody>\n' +
                '</table>';

            container.innerHTML = htmlStr;
        });
    }
    const getNumberGoods = () => {
        const container = document.getElementById("additionalFunctions_differentNumberOfGoods");
        Axios.get(`http://localhost:8888/additionalGroupBy1/${document.getElementById("category_id_for_getGoods").value}`).then(res => {

            container.innerHTML = res.data[0].total_quantity + " шт";
        });
    }
    return (
        <div className="manager_goods_in_store">
            <ManagerLayout/>
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
                    <input type="text" id="search_input_upc" className="search_input" placeholder="Пошук по UPC"/>
                    <button onClick={()=>searchByUPC()} className="searchButton" >Шукати</button>
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


            <div className="numberOfG">
                <p>Товари в магазині, що є у всіх чеках</p>
                <button className="addButton" onClick={()=>getGoods()}>Знайти</button>
                <br/>
            </div>
            <div id="additionalFunctions_Goods"></div>

            <div className="numberOfG">
                <p>Кількість одиниць товару такої категорії</p>
                <input type="text" placeholder="id категорії" id="category_id_for_getGoods"/>
                <button className="addButton" onClick={()=>getNumberGoods()}>Знайти</button>
                <br/>
                <span id="additionalFunctions_differentNumberOfGoods"></span>
            </div>

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