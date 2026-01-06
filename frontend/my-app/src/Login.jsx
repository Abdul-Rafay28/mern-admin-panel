import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './form.module.css';


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/login";
        const loginRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const res = await loginRes.json();
        if (!res.success) {
            alert(res.message)
            setEmail('');
            setPassword('');
            return
        }

        if (res.role == 'user') {
            navigate('/addProduct')
        } else {
            navigate('/admin/users')
        }
    }

    return (
        <div className={styles.loginForm}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" className={styles.loginInput} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" />
                <br /><br />
                <input type="password" className={styles.loginInput} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" />
                <br /><br />
                <button type="Submit" >Login</button>
                <br /><br />
                <span>Don't you have accout? <Link to='/signUp'>SignUP</Link></span>
            </form>
        </div>
    )
}

export default Login;