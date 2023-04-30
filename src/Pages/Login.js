import React, {useState} from 'react';
import '../style/login_page.css'
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import ManagerProfile from './Profile/ManagerProfile';

function Login(props) {

    const [email, setemail] = useState([]);
    const [password, setpassword] = useState([]);
    const [access, setaccess] = useState([]);
    const navigate = useNavigate();
    const checkIfExisted = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        Axios.post("http://localhost:8888/checkuser", {
            email:email,
            password:password
        }).then(response => {
            //console.log(response.data)

            if(response.data[0].empl_role === "manager"){
                navigate(`/manager/profile`, {state: response.data[0]})
            }else{
                if(response.data[0].empl_role === "cashier")
                navigate(`/cashier/profile`, {state: response.data[0]})
            }
           // setaccess([...access, response.data]);
        }).catch(res=>alert("Wrong login or password"));

       // e.preventDefault();
    };

    return (
        <div className="login_page">
            <h2>Вітаємо у системі ZLAGODA</h2>
            <h3>Авторизуйтесь</h3>
            <br/>
            <div className="authorization_block">
                <form className="authorization_form" onSubmit={()=>checkIfExisted()} >
                    <label htmlFor="auth_email">Логін</label>
                    <input type="email" id="auth_email" placeholder="email або телефон" required onChange={(event)=>{setemail(event.target.value)}}/>
                    <label htmlFor="auth_pass">Пароль</label>
                    <input type="password" id="auth_pass" required onChange={(event)=>{setpassword(event.target.value)}}/>
                    <input className="form_auth_button" type="submit" value="Увійти" />
                </form>
            </div>
        </div>
    );
}

export default Login;