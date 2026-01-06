import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './form.module.css';

function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    const signUP = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/user/signup";
        const signRes = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const res = await signRes.json();
        console.log(res)
        if (!res.success) {
            alert(res.message)
            setName('');
            setEmail('');
            setPassword('');
        } else {
            alert(res.message)
            navigate('/')
        }
    }

    return (
        <div className={styles.loginForm} >
            <h1>SignUp</h1>
            <form onSubmit={signUP}>
                <input type="text" className={styles.loginInput} onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter name" />
                <br /><br />
                <input type="email" className={styles.loginInput} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" />
                <br /><br />
                <input type="text" className={styles.loginInput} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" />
                <br /><br />
                <button type="submit" >SignUp</button>
                <br /><br />
                <span>Do you have accout? <Link to={'/'}>Login</Link></span>
            </form>
        </div>
    )
}

export default SignUp;