import React, {useEffect, useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";
import Axios from "axios";

function ManagerAllGoods(props) {
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
    const [category, setCategory] = useState([]);


    useEffect(()=>{
        Axios.get("http://localhost:8888/products").then(res => {
            setGoods(res.data)
        })

        Axios.get("http://localhost:8888/getAllStore_productWithProductCharacteristics").then(res => {
            setGoodsInStore(res.data)
        })

        Axios.get("http://localhost:8888/categories").then(res => {
            setCategory(res.data);
        })
    },[]);

    const addGood = () => {
        Axios.post("http://localhost:8888/products", {
            category_number:category_number,
            product_name:product_name,
            producer:producer,
            characteristics:characteristics
        }).then(response => {
            console.log(response.data)
            setGoods([...goods, response.data]);
        });

        Axios.post("http://localhost:8888/store_products", {
            upc:upc,
            upc_prom:null,
            id_product: (goods.length+1),
            selling_price:selling_price,
            products_number:products_number,
            promotional_product:promotional_product?1:0
        }).then(response => {
            setGoodsInStore([...goodsInStore, response.data]);
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

        Axios.get(`http://localhost:8888/store_products/"${upc}"`).then(res => {

            if(res.data.isEmpty || res.data==="" || res.data.length===0) {
                Axios.post("http://localhost:8888/store_products", {
                    upc: upc,
                    upc_prom: null,
                    id_product: id,
                    selling_price: selling_price,
                    products_number: products_number,
                    promotional_product: promotional_product ? 1 : 0
                }).then(response => {
                    setGoodsInStore([...goodsInStore, response.data]);
                });
            }else {
                Axios.put("http://localhost:8888/store_products", {
                    upc: upc,
                    upc_prom: null,
                    id_product: id,
                    selling_price: selling_price,
                    products_number: products_number,
                    promotional_product: promotional_product ? 1 : 0
                }).then(response => {
                    setGoodsInStore([...goodsInStore, response.data]);
                });
            }
        });
    };
    const deleteGood = (id) => {
        Axios.delete(`http://localhost:8888/products/${id}`);

        // for(let i = 0; i<goodsInStore.length; i++) {
        //     if(id === goodsInStore[i].id_product ) {
        //         console.log(goodsInStore[i].upc)
        //         Axios.delete(`http://localhost:8888/store_products/${goodsInStore[i].upc}`);
        //         break;
        //     }
        // }

       window.location.reload();
    };

    const handleSelectCategory = (event) =>{
        if(event.target.value === "all"){
            Axios.get("http://localhost:8888/products").then(res => {
                setGoods(res.data)
            })
        }else {
            Axios.get(`http://localhost:8888/productsCategory/${event.target.value}`).then(res => {
                setGoods(res.data)
            })
        }
    }

    return (
        <div className="manager-all-goods">
            <ManagerLayout/>
            <h2>Товари, що можуть бути в магазині</h2>

            <div className="filter">
                <div className="left-filter">
                    <label htmlFor="filter">Категорія</label>
                    <select name="filter" id="categoryNumber" onChange={(event) => handleSelectCategory(event)}>
                        <option value="all" selected>Всі</option>
                        {category.map(c => (
                            <option value={c.category_number}>{c.category_name}</option>
                        ))}
                    </select>
                </div>
                <div className="right-filter">
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
                    <td><input type="checkbox" readOnly id={`checkBox_${g.id_product}`}  checked={goodsInStore.some((item) => item.id_product === g.id_product)}/></td>
                    <td>
                        <button onClick={() => {

                            setid_productM(g.id_product);
                            setproduct_name(g.product_name);
                            setproducer(g.producer);
                            setcharacteristics(g.characteristics);
                            setcategory_number(g.category_number);

                            let currentGoodIsExisted =false;
                            for(let i = 0; i<goodsInStore.length; i++) {
                                if(g.id_product === goodsInStore[i].id_product ) {
                                    setisInStore(true);
                                    currentGoodIsExisted = true;
                                    setupc(goodsInStore[i].upc);
                                    setselling_price(goodsInStore[i].selling_price);
                                    setproducts_number(goodsInStore[i].products_number);
                                    if(goodsInStore[i].promotional_product===0)setpromotional_product(false);
                                    else setpromotional_product(true);
                                    setpromotional_product(goodsInStore[i].promotional_product);
                                }
                            }
                            if(!currentGoodIsExisted) {
                                setisInStore(false);
                                setupc("");
                                setselling_price(0);
                                setproducts_number(0);
                                setpromotional_product(false);
                            }
                            if(currentGoodIsExisted) {
                                currentGoodIsExisted =false;
                            }

                            document.getElementById('edit-allGoodM-pop-up').style.display = 'block';
                        }} className="editButton">Редагувати</button>
                    </td>
                    <td>
                        <button onClick={()=>deleteGood(g.id_product)} className="deleteButton">Видалити</button>
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
                            <label htmlFor="upc">UPC:</label>
                            <input type="text" id="upc" name="upc" onChange={(event)=>{setupc(event.target.value)}}/><br/><br/>

                            <label htmlFor="price">Ціна товару у грн:</label>
                            <input type="number" id="price" name="price" onChange={(event)=>{setselling_price(event.target.value)}}/><br/><br/>
                            <label htmlFor="quantity">Кількість одиниць:</label>
                            <input type="number" id="quantity" name="quantity"  onChange={(event)=>{setproducts_number(event.target.value)}}/><br/><br/>
                            <label htmlFor="promo">Чи є товар акційним?</label>
                            <input type="checkbox" id="promo" name="promo"  onChange={(event)=>{setpromotional_product(event.target.value)}}/>
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
                        <input type="checkbox" id="availability" name="availability"
                               checked={isInStore}
                               onChange={(event)=>{setisInStore(event.target.checked)}}/><br/><br/>
                        <div id="additional-fields">
                            <label htmlFor="upc">UPC:</label>
                            <input type="text" id="upc" name="upc" value={upc} readOnly={!isInStore} onChange={(event)=>{setupc(event.target.value)}}/><br/><br/>

                            <label htmlFor="price">Ціна товару у грн:</label>
                            <input type="number" id="price" name="price" value={selling_price}  onChange={(event)=>{setselling_price(event.target.value)}}/><br/><br/>
                            <label htmlFor="quantity">Кількість одиниць:</label>
                            <input type="number" id="quantity" name="quantity" value={products_number}  onChange={(event)=>{setproducts_number(event.target.value)}}/><br/><br/>
                            <label htmlFor="promo">Чи є товар акційним?</label>
                            <input type="checkbox" id="promo" name="promo" checked={promotional_product}  onChange={(event)=>{const isChecked = event.target.checked;
                                setpromotional_product(isChecked);}}/>
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