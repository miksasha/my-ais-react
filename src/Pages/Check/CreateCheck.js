import React, {useEffect, useState} from 'react';
import CashierLayout from "../Layout/CashierLayout";
import '../../style/check.css'
import Axios from "axios";
import {format} from 'date-fns'

import {globalValueOfID} from '../Profile/CashierProfile';

function CreateCheck(props) {

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

    const [check_number, setcheck_number] = useState([]);
    const [id_employee, setid_employee] = useState('');
    const [card_number, setcard_number] = useState('');
    const [checkPrice, setcheckPrice] = useState(0);
    const [checkVat, setcheckVat] = useState(0);

    const [card_numbers, setcard_numbers] = useState([]);

    const [checks, setchecks] = useState(0);

    let [goodsInCheck, setgoodsInCheck] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8888/getAllStore_productWithProductCharacteristics").then(res => {

            setStoreProduct(res.data)
        })
        Axios.get("http://localhost:8888/cards").then(res => {
            setcard_numbers(res.data)
        })
        Axios.get("http://localhost:8888/getMaxCheck").then(res => {
            setcheck_number(res.data[0].last_id)
        })
    }, []);

    const addProduct = (upc, name, price) => {
        const allSumElement = document.getElementById("all_sum");
        if (goodsInCheck.some(product => product[0] === upc)) {
            const pr = document.getElementById(upc).innerText;
            document.getElementById(upc).innerText = parseInt(pr, 10) + 1;
            setgoodsInCheck(prevGoodsInCheck => prevGoodsInCheck.map(product => {
                if (product[0] === upc) {
                    return [product[0], product[1], product[2], product[3] + 1];
                } else {
                    return product;
                }
            }));

        } else {
            const htmlString = '<label className="good-in-check"><span className="span-name">' + name + '</span> - <span id="' + upc + '" className="span-cont">1</span> шт</label><br/> <label className="good-price-in-check tab"> <span className="span-price">' + price + '</span> грн</label><br/><br/>';
            allSumElement.insertAdjacentHTML('beforebegin', htmlString);
            //setgoodsInCheck(goodsInCheck.push([upc, name, price, 1]));
            const newProduct = [upc, name, price, 1];
            setgoodsInCheck([...goodsInCheck, newProduct]);
        }

        const priceC = document.getElementById("for_all_sum").innerText;
        if (!products_number) {
            document.getElementById("for_all_sum").innerText = parseInt(priceC, 10) + price;
            setcheckPrice(parseInt(priceC, 10) + price);
        } else {
            document.getElementById("for_all_sum").innerText = parseInt(priceC, 10) + (price * 0.8);
            setcheckPrice(parseInt(priceC, 10) + (price * 0.8));
        }

        document.getElementById("for_vat").innerText = parseInt(document.getElementById("for_all_sum").innerText, 10) * 0.2;
        setcheckVat(parseInt(document.getElementById("for_all_sum").innerText, 10) * 0.2);
    };

    const createACheck = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8888/checks", {
            check_number: "check" + new Date().toISOString().replace("T", " ").slice(0, -5).slice(4, 20),
            card_number: card_number,
            id_employee: globalValueOfID,
            print_date: new Date().toISOString().replace("T", " ").slice(0, -5),
            sum_total: checkPrice,
            vat: checkVat
        }).then(response => {
            setchecks([...checks, response.data]);
        });

        setTimeout(function () {
            alert(check_number)
            goodsInCheck.map(g => (
                Axios.post("http://localhost:8888/sales", {
                    upc: g[0],
                    check_number: check_number,
                    product_number: g[3],
                    selling_price: g[2]
                }).then(response => {
                    setchecks([...checks, response.data]);
                })
            ));

            setgoodsInCheck([]);
        }, 7000);

        //window.location.reload();
    };

    return (

        <div className="create_a_check">
            <CashierLayout/>
            <form className="check" id="check">
                <fieldset>
                    <legend>Чек</legend>

                    <label>Дата: <span
                        className="span-name">{new Date().toISOString().replace("T", " ").slice(0, -5)}</span></label>
                    <br/><br/>

                    <label id="all_sum">Загальна сума: <span id="for_all_sum">0</span></label><br/>
                    <label>ПДВ: <span id="for_vat">0</span></label><br/>
                    <label htmlFor="cardNumber">Карта клієнта: </label>
                    <select name="cardNumber" id="cardNumber" onChange={(event) => setcard_number(event.target.value)}>
                        {card_numbers.map(c => (
                            <option value={c.card_number}>{c.card_number}</option>
                        ))}
                    </select><br/>
                    <button className="create_check" type="submit" name="create_check" onClick={createACheck}>Стоврити
                        чек
                    </button>
                </fieldset>
            </form>

            <input type="text" id="search_for_check" className="search_for_check" placeholder="Пошук по товарам"/>
            <table className="tableOfGoods_check">
                <tr id="main-row">
                    <th>UPC</th>
                    <th>Назва</th>
                    <th>Виробник</th>
                    <th>Характеристики</th>
                    <th>Ціна</th>
                    <th>Кількість одииць</th>
                    <th>Є акційним</th>
                </tr>
                {storeProduct.map(g => (
                    <tr onClick={() => addProduct(g.upc, g.product_name, g.selling_price, g.products_number)}
                        key={g.upc}>
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

export default CreateCheck;