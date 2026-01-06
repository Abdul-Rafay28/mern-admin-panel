import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './product.module.css';

function Product() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()


    const addProduct = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/user/product";
        const productRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, stock, category, description })
        });

        const res = await productRes.json();
        if (!res.success) {
            alert(res.message)
        } else {
            alert(res.message)
        }
    }

    const logout = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3200/user/logout";
        const logoutRes = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        });

        const res = await logoutRes.json();
        if (res.success) {
            alert(res.message)
            navigate('/')
        }
    }

    return (
        <>
        <div className={styles.addProductContainer}>
            <h1>Add Product</h1>
            <button onClick={logout}>Logout</button>

        </div>
        <div className={styles.addProductWrapper}>
            <form onSubmit={addProduct}>
                <input type="text" className={styles.addProductInput} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" />
                <br /><br />
                <input type="number" className={styles.addProductInput} onChange={(e) => setPrice(e.target.value)} placeholder="Enter product price" />
                <br /><br />
                <input type="number" className={styles.addProductInput} onChange={(e) => setStock(e.target.value)} placeholder="Enter product stock" />
                <br /><br />
                <input type="text" className={styles.addProductInput} onChange={(e) => setCategory(e.target.value)} placeholder="Enter product category" />
                <br /><br />
                <input type="text" className={styles.addProductInput} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" />
                <br /><br />
                <button type="submit">Add Product</button>
                <br /><br />
            </form>
        </div>
        </>
    )
}

export default Product;