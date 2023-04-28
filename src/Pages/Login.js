import React from 'react';
import '../style/login_page.css'

function Login(props) {
    return (
        <div className="login_page">
            <h2>Вітаємо у системі ZLAGODA</h2>
            <h3>Авторизуйтесь</h3>
            <br/>
            <div className="authorization_block">
                <form className="authorization_form" action="#" method="post">
                    <label htmlFor="auth_email">Логін</label>
                    <input type="email" id="auth_email" placeholder="email або телефон" required/>
                    <label htmlFor="auth_pass">Пароль</label>
                    <input type="password" id="auth_pass" required/>
                    <button className="form_auth_button" type="submit" name="form_auth_submit">Увійти</button>
                </form>
            </div>
        </div>
    );
}

export default Login;