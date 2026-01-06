import { useState } from "react";
import { useEffect } from "react";
import styles from './adminPanel.module.css';
import { useNavigate } from "react-router-dom";

function AdminProduct() {

    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProductData();
    }, [])

    const getProductData = async () => {
        const url = "http://localhost:3200/admin/product";
        const productRes = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const res = await productRes.json();
        if (!res.success) {
            alert(res.message)
        } else {
            setProduct(res.products)
        }

    }

    const productDelete = async (id) => {
        const url = "http://localhost:3200/userProduct/delete/" + id;
        const productRes = await fetch(url, {
            method: 'Delete',
            credentials: 'include',
        });
        const res = await productRes.json();
        if (!res.success) {
            alert(res.message)
            navigate('/')
        } else {
            alert(res.message)
        }

    }
    return (
        <>
            <table className={styles.adminPanelContainer} >
                <thead>
                    <tr>
                        <th>user name</th>
                        <th>User Email</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Delete Product</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        product.map((prod, index) => (
                            <tr key={prod._id}>
                                <td>{prod.createdBy.name}</td>
                                <td>{prod.createdBy.email}</td>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td>{prod.category}</td>
                                <td>{prod.stock}</td>
                                <td><button onClick={() => productDelete(prod._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default AdminProduct;