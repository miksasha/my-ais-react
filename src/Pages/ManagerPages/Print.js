import React, {useState} from 'react';
import ManagerLayout from "../Layout/ManagerLayout";
import Axios from "axios";

const PrintDiv = () =>{
    let printContents = document.getElementById('to_print').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;

    // Add top margin to printed document
    let printStyle = document.createElement('style');
    printStyle.innerHTML = '@media print { #to_print { margin-top: 50px; } }';
    document.head.appendChild(printStyle);

    // Print the document
    window.print();

    // Restore original document contents
    document.body.innerHTML = originalContents;
    window.location.reload();
    window.location.reload();
}

function Print(props) {

    const [workers, setWorkers] = useState([]);
    const printWorkers = () => {
        let container = document.getElementById("to_print");
        Axios.get("http://localhost:8888/users/")
            .then(res => {
                setWorkers(res.data)

                let htmlRows = '';
                res.data.map(worker => {
                    htmlRows += '<tr key=' + worker.id_employee + '>\n' +
                        '  <td>' + worker.id_employee + '</td>\n' +
                        '  <td>' + worker.empl_surname + ' ' + worker.empl_name + ' ' + worker.empl_patronymic + '</td>\n' +
                        '  <td>' + worker.empl_role + '</td>\n' +
                        '  <td>' + worker.salary + '</td>\n' +
                        '  <td>' + worker.date_of_start + '</td>\n' +
                        '  <td>' + worker.date_of_birth + '</td>\n' +
                        '  <td>' + worker.phone_number + '</td>\n' +
                        '  <td>' + worker.city + '</td>\n' +
                        '  <td>' + worker.street + '</td>\n' +
                        '  <td>' + worker.zip_code + '</td>\n' +
                        '</tr>\n';
                });
                let htmlStr = '   <table  id="tableOfGoodsForPrint"  className="tableOfGoods">\n' +
                    '                <thead><tr>\n' +
                    '                    <th>ID</th>\n' +
                    '                    <th>ПІБ</th>\n' +
                    '                    <th>Посада</th>\n' +
                    '                    <th>Зарплата</th>\n' +
                    '                    <th>Дата початку роботи</th>\n' +
                    '                    <th>Дата народження</th>\n' +
                    '                    <th>Телефон</th>\n' +
                    '                    <th>Місто</th>\n' +
                    '                    <th>Вулиця</th>\n' +
                    '                    <th>Індекс</th>\n' +
                    '                </tr></thead>\n' +
                    '                <tbody>' +
                    htmlRows +
                    '  </tbody>\n' +
                    '</table>';

                container.innerHTML = htmlStr;
            })
    };

    const printClients = () => {
        let container = document.getElementById("to_print");
        Axios.get("http://localhost:8888/cards")
            .then(res => {

                let htmlRows = '';
                res.data.map(worker => {
                    htmlRows += '<tr key=' + worker.card_number + '>\n' +
                        '  <td>' + worker.card_number + '</td>\n' +
                        '  <td>' + worker.cust_surname + ' ' + worker.cust_name + ' ' + worker.cust_patronymic + '</td>\n' +
                        '  <td>' + worker.phone_number + '</td>\n' +
                        '  <td>' + worker.city + ' ' + worker.street + ' ' + worker.zip_code + '</td>\n' +
                        '  <td>' + worker.percent + '</td>\n' +
                        '</tr>\n';
                });
                let htmlStr = '   <table  id="tableOfGoodsForPrint"  className="tableOfGoods">\n' +
                    '                <thead><tr>\n' +
                    '  <th>Номер карти</th>\n' +
                    '   <th>ПІБ</th>\n' +
                    '<th>Телефон</th>\n' +
                    '<th>Адреса</th>\n' +
                    '<th>Відсоток</th>\n' +
                    '                </tr></thead>\n' +
                    '                <tbody>' +
                    htmlRows +
                    '  </tbody>\n' +
                    '</table>';

                container.innerHTML = htmlStr;
            })
    };

    const printCategory = () => {
        let container = document.getElementById("to_print");
        Axios.get("http://localhost:8888/categories")
            .then(res => {

                let htmlRows = '';
                res.data.map(worker => {
                    htmlRows += '<tr key=' + worker.category_number + '>\n' +
                        '  <td>' + worker.category_number + '</td>\n' +
                         '  <td>' + worker.category_name + '</td>\n' +
                        '</tr>\n';
                });
                let htmlStr = '   <table id="tableOfGoodsForPrint" className="tableOfGoodsForPrint">\n' +
                    '                <thead><tr>\n' +
                    '  <th>ID</th>\n' +
                    '   <th>Назва категорії</th>\n' +
                    '                </tr></thead>\n' +
                    '                <tbody>' +
                    htmlRows +
                    '  </tbody>\n' +
                    '</table>';

                container.innerHTML = htmlStr;
            })
    };

    const printAllGoods = () => {
        let container = document.getElementById("to_print");
        Axios.get("http://localhost:8888/products")
            .then(res => {
                setWorkers(res.data)

                let htmlRows = '';
                res.data.map(worker => {
                    htmlRows += '<tr key=' + worker.id_product + '>\n' +
                        '  <td>' + worker.id_product + '</td>\n' +
                        '  <td>' + worker.product_name + '</td>\n' +
                        '  <td>' + worker.producer + '</td>\n' +
                        '  <td>' + worker.characteristics + '</td>\n' +
                        '  <td>' + worker.category_number + '</td>\n' +
                        '</tr>\n';
                });
                let htmlStr = '   <table  id="tableOfGoodsForPrint"  className="tableOfGoods">\n' +
                    '                <thead><tr>\n' +
                    '                    <th>ID</th>\n' +
                    '                    <th>Назва</th>\n' +
                    '                    <th>Виробник</th>\n' +
                    '                    <th>Характеристики</th>\n' +
                    '                    <th>Категорії</th>\n' +
                    '                </tr></thead>\n' +
                    '                <tbody>' +
                    htmlRows +
                    '  </tbody>\n' +
                    '</table>';

                container.innerHTML = htmlStr;
            })
    };

    const printCheckes = () => {
        let container = document.getElementById("to_print");
        Axios.get("http://localhost:8888/checks")
            .then(res => {
                setWorkers(res.data)

                let htmlRows = '';
                res.data.map(worker => {
                    htmlRows += '<tr key=' + worker.check_number + '>\n' +
                        '  <td>' + worker.check_number + '</td>\n' +
                        '  <td>' + worker.id_employee + '</td>\n' +
                        '  <td>' + worker.card_number + '</td>\n' +
                        '  <td>' + worker.print_date + '</td>\n' +
                        '  <td>' + worker.sum_total + '</td>\n' +
                        '  <td>' + worker.vat + '</td>\n' +
                        '</tr>\n';
                });
                let htmlStr = '   <table id="tableOfGoodsForPrint"  className="tableOfGoodsForPrint">\n' +
                    '                <thead><tr>\n' +
                    '                    <th>Номер чеку</th>\n' +
                    '                    <th>ID працівника</th>\n' +
                    '                    <th>Номер картки</th>\n' +
                    '                    <th>Час створення</th>\n' +
                    '                    <th>Сума</th>\n' +
                    '                    <th>ПДВ</th>\n' +
                    '                </tr></thead>\n' +
                    '                <tbody>' +
                    htmlRows +
                    '  </tbody>\n' +
                    '</table>';

                container.innerHTML = htmlStr;
            })
    };
    const printGoodsInStore = () => {
        let container = document.getElementById("to_print");
        Axios.get("http://localhost:8888/getAllStore_productWithProductCharacteristics")
            .then(res => {
                setWorkers(res.data)

                let htmlRows = '';
                res.data.map(worker => {
                    htmlRows += '<tr key=' + worker.upc + '>\n' +
                        '  <td>' + worker.upc + '</td>\n' +
                        '  <td>' + worker.product_name + '</td>\n' +
                        '  <td>' + worker.producer + '</td>\n' +
                        '  <td>' + worker.characteristics + '</td>\n' +
                        '  <td>' + worker.selling_price + '</td>\n' +
                        '  <td>' + worker.products_number + '</td>\n' +
                        '</tr>\n';
                });
                let htmlStr = '   <table  id="tableOfGoodsForPrint"  className="tableOfGoodsForPrint">\n' +
                    '                <thead><tr>\n' +
                    '                    <th>UPC</th>\n' +
                    '                    <th>Назва</th>\n' +
                    '                    <th>Виробник</th>\n' +
                    '                    <th>Характеристики</th>\n' +
                    '                    <th>Ціна</th>\n' +
                    '   <th>Кількість одииць</th>\n'+
                    '                </tr></thead>\n' +
                    '                <tbody>' +
                    htmlRows +
                    '  </tbody>\n' +
                    '</table>';

                container.innerHTML = htmlStr;
            })
    };

    return (
        <div className="print-for-manager">
            <ManagerLayout/>

            <button onClick={() => printWorkers()} className="addButton">Працівники</button>
            <button onClick={() => printClients()} className="addButton">Клієнти</button>
            <button onClick={() => printCategory()} className="addButton">Категорії</button>
            <button onClick={() => printAllGoods()} className="addButton">Товари</button>
            <button onClick={() => printGoodsInStore()} className="addButton">Товари у магазині</button>
            <button onClick={() =>printCheckes()} className="addButton">Чеки</button>

            <div id="to_print">
                <h1>Printed</h1>
            </div>

            <button type="button" className="addButton" onClick={PrintDiv}>Друк</button>
        </div>
    );
}

export default Print;